import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import { GraduationCap, Book, Award, Zap, Users } from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Intensive Ministerial Trainings",
      description:
        "Comprehensive training sessions led by experienced ministers to develop your spiritual leadership skills.",
    },
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      title: "Access to Training Resources",
      description:
        "Extensive library of books, videos, and study materials to support your spiritual growth journey.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Certificate of Ordination",
      description:
        "Official recognition of your ministerial qualifications upon successful completion of the programme.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Impartations",
      description:
        "Spiritual impartation sessions to activate and strengthen your ministerial gifts and calling.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Access and Networking",
      description:
        "Connect with a global network of ministers for collaboration, mentorship, and fellowship.",
    },
  ];

  return (
    <div>
      <PageHeader
        title="About RCN Ordination Induction Program"
        subtitle="Empowering ministers for Kingdom service"
      />

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 bg-slate-50 p-6 rounded-lg">
            <p className="text-lg leading-relaxed text-left">
              The RCN Ordination Induction Program is a dedicated ministry
              designed to equip and empower ministers in Christian service. Our
              programme offers comprehensive training, rooted in biblical truth,
              to prepare you for impactful leadership and faithful stewardship.
              Through practical teaching, mentorship, and spiritual formation,
              we aim to support your calling, fostering growth in faith, wisdom,
              and ministry skills. Join us as we journey together to advance
              God's Kingdom with passion and purpose.
            </p>
          </div>

          {/* Benefits Section */}
          <section className="py-8">
            <h2 className="text-2xl font-semibold mb-8 text-left">
              What You Will Benefit
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-1">{benefit.icon}</div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold mb-4">Ready to Join?</h2>
            <p className="text-gray-700 mb-6">
              If you're interested in participating in our comprehensive
              induction programme, we encourage you to register today.
            </p>
            <div className="flex justify-center">
              <a
                href="/registration"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Register for the Programme
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
