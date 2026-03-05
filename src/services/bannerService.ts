import type { Banner } from "@/types/banner";
import { defaultHeroPosters } from "@/data/mockData";

const STORAGE_KEY = "sc_banners_v1";

function readBanners(): Banner[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // ignore parse errors and fall back to seed
  }

  // Seed from existing hero posters (one-time, in-memory only)
  const seeded: Banner[] = defaultHeroPosters.map((poster) => ({
    id: poster.id,
    image: poster.imageUrl,
    linkedTestSeriesId: poster.testSeriesId,
  }));

  return seeded;
}

function writeBanners(banners: Banner[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
}

export function fetchBanners(): Banner[] {
  return readBanners();
}

export function createBanner(data: Omit<Banner, "id">): Banner {
  const banners = readBanners();
  const created: Banner = { ...data, id: Date.now().toString() };
  const next = [...banners, created];
  writeBanners(next);
  return created;
}

export function updateBanner(
  id: string,
  updates: Partial<Omit<Banner, "id">>
): Banner | null {
  const banners = readBanners();
  let updated: Banner | null = null;
  const next = banners.map((b) => {
    if (b.id !== id) return b;
    updated = { ...b, ...updates, id: b.id };
    return updated;
  });
  if (!updated) return null;
  writeBanners(next);
  return updated;
}

export function deleteBanner(id: string): void {
  const banners = readBanners();
  const next = banners.filter((b) => b.id !== id);
  writeBanners(next);
}

