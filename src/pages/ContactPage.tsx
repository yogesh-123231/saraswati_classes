import { Phone, Mail, MapPin, Clock, Map } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Contact Us
            </h1>
            <p className="text-muted-foreground">
              Reach out to Saraswati Classes for admissions, counselling, and
              general queries.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-8 items-start">
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 98765 43210",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@saraswaticlasses.com",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value:
                    "123, Education Lane, Pune, Maharashtra 411001",
                },
                {
                  icon: Clock,
                  label: "Working Hours",
                  value: "Mon – Sat: 8:00 AM – 8:00 PM",
                },
              ].map((c) => (
                <Card key={c.label} className="rounded-xl shadow-sm">
                  <CardContent className="p-6 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{c.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {c.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="overflow-hidden rounded-xl shadow-sm">
                <CardContent className="p-0">
                  <div className="h-72 sm:h-80 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-primary/10 to-purple-500/10" />
                    <div className="relative h-full flex flex-col items-center justify-center gap-3 bg-muted/40">
                      <div className="flex items-center justify-center gap-2">
                        <Map className="h-6 w-6 text-primary shrink-0" />
                        <span className="font-semibold text-sm">
                          Google Map Location
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground max-w-xs text-center">
                        Interactive Google Map will be embedded here once
                        the live location link is finalised.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
