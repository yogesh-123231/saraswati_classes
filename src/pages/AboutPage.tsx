import { Users, Award, BookOpen, Target, PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { testimonials } from "@/data/mockData";

const AboutPage = () => (
  <Layout>
    <section className="py-12 md:py-16">
      <div className="space-y-12 md:space-y-16">
        {/* Mission Statement */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            About Saraswati Classes
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Saraswati Classes is a focused coaching institute dedicated to
            helping students achieve strong board results and competitive exam
            scores through disciplined teaching and regular assessment.
          </p>
        </div>

        {/* Results Overview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Results Overview</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                label: "500+ Students",
                desc: "Trusted by hundreds of families",
              },
              {
                icon: Award,
                label: "90%+ Score Achievers",
                desc: "Strong track record in boards",
              },
              {
                icon: BookOpen,
                label: "School & Entrance",
                desc: "Integrated preparation approach",
              },
              {
                icon: Target,
                label: "Dedicated Faculty",
                desc: "Experienced and approachable teachers",
              },
            ].map((s) => (
              <Card key={s.label} className="text-center h-full rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    <s.icon className="h-10 w-10 text-primary shrink-0" />
                  </div>
                  <h3 className="font-semibold">{s.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Ratio Chart placeholder + Mission */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide high-quality, disciplined coaching that empowers every
              student to reach his or her potential. We focus on clarity of
              concepts, regular practice and honest feedback to build real
              confidence.
            </p>
            <h2 className="text-2xl font-semibold">Our Approach</h2>
            <p className="text-muted-foreground">
              We combine clear classroom teaching with test series, doubt
              sessions and personal mentoring. Small batch sizes allow teachers
              to track individual progress and correct mistakes early.
            </p>
          </div>
          <Card className="overflow-hidden rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-sm">
                    Success Ratio Chart (Placeholder)
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This area will display a live success ratio chart once
                    backend analytics are connected.
                  </p>
                </div>
              </div>
              <div className="mt-4 h-52 rounded-xl border border-dashed border-muted flex items-center justify-center bg-muted/40">
                <span className="text-xs text-muted-foreground text-center px-4">
                  Success ratio chart placeholder – integrate with real result
                  data and visualisations from backend.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Saraswati Classes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Why Choose Saraswati Classes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Structured Planning",
                desc: "Annual teaching plans, test schedules and revision strategies for each batch.",
              },
              {
                title: "Personal Attention",
                desc: "Smaller batches and approachable teachers ensure every doubt is addressed.",
              },
              {
                title: "Exam-Oriented Practice",
                desc: "Board-style papers and entrance pattern tests to build real exam temperament.",
              },
            ].map((b) => (
              <Card key={b.title} className="h-full rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-sm">{b.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Student Testimonials */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Student Testimonials</h2>
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
      </div>
    </section>
  </Layout>
);

export default AboutPage;

