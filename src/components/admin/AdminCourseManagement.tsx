import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, ListPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Course, CourseCategory } from "@/types/course";
import type { Chapter } from "@/types/chapter";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/services/courseService";

interface CourseFormState {
  id?: string;
  title: string;
  category: CourseCategory;
  time: string;
  days: string;
  description: string;
  fees: string;
  subjects: string;
}

const emptyCourseForm: CourseFormState = {
  title: "",
  category: "Foundation",
  time: "",
  days: "",
  description: "",
  fees: "",
  subjects: "",
};

const categories: CourseCategory[] = ["Foundation", "Science", "Competitive"];

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseFormState | null>(
    null
  );

  const [chapterDialogOpen, setChapterDialogOpen] = useState(false);
  const [chapterCourseId, setChapterCourseId] = useState<string | null>(null);
  const [chapterDrafts, setChapterDrafts] = useState<Chapter[]>([]);
  const [newChapter, setNewChapter] = useState<
    Omit<Chapter, "id" | "chapterNumber">
  >({
    chapterDescription: "",
    youtubeLink: "",
    testDescription: "",
    testLink: "",
  });

  useEffect(() => {
    setCourses(fetchCourses());
  }, []);

  const openAdd = () => {
    setEditingCourse(emptyCourseForm);
    setCourseDialogOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditingCourse({
      id: course.id,
      title: course.title,
      category: course.category,
      time: course.time,
      days: course.days,
      description: course.description,
      fees: course.fees.toString(),
      subjects: course.subjects.join(", "),
    });
    setCourseDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (!editingCourse) return;
    if (!editingCourse.title.trim()) return;

    const subjectsArray = editingCourse.subjects
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const feesNumber = Number(editingCourse.fees) || 0;

    const baseData: Omit<Course, "id"> = {
      title: editingCourse.title,
      category: editingCourse.category,
      description: editingCourse.description,
      subjects: subjectsArray,
      days: editingCourse.days,
      time: editingCourse.time,
      fees: feesNumber,
      chapters:
        editingCourse.id && courses.find((c) => c.id === editingCourse.id)
          ? courses.find((c) => c.id === editingCourse.id)!.chapters
          : [],
    };

    if (editingCourse.id) {
      const updated = updateCourse(editingCourse.id, baseData);
      if (updated) {
        setCourses((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      }
    } else {
      const created = createCourse(baseData);
      setCourses((prev) => [...prev, created]);
    }

    setCourseDialogOpen(false);
    setEditingCourse(null);
  };

  const openChapters = (course: Course) => {
    setChapterCourseId(course.id);
    setChapterDrafts(course.chapters);
    setNewChapter({
      chapterDescription: "",
      youtubeLink: "",
      testDescription: "",
      testLink: "",
    });
    setChapterDialogOpen(true);
  };

  const handleAddChapter = () => {
    if (!chapterCourseId) return;
    if (!newChapter.chapterDescription.trim() && !newChapter.youtubeLink.trim())
      return;

    setChapterDrafts((prev) => {
      const nextNumber = prev.length ? prev[prev.length - 1].chapterNumber + 1 : 1;
      const created: Chapter = {
        id: `${chapterCourseId}-ch-${Date.now()}`,
        chapterNumber: nextNumber,
        ...newChapter,
      };
      return [...prev, created];
    });

    setNewChapter({
      chapterDescription: "",
      youtubeLink: "",
      testDescription: "",
      testLink: "",
    });
  };

  const handleSaveChapters = () => {
    if (!chapterCourseId) return;
    const updated = updateCourse(chapterCourseId, { chapters: chapterDrafts });
    if (updated) {
      setCourses((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    }
    setChapterDialogOpen(false);
    setChapterCourseId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Course Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage the list of courses visible on the website. All changes here
            are frontend-only placeholders until backend APIs are connected.
          </p>
        </div>
        <Button size="sm" className="gap-1" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Chapters</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="text-xs">{course.title}</TableCell>
                  <TableCell className="text-xs">{course.category}</TableCell>
                  <TableCell className="text-xs">{course.time}</TableCell>
                  <TableCell className="text-xs">{course.days}</TableCell>
                  <TableCell className="text-xs">
                    ₹{course.fees.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-xs">
                    {course.subjects.join(", ")}
                  </TableCell>
                  <TableCell className="text-xs">
                    {course.chapters.length}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => openEdit(course)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-7 w-7"
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => openChapters(course)}
                    >
                      <ListPlus className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {courses.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-6 text-center text-xs text-muted-foreground"
                  >
                    No courses configured in this admin view. Use &quot;Add
                    Course&quot; to create placeholder rows.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm">
              {editingCourse?.id ? "Edit Course" : "Add Course"}
            </DialogTitle>
          </DialogHeader>

          {editingCourse && (
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label htmlFor="course-title-input">Course Title</Label>
                <Input
                  id="course-title-input"
                  value={editingCourse.title}
                  onChange={(e) =>
                    setEditingCourse((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-category-input">Category</Label>
                <Select
                  value={editingCourse.category}
                  onValueChange={(value) =>
                    setEditingCourse((prev) =>
                      prev
                        ? { ...prev, category: value as CourseCategory }
                        : prev
                    )
                  }
                >
                  <SelectTrigger id="course-category-input">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-time-input">Time</Label>
                <Input
                  id="course-time-input"
                  value={editingCourse.time}
                  onChange={(e) =>
                    setEditingCourse((prev) =>
                      prev ? { ...prev, time: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. 4:15 – 5:30 PM"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-days-input">Days</Label>
                <Input
                  id="course-days-input"
                  value={editingCourse.days}
                  onChange={(e) =>
                    setEditingCourse((prev) =>
                      prev ? { ...prev, days: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. Monday – Saturday"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-fees-input">Fees</Label>
                <Input
                  id="course-fees-input"
                  value={editingCourse.fees}
                  onChange={(e) =>
                    setEditingCourse((prev) =>
                      prev ? { ...prev, fees: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. 9000"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-subjects-input">Subjects</Label>
                <Input
                  id="course-subjects-input"
                  value={editingCourse.subjects}
                  onChange={(e) =>
                    setEditingCourse((prev) =>
                      prev ? { ...prev, subjects: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. Maths, Science"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-description-input">Short Description</Label>
                <Textarea
                  id="course-description-input"
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) =>
                    setEditingCourse((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCourseDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={chapterDialogOpen} onOpenChange={setChapterDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm">Manage Chapters</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {chapterDrafts.map((ch) => (
                <div
                  key={ch.id}
                  className="rounded-lg border border-dashed bg-muted/60 px-3 py-2 space-y-1"
                >
                  <p className="text-xs font-semibold">
                    Chapter {ch.chapterNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ch.chapterDescription}
                  </p>
                  {ch.youtubeLink && (
                    <p className="text-[11px] text-muted-foreground">
                      YouTube: {ch.youtubeLink}
                    </p>
                  )}
                  {ch.testLink && (
                    <p className="text-[11px] text-muted-foreground">
                      Test: {ch.testLink}
                    </p>
                  )}
                </div>
              ))}
              {chapterDrafts.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No chapters added yet. Use the form below to add the first one.
                </p>
              )}
            </div>

            <div className="border-t pt-3 space-y-2">
              <p className="text-xs font-semibold">Add Chapter</p>
              <div className="space-y-1">
                <Label htmlFor="chapter-description-input">
                  Chapter Description
                </Label>
                <Textarea
                  id="chapter-description-input"
                  rows={2}
                  value={newChapter.chapterDescription}
                  onChange={(e) =>
                    setNewChapter((prev) => ({
                      ...prev,
                      chapterDescription: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="chapter-youtube-input">Private YouTube Link</Label>
                <Input
                  id="chapter-youtube-input"
                  value={newChapter.youtubeLink}
                  onChange={(e) =>
                    setNewChapter((prev) => ({
                      ...prev,
                      youtubeLink: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="chapter-test-desc-input">Test Description</Label>
                <Input
                  id="chapter-test-desc-input"
                  value={newChapter.testDescription}
                  onChange={(e) =>
                    setNewChapter((prev) => ({
                      ...prev,
                      testDescription: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="chapter-test-link-input">Google Form Link</Label>
                <Input
                  id="chapter-test-link-input"
                  value={newChapter.testLink}
                  onChange={(e) =>
                    setNewChapter((prev) => ({
                      ...prev,
                      testLink: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddChapter}
                >
                  Add Chapter
                </Button>
                <Button size="sm" onClick={handleSaveChapters}>
                  Save All
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourseManagement;

