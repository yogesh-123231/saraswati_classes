import { motion } from "framer-motion";
import { BookOpen, ClipboardList, Clock, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const StudentDashboardOverview = () => {
  const { courses, testSeries } = useApp();
  const { currentStudent } = useAuth();

  const approvedCourses = courses.filter((c) =>
    currentStudent?.approvedCourses.includes(c.id)
  );
  const approvedTs = testSeries.filter((t) =>
    currentStudent?.approvedTestSeries.includes(t.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Quick snapshot of your courses, tests and upcoming work.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Courses</p>
              <p className="text-lg font-semibold">
                {approvedCourses.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardList className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Test Series</p>
              <p className="text-lg font-semibold">
                {approvedTs.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Upcoming Tests
              </p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Best Score (Placeholder)
              </p>
              <p className="text-lg font-semibold">—</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardContent className="p-5">
            <p className="font-semibold mb-2 text-sm">Recent Courses</p>
            <p className="text-xs text-muted-foreground mb-4">
              Quick access to courses you’ve been assigned.
            </p>
            <div className="space-y-2">
              {approvedCourses.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-xs"
                >
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-muted-foreground">
                      {c.timing} • {c.days}
                    </p>
                  </div>
                </div>
              ))}
              {approvedCourses.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No courses assigned yet. Approved courses will appear here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="font-semibold mb-2 text-sm">Recent Test Series</p>
            <p className="text-xs text-muted-foreground mb-4">
              Once you are enrolled to test series, they will be listed here.
            </p>
            <div className="space-y-2">
              {approvedTs.slice(0, 3).map((ts) => (
                <div
                  key={ts.id}
                  className="flex items-center justify-between rounded-md border px-3 py-2 text-xs"
                >
                  <div>
                    <p className="font-medium">{ts.title}</p>
                    <p className="text-muted-foreground">
                      {ts.testsCount} tests • {ts.mode}
                    </p>
                  </div>
                </div>
              ))}
              {approvedTs.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No test series assigned yet. Approved series will appear here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentDashboardOverview;

