import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const StudentMyTestSeries = () => {
  const { testSeries } = useApp();
  const { currentStudent } = useAuth();

  const approvedTs = testSeries.filter((t) =>
    currentStudent?.approvedTestSeries.includes(t.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold mb-1">
          My Test Series
        </h1>
        <p className="text-sm text-muted-foreground">
          View the test series you are enrolled in. Individual tests remain
          locked placeholders and will be activated by the admin.
        </p>
      </div>

      {approvedTs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground text-sm">
            No test series assigned yet. Once the admin approves your test
            series enrollment, you will see the list here.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {approvedTs.map((ts) => (
            <motion.div
              key={ts.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-base md:text-lg">
                        {ts.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        {ts.testsCount} tests • {ts.mode}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Test list and links are controlled by the institute and
                      will be unlocked as per schedule.
                    </p>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {Array.from({ length: Math.min(ts.testsCount, 6) }).map(
                      (_, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 rounded-lg border border-dashed bg-muted/60 px-3 py-2"
                        >
                          <Lock className="h-3 w-3 text-primary mt-0.5" />
                          <div>
                            <p className="text-xs font-medium">
                              Test {idx + 1} (Locked)
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              This test will be visible with full details once
                              your access is enabled by admin.
                            </p>
                          </div>
                        </div>
                      )
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

export default StudentMyTestSeries;

