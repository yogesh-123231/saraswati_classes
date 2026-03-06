import Layout from "@/components/Layout";

const Blog = () => {
  return (
    <Layout>
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Blog
        </h1>

        <p className="text-muted-foreground mb-10">
          Articles, exam tips and preparation strategies for students.
        </p>

        {/* Placeholder blog cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-xl border p-6 hover:shadow-md transition">
            <h3 className="font-semibold mb-2">
              How to Prepare for CET in 60 Days
            </h3>
            <p className="text-sm text-muted-foreground">
              A practical strategy for students preparing for CET exams.
            </p>
          </div>

          <div className="rounded-xl border p-6 hover:shadow-md transition">
            <h3 className="font-semibold mb-2">
              Best Study Techniques for Board Exams
            </h3>
            <p className="text-sm text-muted-foreground">
              Learn how to study effectively and score higher.
            </p>
          </div>

          <div className="rounded-xl border p-6 hover:shadow-md transition">
            <h3 className="font-semibold mb-2">
              Common Mistakes Students Make
            </h3>
            <p className="text-sm text-muted-foreground">
              Avoid these mistakes while preparing for competitive exams.
            </p>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Blog;