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

interface GalleryRow {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
}

const initialRows: GalleryRow[] = [
  {
    id: "1",
    category: "Classroom Photos",
    title: "Interactive Classroom Session",
    imageUrl: "https://placehold.co/600x400/0ea5e9/ffffff?text=Classroom+1",
  },
  {
    id: "2",
    category: "Topper Achievements",
    title: "Board Exam Toppers",
    imageUrl: "https://placehold.co/600x400/f97316/ffffff?text=Topper+1",
  },
];

const AdminGalleryManagement = () => {
  const [rows, setRows] = useState<GalleryRow[]>(initialRows);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryRow | null>(null);

  const openAdd = () => {
    setEditing({
      id: "",
      category: "",
      title: "",
      imageUrl: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (row: GalleryRow) => {
    setEditing(row);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) return;
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

  const shortUrl = (url: string) =>
    url.length > 40 ? `${url.slice(0, 37)}...` : url;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-1">
            Gallery Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage images for Classroom Photos, Topper Achievements and Events.
            Entries here will later be connected to the public gallery page.
          </p>
        </div>
        <Button size="sm" className="gap-1" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Image
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Image URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-xs">{row.category}</TableCell>
                  <TableCell className="text-xs">{row.title}</TableCell>
                  <TableCell className="text-xs">
                    <span title={row.imageUrl}>{shortUrl(row.imageUrl)}</span>
                  </TableCell>
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
                    colSpan={4}
                    className="py-6 text-center text-xs text-muted-foreground"
                  >
                    No gallery items yet. Use &quot;Add Image&quot; to create
                    placeholder records.
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
              {editing?.id ? "Edit Gallery Item" : "Add Gallery Item"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label htmlFor="gallery-category-input">Category</Label>
                <Input
                  id="gallery-category-input"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, category: e.target.value } : prev
                    )
                  }
                  placeholder="Classroom Photos / Topper Achievements / Events"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="gallery-title-input">Title</Label>
                <Input
                  id="gallery-title-input"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="gallery-url-input">Image URL</Label>
                <Input
                  id="gallery-url-input"
                  value={editing.imageUrl}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, imageUrl: e.target.value } : prev
                    )
                  }
                  placeholder="https://..."
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

export default AdminGalleryManagement;

