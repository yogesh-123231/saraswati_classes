import type { TestSeries, Test } from "@/types/testSeries";
import { defaultTestSeriesList } from "@/data/mockData";

const STORAGE_KEY = "sc_test_series_v2";

function seedFromDefaults(): TestSeries[] {
  return defaultTestSeriesList.map((ts) => {
    const numericPrice =
      typeof ts.price === "string"
        ? Number(ts.price.replace(/[^\d]/g, "")) || 0
        : 0;

    const tests: Test[] = [];

    return {
      id: ts.id,
      title: ts.title,
      category: "General",
      standard: "",
      board: "",
      description: ts.overview,
      price: numericPrice,
      tests,
    };
  });
}

function readTestSeries(): TestSeries[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // ignore parse errors and fall back to defaults
  }
  return seedFromDefaults();
}

function writeTestSeries(series: TestSeries[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(series));
}

export function fetchTestSeries(): TestSeries[] {
  return readTestSeries();
}

export function createTestSeries(data: Omit<TestSeries, "id">): TestSeries {
  const all = readTestSeries();
  const created: TestSeries = { ...data, id: Date.now().toString() };
  const next = [...all, created];
  writeTestSeries(next);
  return created;
}

export function updateTestSeries(
  id: string,
  updates: Partial<Omit<TestSeries, "id">>
): TestSeries | null {
  const all = readTestSeries();
  let updated: TestSeries | null = null;
  const next = all.map((ts) => {
    if (ts.id !== id) return ts;
    updated = { ...ts, ...updates, id: ts.id };
    return updated;
  });
  if (!updated) return null;
  writeTestSeries(next);
  return updated;
}

export function deleteTestSeries(id: string): void {
  const all = readTestSeries();
  const next = all.filter((ts) => ts.id !== id);
  writeTestSeries(next);
}

export function addTestToSeries(
  seriesId: string,
  test: Omit<Test, "id">
): Test | null {
  const all = readTestSeries();
  let created: Test | null = null;
  const next = all.map((series) => {
    if (series.id !== seriesId) return series;
    const newTest: Test = { ...test, id: Date.now().toString() };
    created = newTest;
    return {
      ...series,
      tests: [...series.tests, newTest],
    };
  });
  if (!created) return null;
  writeTestSeries(next);
  return created;
}

