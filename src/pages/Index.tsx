import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Monitor,
  ArrowRight,
  Stethoscope,
  Calculator,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useApp } from "@/context/AppContext";
import { testimonials } from "@/data/mockData";
import HomeBannerCarousel from "@/components/banner/HomeBannerCarousel";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const { testSeries, heroPosters, courses } = useApp();
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState("");
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const openEnroll = (target: string) => {
    setEnrollTarget(target);
    setEnrollOpen(true);
  };

  const enabledPosters = heroPosters.filter((p) => p.enabled);

  useEffect(() => {
    if (!enabledPosters.length) return;
    const timer = setTimeout(() => {
      setCurrentPosterIndex((prev) => (prev + 1) % enabledPosters.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentPosterIndex, enabledPosters.length]);

  const goToNextPoster = () => {
    setCurrentPosterIndex((prev) => (prev + 1) % enabledPosters.length);
  };

  const goToPrevPoster = () => {
    setCurrentPosterIndex((prev) => (prev - 1 + enabledPosters.length) % enabledPosters.length);
  };

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-950 via-slate-900 to-slate-950 text-primary-foreground">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-32 -right-24 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl"
            animate={{ y: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
            animate={{ y: [0, -10, 0], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero Poster */}
        {enabledPosters.length > 0 && (
          <div className="pointer-events-none absolute inset-x-0 top-4 md:top-6 z-20">
            <div className="pointer-events-auto max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div
                className="relative group"
                onTouchStart={(e) => (touchStartXRef.current = e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  const start = touchStartXRef.current;
                  if (start == null) return;
                  const delta = e.changedTouches[0].clientX - start;
                  if (delta > 40) goToPrevPoster();
                  if (delta < -40) goToNextPoster();
                  touchStartXRef.current = null;
                }}
              >
                <div className="bg-background/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 p-2">
                  <Link to={`/test-series/${enabledPosters[currentPosterIndex].testSeriesId}`}>
                    <motion.img
                      key={enabledPosters[currentPosterIndex].id}
                      src={enabledPosters[currentPosterIndex].imageUrl}
                      className="w-full h-32 md:h-40 object-cover rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    />
                  </Link>

                  {enabledPosters.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                        <button
                          type="button"
                          onClick={goToPrevPoster}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground shadow hover:bg-background"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={goToNextPoster}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground shadow hover:bg-background"
                        >
                          ›
                        </button>
                      </div>

                      <div className="absolute -bottom-3 inset-x-0 flex justify-center gap-1.5">
                        {enabledPosters.map((p, index) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setCurrentPosterIndex(index)}
                            className={`h-1.5 rounded-full transition-[width,transform,opacity,background-color] duration-300 ease-out ${
                              index === currentPosterIndex
                                ? "w-6 bg-sky-500 opacity-100 scale-110"
                                : "w-2 bg-sky-200 opacity-60 scale-100"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-44 pb-20 md:pt-52 md:pb-28 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                Premium coaching for CBSE • SSC • JEE • NEET • CET
              </p>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                A focused coaching institute
                <span className="block text-sky-300">
                  for serious school & competitive prep.
                </span>
              </h1>
              <p className="mt-4 text-sm md:text-base text-sky-100/80 max-w-xl">
                Saraswati Classes offers structured classroom programs, test
                series and personalised mentoring for students aiming for top
                scores in boards and entrance exams.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/courses">
                  <Button size="lg" className="gap-2 shadow-lg shadow-sky-500/30">
                    Explore Courses
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/test-series">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-sky-300/60 text-sky-50 hover:bg-sky-900/40"
                  >
                    View Test Series
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="relative rounded-3xl bg-background/5 border border-white/10 backdrop-blur-xl shadow-2xl px-6 py-5 space-y-4">
              <p className="text-xs font-semibold text-sky-100/80 uppercase tracking-wide">
                Results Snapshot
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-2xl font-bold text-sky-200">95%+</p>
                  <p className="text-sky-100/80">Board exam success rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-sky-200">50+</p>
                  <p className="text-sky-100/80">Students in top merit lists</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-sky-200">10+</p>
                  <p className="text-sky-100/80">Years of focused teaching</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-sky-200">4</p>
                  <p className="text-sky-100/80">Dedicated test series tracks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeBannerCarousel />

      {/* Programs We Offer */}
      <section className="py-12 md:py-16 bg-background">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">
              Programs We Offer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Structured programs across foundation, science streams and
              competitive exam preparation designed for consistent, year-long
              performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 shrink-0">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-lg">Foundation Courses</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  8th–10th CBSE & SSC batches focused on strong Maths and
                  Science fundamentals.
                </p>
                <Link to="/courses">
                  <Button size="sm" variant="outline" className="gap-1">
                    View Foundation
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 shrink-0">
                    <Monitor className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-lg">
                    JEE Preparation (via 11th–12th)
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Strong PCM base through 11th–12th PCMB with focus on JEE exam
                  patterns.
                </p>
                <Link to="/courses">
                  <Button size="sm" variant="outline" className="gap-1">
                    JEE-Oriented Batches
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-lg">
                    NEET Preparation (via 11th–12th)
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed Biology, Physics & Chemistry coverage for future NEET
                  aspirants.
                </p>
                <Link to="/courses">
                  <Button size="sm" variant="outline" className="gap-1">
                    NEET-Oriented Batches
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 shrink-0">
                    <Calculator className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-lg">CET Crash Course</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  High-intensity 45–50 days CET crash batch with multiple mock
                  tests.
                </p>
                <Link to="/courses">
                  <Button size="sm" variant="outline" className="gap-1">
                    View CET Crash
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Explore Courses */}
      <section className="py-12 md:py-16 bg-secondary/40">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Explore Courses</h2>
              <p className="text-muted-foreground">
                A quick look at some of our key batches for this academic year.
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline" size="sm" className="gap-2 shrink-0">
                <span>View All Courses</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <Card key={course.id} className="card-hover h-full flex flex-col rounded-xl shadow-sm overflow-hidden">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.mode}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {course.timing} • {course.days}
                  </p>
                  <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
                    {course.description}
                  </p>
                  <Link to={`/courses/${course.id}`} className="mt-4">
                    <Button size="sm" variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Series Highlight */}
      <section className="py-12 md:py-16 bg-secondary/40">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Test Series Highlights</h2>
              <p className="text-muted-foreground">
                Practice with exam-pattern tests for CBSE and CET.
              </p>
            </div>
            <Link to="/test-series">
              <Button variant="outline" size="sm" className="gap-2 shrink-0">
                <span>View All</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testSeries.slice(0, 3).map((ts) => (
              <Card key={ts.id} className="card-hover h-full flex flex-col rounded-xl shadow-sm overflow-hidden">
                <img
                  src={ts.image}
                  alt={ts.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1">{ts.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {ts.overview}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => openEnroll(ts.title)}>
                      Enroll Now
                    </Button>
                    <Link to={`/test-series/${ts.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-background">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from students who have trusted Saraswati Classes for their academic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, index) => (
              <Card key={index} className="h-full rounded-xl shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover border border-sky-100"
                  />
                  <p className="text-sm text-muted-foreground">“{t.text}”</p>
                  <div className="mt-1">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.course}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-secondary/60">
        <div className="rounded-xl bg-background shadow-sm p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              Ready to start your journey?
            </h2>
            <p className="text-muted-foreground max-w-xl">
                Explore our curated courses and test series to kickstart your preparation
                with expert guidance.
              </p>
            </div>
            <Link to="/courses">
              <Button size="lg" className="gap-2">
                View Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
        </div>
      </section>

      <EnrollmentModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        courseOrSeries={enrollTarget}
      />

      {/* Map section above footer */}
      <section className="py-12 md:py-16 bg-background">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Visit Our Centre</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Saraswati Classes is conveniently located for students across the city.
              Use the map below to get directions to our coaching centre.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border bg-muted">
              <iframe
                title="Saraswati Classes Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.939683862665!2d73.856743!3d18.516726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06c7b9b9b9b%3A0x0000000000000000!2sCoaching%20Institute!5e0!3m2!1sen!2sin!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 md:h-80 border-0"
              />
            </div>
            <div className="flex justify-center">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Coaching+Institute"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  Get Directions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;