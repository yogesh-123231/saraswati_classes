import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero.png";
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

import useEmblaCarousel from "embla-carousel-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const { testSeries, courses } = useApp();
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState("");

  const openEnroll = (target: string) => {
    setEnrollTarget(target);
    setEnrollOpen(true);
  };

  // Embla carousel setup for testimonials
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current || !emblaApi) return;
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (emblaApi) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [emblaApi, startAutoplay, stopAutoplay]);


  return (
    <Layout>
      {/* Modern Light EdTech Hero Section */}
      {/* Modern Light EdTech Hero Section */}
<section
  className="relative overflow-hidden py-[80px] md:py-[90px]"
  style={{
    background: "linear-gradient(180deg, #F7FBFF 0%, #FFFFFF 100%)",
  }}
>
  <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">

      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Headline */}
        <h1 className="text-[32px] md:text-[46px] font-bold leading-[1.2] text-[#0F172A] mb-4">
          A focused coaching institute for{" "}
          <span className="text-[#2EA7FF]">
            serious school & competitive prep
          </span>
        </h1>

        {/* Description */}
        <p className="text-[16px] text-[#475569] max-w-[520px] mb-6">
          Saraswati Classes offers structured classroom programs, test series
          and personalised mentoring for students aiming for top scores in
          boards and entrance exams.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to="/courses">
            <button className="px-6 py-3 bg-[#2EA7FF] text-white font-medium rounded-lg shadow-md hover:bg-[#0D9AE6] transition flex items-center gap-2">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>

          <Link to="/test-series">
            <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#0F172A] font-medium rounded-lg hover:bg-[#F8FAFC] transition">
              View Test Series
            </button>
          </Link>
        </div>
      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center"
      >
        {/* Glow */}
        <div className="absolute w-[420px] h-[420px] bg-[#2EA7FF]/20 rounded-full blur-3xl"></div>

        {/* Student Image */}
        <img
          src={heroImage}
          alt="Student"
          className="relative z-10 w-[380px] md:w-[420px] object-contain"
        />

        {/* Floating Card 1 */}
        <div className="absolute top-8 left-0 bg-white rounded-xl shadow-lg px-4 py-2 text-sm font-medium">
          70+ Available Courses
        </div>

        {/* Floating Card 2 */}
        <div className="absolute top-16 right-0 bg-white rounded-xl shadow-lg px-4 py-2 text-sm font-medium">
          10k+ Students
        </div>
      </motion.div>

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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1: Foundation Courses */}
            <div
              className="relative flex flex-col h-full rounded-[20px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
              style={{
                background: "linear-gradient(135deg, rgba(219, 234, 254, 0.8) 0%, rgba(191, 219, 254, 0.6) 100%)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex flex-col flex-1">
                {/* Step Number */}
                <div className="text-sm font-semibold text-slate-400 mb-4">01</div>

                {/* Icon Container */}
                <div className="mb-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-blue-100 text-blue-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Foundation Courses</h3>

                {/* Description as Bullet List */}
                <ul className="text-sm text-slate-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>8th–10th CBSE & SSC programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Strong Maths & Science focus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Structured fundamentals</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <Link to="/courses" className="w-full">
                  <Button
                    size="sm"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-full font-medium"
                  >
                    View Foundation
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2: JEE Preparation */}
            <div
              className="relative flex flex-col h-full rounded-[20px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
              style={{
                background: "linear-gradient(135deg, rgba(254, 243, 224, 0.8) 0%, rgba(253, 230, 197, 0.6) 100%)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex flex-col flex-1">
                {/* Step Number */}
                <div className="text-sm font-semibold text-slate-400 mb-4">02</div>

                {/* Icon Container */}
                <div className="mb-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-amber-100 text-amber-700">
                    <Monitor className="h-6 w-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4">JEE Preparation (via 11th–12th)</h3>

                {/* Description as Bullet List */}
                <ul className="text-sm text-slate-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>11th–12th PCMB programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>JEE exam pattern focus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Strong PCM foundation</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <Link to="/courses" className="w-full">
                  <Button
                    size="sm"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-full font-medium"
                  >
                    JEE-Oriented Batches
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3: NEET Preparation */}
            <div
              className="relative flex flex-col h-full rounded-[20px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
              style={{
                background: "linear-gradient(135deg, rgba(243, 232, 255, 0.8) 0%, rgba(230, 204, 255, 0.6) 100%)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex flex-col flex-1">
                {/* Step Number */}
                <div className="text-sm font-semibold text-slate-400 mb-4">03</div>

                {/* Icon Container */}
                <div className="mb-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-purple-100 text-purple-600">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4">NEET Preparation (via 11th–12th)</h3>

                {/* Description as Bullet List */}
                <ul className="text-sm text-slate-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Detailed Biology, Physics & Chemistry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>NEET-oriented curriculum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Future NEET aspirants</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <Link to="/courses" className="w-full">
                  <Button
                    size="sm"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-full font-medium"
                  >
                    NEET-Oriented Batches
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 4: CET Crash Course */}
            <div
              className="relative flex flex-col h-full rounded-[20px] p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5"
              style={{
                background: "linear-gradient(135deg, rgba(254, 237, 224, 0.8) 0%, rgba(254, 214, 165, 0.6) 100%)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex flex-col flex-1">
                {/* Step Number */}
                <div className="text-sm font-semibold text-slate-400 mb-4">04</div>

                {/* Icon Container */}
                <div className="mb-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-orange-100 text-orange-600">
                    <Calculator className="h-6 w-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4">CET Crash Course</h3>

                {/* Description as Bullet List */}
                <ul className="text-sm text-slate-600 space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>45–50 day intensive batch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>Multiple mock tests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>CET exam focused</span>
                  </li>
                </ul>

                {/* CTA Button */}
                <Link to="/courses" className="w-full">
                  <Button
                    size="sm"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-full font-medium"
                  >
                    View CET Crash
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
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
      <section className="py-16 md:py-20 bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A]">
            Don't take our word for it. Hear it from our students.
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto mt-3">
            Hear from students who have trusted Saraswati Classes for their academic journey.
          </p>
        </div>

        <div
          className="embla mt-8"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] px-2"
                >
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
                    <div className="mb-4">
                      <div className="w-10 h-10 rounded-full bg-sky-500 overflow-hidden">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-base leading-relaxed text-[#475569] mb-6">
                      “{t.text}”
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold text-[#0F172A]">{t.name}</p>
                      <p className="text-sm text-[#64748B] mt-1">{t.course}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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