import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 space-y-12">

          {/* Page Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Contact Saraswati Classes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              For admissions, counselling or course inquiries, feel free to
              contact us or submit the inquiry form below.
            </p>
          </div>

          {/* Contact + Form Section */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Contact Info */}
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
                    "123 Education Lane, Pune, Maharashtra 411001",
                },
                {
                  icon: Clock,
                  label: "Working Hours",
                  value: "Mon – Sat: 8:00 AM – 8:00 PM",
                },
              ].map((item) => (
                <Card key={item.label} className="rounded-xl shadow-sm">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Inquiry Form */}
            <Card className="rounded-xl shadow-sm">
              <CardContent className="p-6 space-y-4">

                <h2 className="text-lg font-semibold">
                  Inquiry / Appointment Form
                </h2>

                <form className="space-y-4">

                  <div>
                    <label className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Class
                    </label>
                    <select className="w-full mt-1 border rounded-md px-3 py-2 text-sm">
                      <option>Select Class</option>
                      <option>8th</option>
                      <option>9th</option>
                      <option>10th</option>
                      <option>11th</option>
                      <option>12th</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your inquiry"
                      className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <Button className="w-full">
                    Submit Inquiry
                  </Button>

                </form>
              </CardContent>
            </Card>

          </div>

          {/* Google Map */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Visit Our Coaching Centre
            </h2>

            <div className="rounded-xl overflow-hidden border">
              <iframe
                title="Saraswati Classes Location"
                src="https://www.google.com/maps?q=Pune&output=embed"
                className="w-full h-[350px] border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;