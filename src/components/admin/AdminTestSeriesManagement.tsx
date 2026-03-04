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

interface EditableSeries {
  id: string;
  title: string;
  testsCount: number;
  mode: string;
  price: string;
}

const seedSeries = (
  series: ReturnType<typeof useApp>["testSeries"]
): EditableSeries[] =>
  series.map((t) => ({
    id: t.id,
    title: t.title,
    testsCount: t.testsCount,
    mode: t.mode,
    price: t.price,
  }));

const AdminTestSeriesManagement = () => {
  const { testSeries } = useApp();
  const [rows, setRows] = useState<EditableSeries[]>(() => seedSeries(testSeries));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EditableSeries | null>(null);

  const openAdd = () => {
    setEditing({
      id: "",
      title: "",
      testsCount: 0,
      mode: "",
      price: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (row: EditableSeries) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-1">
            Test Series Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure test series meta information. Actual test papers and
            schedules will be handled by backend later.
          </p>
        </div>
        <Button size="sm" className="gap-1" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Test Series
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>No. of Tests</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-xs">{row.title}</TableCell>
                  <TableCell className="text-xs">{row.testsCount}</TableCell>
                  <TableCell className="text-xs">{row.mode}</TableCell>
                  <TableCell className="text-xs">{row.price}</TableCell>
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
                    No test series configured in this view. Use &quot;Add Test
                    Series&quot; to create placeholder rows.
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
              {editing?.id ? "Edit Test Series" : "Add Test Series"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label htmlFor="ts-title-input">Title</Label>
                <Input
                  id="ts-title-input"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-tests-input">Number of Tests</Label>
                <Input
                  id="ts-tests-input"
                  type="number"
                  value={editing.testsCount}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? { ...prev, testsCount: Number(e.target.value) || 0 }
                        : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-mode-input">Mode</Label>
                <Input
                  id="ts-mode-input"
                  value={editing.mode}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, mode: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. Offline / OMR Based"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-price-input">Price</Label>
                <Input
                  id="ts-price-input"
                  value={editing.price}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, price: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. ₹6,000"
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

export default AdminTestSeriesManagement;

