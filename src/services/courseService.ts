import type { Course } from "@/types/course";
import type { Chapter } from "@/types/chapter";
import { defaultCourses } from "@/data/mockData";

const STORAGE_KEY = "sc_courses_v2";

function seedFromDefaults(): Course[] {
  return defaultCourses.map((c) => {
    const chapters: Chapter[] = c.chapters.map((ch, index) => ({
      id: `${c.id}-ch-${index + 1}`,
      chapterNumber: index + 1,
      chapterDescription: ch.description,
      youtubeLink: ch.videoUrl,
      testDescription: "",
      testLink: "",
    }));
    return {
      id: c.id,
      title: c.title,
      category: c.category,
      description: c.description,
      subjects: c.subjects ?? [],
      days: c.days,
      time: c.timing,
      fees: c.pricePerSubject,
      chapters,
    };
  });
}

function readCourses(): Course[] {
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

function writeCourses(courses: Course[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

export function fetchCourses(): Course[] {
  return readCourses();
}

export function createCourse(data: Omit<Course, "id">): Course {
  const courses = readCourses();
  const created: Course = { ...data, id: Date.now().toString() };
  const next = [...courses, created];
  writeCourses(next);
  return created;
}

export function updateCourse(id: string, updates: Partial<Omit<Course, "id">>): Course | null {
  const courses = readCourses();
  let updated: Course | null = null;
  const next = courses.map((c) => {
    if (c.id !== id) return c;
    updated = { ...c, ...updates, id: c.id };
    return updated;
  });
  if (!updated) return null;
  writeCourses(next);
  return updated;
}

export function deleteCourse(id: string): void {
  const courses = readCourses();
  const next = courses.filter((c) => c.id !== id);
  writeCourses(next);
}

export function addChapterToCourse(courseId: string, chapter: Omit<Chapter, "id">): Chapter | null {
  const courses = readCourses();
  let created: Chapter | null = null;
  const next = courses.map((course) => {
    if (course.id !== courseId) return course;
    const newChapter: Chapter = { ...chapter, id: Date.now().toString() };
    created = newChapter;
    return {
      ...course,
      chapters: [...course.chapters, newChapter],
    };
  });
  if (!created) return null;
  writeCourses(next);
  return created;
}

