import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart2 } from "lucide-react";

const placeholderResults = [
  {
    id: 1,
    exam: "10th Prelim 1 (Maths)",
    date: "—",
    score: "—",
    status: "Pending",
  },
  {
    id: 2,
    exam: "CET Mock Test (PCM)",
    date: "—",
    score: "—",
    status: "Pending",
  },
];

const StudentResults = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold mb-1">Results</h1>
        <p className="text-sm text-muted-foreground">
          This section will show your test and exam performance once result data is integrated from the backend.
        </p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-primary" />
            <p className="font-semibold text-sm">Result Summary (Placeholder)</p>
          </div>
          <p className="text-xs text-muted-foreground">
            A graphical view of your performance across tests and subjects will appear here after integration with the institute&apos;s result system.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <p className="font-semibold text-sm mb-3">Recent Results</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placeholderResults.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="text-xs">{r.exam}</TableCell>
                  <TableCell className="text-xs">{r.date}</TableCell>
                  <TableCell className="text-xs">{r.score}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentResults;

