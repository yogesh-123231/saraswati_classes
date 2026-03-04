import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

type GalleryCategory = "Classroom Photos" | "Topper Achievements" | "Events";

interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  image: string;
}

const items: GalleryItem[] = [
  {
    id: "class-1",
    category: "Classroom Photos",
    title: "Interactive classroom session",
    image: "https://placehold.co/600x400/0ea5e9/ffffff?text=Classroom+1",
  },
  {
    id: "class-2",
    category: "Classroom Photos",
    title: "Doubt-solving with faculty",
    image: "https://placehold.co/600x400/0f172a/ffffff?text=Classroom+2",
  },
  {
    id: "topper-1",
    category: "Topper Achievements",
    title: "Board exam toppers",
    image: "https://placehold.co/600x400/f97316/ffffff?text=Topper+1",
  },
  {
    id: "topper-2",
    category: "Topper Achievements",
    title: "Competitive exam achievers",
    image: "https://placehold.co/600x400/0ea5e9/ffffff?text=Topper+2",
  },
  {
    id: "event-1",
    category: "Events",
    title: "Motivational seminar",
    image: "https://placehold.co/600x400/7c3aed/ffffff?text=Event+1",
  },
  {
    id: "event-2",
    category: "Events",
    title: "Parent orientation program",
    image: "https://placehold.co/600x400/15803d/ffffff?text=Event+2",
  },
];

const categories: GalleryCategory[] = [
  "Classroom Photos",
  "Topper Achievements",
  "Events",
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory | "All">("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Gallery
          </motion.h1>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            A glimpse into classrooms, achievements and events at Saraswati
            Classes.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === "All"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  activeCategory === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <Card
                key={img.id}
                className="group cursor-pointer overflow-hidden"
                onClick={() => setSelected(img)}
              >
                <CardContent className="p-0 relative">
                  <img
                    src={img.image}
                    alt={img.title}
                    className="h-32 sm:h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-medium text-white line-clamp-1">
                      {img.title}
                    </p>
                    <p className="text-[10px] text-white/70">
                      {img.category}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 24 }}
                className="relative w-full max-w-3xl bg-background rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow"
                  aria-label="Close image"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/20" />
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full max-h-[70vh] object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between text-sm text-white">
                    <div>
                      <p className="font-semibold flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        {selected.title}
                      </p>
                      <p className="text-xs text-white/80">
                        {selected.category}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
};

export default GalleryPage;

