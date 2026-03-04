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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApp } from "@/context/AppContext";

interface EditableStudent {
  id: string;
  name: string;
  email: string;
  courses: string;
  status: string;
}

const seedFromContext = (
  students: ReturnType<typeof useApp>["students"]
): EditableStudent[] =>
  students.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    courses: `${s.approvedCourses.length} courses`,
    status: "Active",
  }));

const AdminStudentManagement = () => {
  const { students } = useApp();
  const [rows, setRows] = useState<EditableStudent[]>(() =>
    seedFromContext(students)
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EditableStudent | null>(null);

  const openAdd = () => {
    setEditing({
      id: "",
      name: "",
      email: "",
      courses: "",
      status: "Active",
    });
    setDialogOpen(true);
  };

  const openEdit = (row: EditableStudent) => {
    setEditing(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.name.trim()) return;
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
            Student Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage student records and their high-level enrolment info. All data
            here is placeholder until wired to the real student database.
          </p>
        </div>
        <Button size="sm" className="gap-1" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Enrolled Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-xs">{row.name}</TableCell>
                  <TableCell className="text-xs">{row.email}</TableCell>
                  <TableCell className="text-xs">{row.courses}</TableCell>
                  <TableCell className="text-xs">{row.status}</TableCell>
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
                    colSpan={5}
                    className="py-6 text-center text-xs text-muted-foreground"
                  >
                    No students configured in this view. Use &quot;Add
                    Student&quot; to create placeholder rows.
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
              {editing?.id ? "Edit Student" : "Add Student"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label htmlFor="student-name-input">Name</Label>
                <Input
                  id="student-name-input"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="student-email-input">Email</Label>
                <Input
                  id="student-email-input"
                  value={editing.email}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, email: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="student-courses-input">Enrolled Courses</Label>
                <Input
                  id="student-courses-input"
                  value={editing.courses}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, courses: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. 10th CBSE, CET Crash"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="student-status-input">Status</Label>
                <Input
                  id="student-status-input"
                  value={editing.status}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, status: e.target.value } : prev
                    )
                  }
                  placeholder="Active / Inactive"
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

export default AdminStudentManagement;

