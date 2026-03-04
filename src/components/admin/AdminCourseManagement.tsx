import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";

interface EditableCourse {
  id: string;
  title: string;
  category: string;
  timing: string;
  days: string;
  pricePerSubject: string;
}

const mapInitialCourses = (coursesFromContext: ReturnType<typeof useApp>["courses"]): EditableCourse[] =>
  coursesFromContext.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    timing: c.timing,
    days: c.days,
    pricePerSubject: `₹${c.pricePerSubject.toLocaleString("en-IN")}`,
  }));

const AdminCourseManagement = () => {
  const { courses } = useApp();
  const [rows, setRows] = useState<EditableCourse[]>(() =>
    mapInitialCourses(courses)
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EditableCourse | null>(null);

  const openAdd = () => {
    setEditing({
      id: "",
      title: "",
      category: "",
      timing: "",
      days: "",
      pricePerSubject: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (row: EditableCourse) => {
    setEditing(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      return;
    }
    setRows((prev) => {
      if (editing.id && prev.some((r) => r.id === editing.id)) {
        return prev.map((r) => (r.id === editing.id ? editing : r));
      }
      return [
        ...prev,
        {
          ...editing,
          id: `local-${Date.now()}`,
        },
      ];
    });
    setDialogOpen(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-1">
            Course Management
          </h1>
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
                <TableHead>Timing</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Price / Subject</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-xs">{row.title}</TableCell>
                  <TableCell className="text-xs">{row.category}</TableCell>
                  <TableCell className="text-xs">{row.timing}</TableCell>
                  <TableCell className="text-xs">{row.days}</TableCell>
                  <TableCell className="text-xs">{row.pricePerSubject}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => openEdit(row)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-7 w-7"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm">
              {editing?.id ? "Edit Course" : "Add Course"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label htmlFor="course-title-input">Course Title</Label>
                <Input
                  id="course-title-input"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-category-input">Category</Label>
                <Input
                  id="course-category-input"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, category: e.target.value } : prev
                    )
                  }
                  placeholder="Foundation / Science / Competitive"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-timing-input">Timing</Label>
                <Input
                  id="course-timing-input"
                  value={editing.timing}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, timing: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. 4:15 – 5:30 PM"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-days-input">Days</Label>
                <Input
                  id="course-days-input"
                  value={editing.days}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, days: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. Monday – Saturday"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-price-input">Price per Subject</Label>
                <Input
                  id="course-price-input"
                  value={editing.pricePerSubject}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? { ...prev, pricePerSubject: e.target.value }
                        : prev
                    )
                  }
                  placeholder="e.g. ₹9,000"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDialogOpen(false)}
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
    </div>
  );
};

export default AdminCourseManagement;

