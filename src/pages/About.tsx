import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { GraduationCap, Book, Award, Zap, Users, ArrowRight } from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Intensive Ministerial Trainings",
      description: "Comprehensive training sessions led by experienced ministers to develop your spiritual leadership skills.",
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Access to Training Resources",
      description: "Extensive library of books, videos, and study materials to support your spiritual growth journey.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certificate of Ordination",
      description: "Official recognition of your ministerial qualifications upon successful completion of the programme.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Impartations",
      description: "Spiritual impartation sessions to activate and strengthen your ministerial gifts and calling.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Access and Networking",
      description: "Connect with a global network of ministers for collaboration, mentorship, and fellowship.",
    },
  ];

  return (
    <div>
      <PageHeader
        title="About RCN Ordination Induction Program"
        subtitle="Empowering ministers for Kingdom service"
      />

      <div className="container mx-auto py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-md mb-12 overflow-hidden">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                The RCN Ordination Induction Program is a dedicated ministry
                designed to equip and empower ministers in Christian service. Our
                programme offers comprehensive training, rooted in biblical truth,
                to prepare you for impactful leadership and faithful stewardship.
                Through practical teaching, mentorship, and spiritual formation,
                we aim to support your calling, fostering growth in faith, wisdom,
                and ministry skills. Join us as we journey together to advance
                God's Kingdom with passion and purpose.
              </p>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <section className="mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Benefits</p>
            <h2 className="text-2xl font-bold mb-8 text-foreground tracking-tight">
              What You Will Gain
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-md hover:shadow-lg transition-shadow group"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Card className="border-0 shadow-md text-center overflow-hidden" style={{
            background: `linear-gradient(135deg, hsl(220 60% 22%), hsl(220 60% 30%))`,
          }}>
            <CardContent className="p-10">
              <h2 className="text-2xl font-bold mb-3 text-white tracking-tight">Ready to Join?</h2>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                If you're interested in participating in our comprehensive
                induction programme, we encourage you to register today.
              </p>
              <Button asChild variant="outline" className="bg-white text-primary hover:bg-white/90 rounded-xl px-6 font-semibold">
                <Link to="/registration">
                  Register for the Programme <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
