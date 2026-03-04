import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Map } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2"
            >
              Contact Us
            </motion.h1>
            <p className="text-muted-foreground">
              Reach out to Saraswati Classes for admissions, counselling, and
              general queries.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
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
                <Card key={c.label}>
                  <CardContent className="p-4 flex items-center gap-4">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-72 sm:h-80 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-primary/10 to-purple-500/10" />
                    <div className="relative h-full flex flex-col items-center justify-center gap-3 bg-muted/40">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lg">
                        <Map className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-semibold text-sm">
                        Google Map Location
                      </p>
                      <p className="text-xs text-muted-foreground max-w-xs text-center">
                        Interactive Google Map will be embedded here once
                        the live location link is finalised.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
