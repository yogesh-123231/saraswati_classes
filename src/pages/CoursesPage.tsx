import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const categories = ["All", "Foundation", "Science", "Competitive"] as const;

const CoursesPage = () => {
  const { courses } = useApp();
  const { currentStudent } = useAuth();

  const [filter, setFilter] = useState<string>("All");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState("");

  const filtered =
    filter === "All" ? courses : courses.filter((c) => c.category === filter);

  const openEnroll = (t: string) => {
    setEnrollTarget(t);
    setEnrollOpen(true);
  };

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Our Courses
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Carefully designed batches for CBSE, SSC and Science with clear
              timings, days and transparent per-subject fees.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={filter === c ? "default" : "outline"}
                onClick={() => setFilter(c)}
              >
                {c}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card className="card-hover h-full flex flex-col rounded-xl shadow-sm overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-6 flex flex-col flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="outline">{course.mode}</Badge>
                    </div>

                    <h3 className="font-semibold text-lg leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {course.timing} • {course.days}
                    </p>

                    <p className="text-sm text-muted-foreground flex-1">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="inline-flex items-center gap-2 text-primary">
                        <IndianRupee className="h-3 w-3 shrink-0" />
                        {course.pricePerSubject.toLocaleString("en-IN")}{" "}
                        <span className="text-xs text-muted-foreground">
                          / subject
                        </span>
                      </span>
                      {course.subjects && course.subjects.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          Subjects: {course.subjects.join(", ")}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      {!currentStudent?.approvedCourses.includes(course.id) && (
                        <Button
                          size="sm"
                          className="flex-1 bg-sky-700 hover:bg-sky-800"
                          onClick={() => openEnroll(course.title)}
                        >
                          Enroll Now
                        </Button>
                      )}

                      <Link to={`/courses/${course.id}`} className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EnrollmentModal open={enrollOpen} onClose={() => setEnrollOpen(false)} courseOrSeries={enrollTarget} />
    </Layout>
  );
};

export default CoursesPage;