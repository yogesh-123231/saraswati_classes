import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/types/banner";
import { fetchBanners } from "@/services/bannerService";

const ROTATION_INTERVAL_MS = 5000;

const HomeBannerCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const data = fetchBanners();
    setBanners(data);
  }, []);

  useEffect(() => {
    if (!banners.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) return null;

  const active = banners[index];

  return (
    <section className="py-8 bg-secondary/40">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardContent className="p-0 flex flex-col md:flex-row items-stretch">
            <Link
              to={`/test-series/${active.linkedTestSeriesId}`}
              className="flex-1 group"
            >
              <img
                src={active.image}
                alt="Test series banner"
                className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="p-4 md:p-6 flex flex-col justify-between gap-4 md:max-w-xs bg-background">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Featured Test Series
                </p>
                <p className="text-sm text-muted-foreground">
                  Tap the banner to view full details of the linked test series and
                  enrol via our secure Google Form.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-1">
                  {banners.map((b, i) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index
                          ? "w-6 bg-primary"
                          : "w-2 bg-muted-foreground/40"
                      }`}
                      aria-label={`Go to banner ${i + 1}`}
                    />
                  ))}
                </div>
                <Link to={`/test-series/${active.linkedTestSeriesId}`}>
                  <Button size="sm" variant="outline" className="text-xs">
                    View Test Series
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HomeBannerCarousel;

