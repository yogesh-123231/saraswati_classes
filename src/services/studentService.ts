import type { Student } from "@/types/student";

const STORAGE_KEY = "sc_students_v2";

function readStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

function writeStudents(students: Student[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function fetchStudents(): Student[] {
  return readStudents();
}

export function createStudent(data: Omit<Student, "id">): Student {
  const students = readStudents();
  const created: Student = { ...data, id: Date.now().toString() };
  const next = [...students, created];
  writeStudents(next);
  return created;
}

export function updateStudent(
  id: string,
  updates: Partial<Omit<Student, "id">>
): Student | null {
  const students = readStudents();
  let updated: Student | null = null;
  const next = students.map((s) => {
    if (s.id !== id) return s;
    updated = { ...s, ...updates, id: s.id };
    return updated;
  });
  if (!updated) return null;
  writeStudents(next);
  return updated;
}

export function deleteStudent(id: string): void {
  const students = readStudents();
  const next = students.filter((s) => s.id !== id);
  writeStudents(next);
}

export function toggleStudentBlock(id: string): Student | null {
  const students = readStudents();
  let updated: Student | null = null;
  const next = students.map((s) => {
    if (s.id !== id) return s;
    const status = s.status === "blocked" ? "active" : "blocked";
    updated = { ...s, status };
    return updated;
  });
  if (!updated) return null;
  writeStudents(next);
  return updated;
}

