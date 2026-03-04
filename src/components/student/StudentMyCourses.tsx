import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const StudentMyCourses = () => {
  const { courses } = useApp();
  const { currentStudent } = useAuth();

  const approvedCourses = courses.filter((c) =>
    currentStudent?.approvedCourses.includes(c.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold mb-1">
          My Courses
        </h1>
        <p className="text-sm text-muted-foreground">
          View your assigned courses and their modules. Video lessons are locked
          placeholders and will be unlocked by the admin later.
        </p>
      </div>

      {approvedCourses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground text-sm">
            No courses assigned yet. Once the admin approves your enrollment,
            your courses and modules will appear here.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {approvedCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">{course.category}</Badge>
                        <Badge variant="outline">{course.mode}</Badge>
                      </div>
                      <h2 className="font-semibold text-base md:text-lg">
                        {course.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        {course.timing} • {course.days}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {course.chapters.length} modules
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {course.chapters.map((ch, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border border-dashed bg-muted/60 px-3 py-2"
                      >
                        <span className="text-xs font-semibold text-primary mt-0.5">
                          {idx + 1}.
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium flex items-center gap-2">
                            {ch.title}
                            <Lock className="h-3 w-3 text-primary" />
                          </p>
                          {ch.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {ch.description}
                            </p>
                          )}
                          <p className="text-[11px] text-muted-foreground mt-1">
                            Video placeholder – a private YouTube link will be
                            embedded here once the admin uploads and grants
                            access.
                          </p>
                        </div>
                      </div>
                    ))}

                    {course.chapters.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        Modules will be configured for this course by the
                        admin. You’ll see topic-wise videos here once they are
                        added.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMyCourses;

