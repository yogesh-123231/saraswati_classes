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
import { Textarea } from "@/components/ui/textarea";
import type { TestSeries, Test } from "@/types/testSeries";
import {
  fetchTestSeries,
  createTestSeries,
  updateTestSeries,
  deleteTestSeries,
} from "@/services/testSeriesService";

interface SeriesFormState {
  id?: string;
  title: string;
  category: string;
  standard: string;
  board: string;
  description: string;
  price: string;
}

const emptySeriesForm: SeriesFormState = {
  title: "",
  category: "",
  standard: "",
  board: "",
  description: "",
  price: "",
};

const AdminTestSeriesManagement = () => {
  const [series, setSeries] = useState<TestSeries[]>([]);
  const [seriesDialogOpen, setSeriesDialogOpen] = useState(false);
  const [editingSeries, setEditingSeries] = useState<SeriesFormState | null>(
    null
  );

  const [testsDialogOpen, setTestsDialogOpen] = useState(false);
  const [testsSeriesId, setTestsSeriesId] = useState<string | null>(null);
  const [testsDrafts, setTestsDrafts] = useState<Test[]>([]);
  const [newTest, setNewTest] = useState<Omit<Test, "id" | "testNumber">>({
    description: "",
    testLink: "",
  });

  useEffect(() => {
    setSeries(fetchTestSeries());
  }, []);

  const openAdd = () => {
    setEditingSeries(emptySeriesForm);
    setSeriesDialogOpen(true);
  };

  const openEdit = (ts: TestSeries) => {
    setEditingSeries({
      id: ts.id,
      title: ts.title,
      category: ts.category,
      standard: ts.standard,
      board: ts.board,
      description: ts.description,
      price: ts.price.toString(),
    });
    setSeriesDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteTestSeries(id);
    setSeries((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    if (!editingSeries) return;
    if (!editingSeries.title.trim()) return;

    const priceNumber = Number(editingSeries.price) || 0;

    const base: Omit<TestSeries, "id"> = {
      title: editingSeries.title,
      category: editingSeries.category,
      standard: editingSeries.standard,
      board: editingSeries.board,
      description: editingSeries.description,
      price: priceNumber,
      tests:
        editingSeries.id && series.find((s) => s.id === editingSeries.id)
          ? series.find((s) => s.id === editingSeries.id)!.tests
          : [],
    };

    if (editingSeries.id) {
      const updated = updateTestSeries(editingSeries.id, base);
      if (updated) {
        setSeries((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
      }
    } else {
      const created = createTestSeries(base);
      setSeries((prev) => [...prev, created]);
    }

    setSeriesDialogOpen(false);
    setEditingSeries(null);
  };

  const openTests = (ts: TestSeries) => {
    setTestsSeriesId(ts.id);
    setTestsDrafts(ts.tests);
    setNewTest({
      description: "",
      testLink: "",
    });
    setTestsDialogOpen(true);
  };

  const handleAddTest = () => {
    if (!testsSeriesId) return;
    if (!newTest.description.trim() && !newTest.testLink.trim()) return;

    setTestsDrafts((prev) => {
      const nextNumber = prev.length ? prev[prev.length - 1].testNumber + 1 : 1;
      const created: Test = {
        id: `${testsSeriesId}-test-${Date.now()}`,
        testNumber: nextNumber,
        ...newTest,
      };
      return [...prev, created];
    });

    setNewTest({
      description: "",
      testLink: "",
    });
  };

  const handleSaveTests = () => {
    if (!testsSeriesId) return;
    const updated = updateTestSeries(testsSeriesId, { tests: testsDrafts });
    if (updated) {
      setSeries((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
    }
    setTestsDialogOpen(false);
    setTestsSeriesId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
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
                <TableHead>Category</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Board</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {series.map((ts) => (
                <TableRow key={ts.id}>
                  <TableCell className="text-xs">{ts.title}</TableCell>
                  <TableCell className="text-xs">{ts.category}</TableCell>
                  <TableCell className="text-xs">{ts.standard}</TableCell>
                  <TableCell className="text-xs">{ts.board}</TableCell>
                  <TableCell className="text-xs">{ts.tests.length}</TableCell>
                  <TableCell className="text-xs">
                    ₹{ts.price.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => openEdit(ts)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-7 w-7"
                      onClick={() => handleDelete(ts.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => openTests(ts)}
                    >
                      <ListPlus className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {series.length === 0 && (
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

      <Dialog open={seriesDialogOpen} onOpenChange={setSeriesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-sm">
              {editingSeries?.id ? "Edit Test Series" : "Add Test Series"}
            </DialogTitle>
          </DialogHeader>

          {editingSeries && (
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label htmlFor="ts-title-input">Title</Label>
                <Input
                  id="ts-title-input"
                  value={editingSeries.title}
                  onChange={(e) =>
                    setEditingSeries((prev) =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-category-input">Category</Label>
                <Input
                  id="ts-category-input"
                  value={editingSeries.category}
                  onChange={(e) =>
                    setEditingSeries((prev) =>
                      prev ? { ...prev, category: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. Foundation / Competitive"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-standard-input">Standard</Label>
                <Input
                  id="ts-standard-input"
                  value={editingSeries.standard}
                  onChange={(e) =>
                    setEditingSeries((prev) =>
                      prev ? { ...prev, standard: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. 9th, 10th, 11th"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-board-input">Board</Label>
                <Input
                  id="ts-board-input"
                  value={editingSeries.board}
                  onChange={(e) =>
                    setEditingSeries((prev) =>
                      prev ? { ...prev, board: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. CBSE / SSC"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-price-input">Fees</Label>
                <Input
                  id="ts-price-input"
                  value={editingSeries.price}
                  onChange={(e) =>
                    setEditingSeries((prev) =>
                      prev ? { ...prev, price: e.target.value } : prev
                    )
                  }
                  placeholder="e.g. 6000"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ts-description-input">Description</Label>
                <Textarea
                  id="ts-description-input"
                  rows={3}
                  value={editingSeries.description}
                  onChange={(e) =>
                    setEditingSeries((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSeriesDialogOpen(false)}
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

      <Dialog open={testsDialogOpen} onOpenChange={setTestsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm">Manage Tests</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {testsDrafts.map((test) => (
                <div
                  key={test.id}
                  className="rounded-lg border border-dashed bg-muted/60 px-3 py-2 space-y-1"
                >
                  <p className="text-xs font-semibold">
                    Test {test.testNumber}
                  </p>
                  {test.description && (
                    <p className="text-xs text-muted-foreground">
                      {test.description}
                    </p>
                  )}
                  {test.testLink && (
                    <p className="text-[11px] text-muted-foreground">
                      Form: {test.testLink}
                    </p>
                  )}
                </div>
              ))}
              {testsDrafts.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No tests added yet. Use the form below to add the first one.
                </p>
              )}
            </div>

            <div className="border-t pt-3 space-y-2">
              <p className="text-xs font-semibold">Add Test</p>
              <div className="space-y-1">
                <Label htmlFor="test-description-input">Test Description</Label>
                <Input
                  id="test-description-input"
                  value={newTest.description}
                  onChange={(e) =>
                    setNewTest((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="test-link-input">Google Form Link</Label>
                <Input
                  id="test-link-input"
                  value={newTest.testLink}
                  onChange={(e) =>
                    setNewTest((prev) => ({
                      ...prev,
                      testLink: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={handleAddTest}>
                  Add Test
                </Button>
                <Button size="sm" onClick={handleSaveTests}>
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

export default AdminTestSeriesManagement;

