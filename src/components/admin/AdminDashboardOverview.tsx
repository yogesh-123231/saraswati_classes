import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { BarChart2, BookOpen, ClipboardList, Users } from "lucide-react";

const AdminDashboardOverview = () => {
  const { courses, testSeries, students, enrollments } = useApp();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          High-level snapshot of courses, students, test series and inquiries.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Courses</p>
              <p className="text-lg font-semibold">{courses.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ClipboardList className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Test Series</p>
              <p className="text-lg font-semibold">{testSeries.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Students</p>
              <p className="text-lg font-semibold">{students.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <BarChart2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Inquiries</p>
              <p className="text-lg font-semibold">
                {enrollments.filter((e) => e.status === "Pending").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <p className="font-semibold text-sm">Recent Inquiries</p>
            <p className="text-xs text-muted-foreground">
              This is a read-only, placeholder snapshot. Detailed management is available in the Inquiry Management section.
            </p>
            <div className="space-y-2">
              {enrollments.slice(0, 5).map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-xs"
                >
                  <div>
                    <p className="font-medium">{e.name}</p>
                    <p className="text-muted-foreground">
                      {e.courseOrSeries}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{e.status}</p>
                </div>
              ))}
              {enrollments.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No inquiries yet. When students fill the Google Form, mapped inquiries will be listed here after backend integration.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6">
            <p className="font-semibold text-sm mb-2">Planned Analytics Area</p>
            <p className="text-xs text-muted-foreground mb-4">
              This space is reserved for future charts such as success ratios, enrolment trends and test performance once backend reporting is connected.
            </p>
            <div className="h-40 rounded-xl border border-dashed bg-muted/40 flex items-center justify-center">
              <span className="text-[11px] text-muted-foreground px-4 text-center">
                Analytics chart placeholder – integrate with real-time data from the institute&apos;s system.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;

