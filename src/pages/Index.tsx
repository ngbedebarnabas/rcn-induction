import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Book, Award, Zap, Users, ArrowRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.png";

const Index = () => {
  const benefits = [
    {
      icon: <GraduationCap className="h-7 w-7" />,
      title: "Intensive Ministerial Trainings",
      description: "Comprehensive training sessions led by experienced ministers to develop your spiritual leadership skills.",
    },
    {
      icon: <Book className="h-7 w-7" />,
      title: "Access to Training Resources",
      description: "Extensive library of books, videos, and study materials to support your spiritual growth journey.",
    },
    {
      icon: <Award className="h-7 w-7" />,
      title: "Certificate of Ordination",
      description: "Official recognition of your ministerial qualifications upon successful completion of the programme.",
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Impartations",
      description: "Spiritual impartation sessions to activate and strengthen your ministerial gifts and calling.",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Access and Networking",
      description: "Connect with a global network of ministers for collaboration, mentorship, and fellowship.",
    },
  ];

  const galleryImages = [
    { src: gallery1, alt: "Ordained ministers worshipping during ordination service" },
    { src: gallery2, alt: "Minister presenting Certificate of Ordination" },
    { src: gallery3, alt: "Minister laying hands in impartation prayer" },
    { src: gallery4, alt: "Minister receiving ministerial collar" },
    { src: gallery5, alt: "Group photo of ordained ministers at IEC 2024" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(220 60% 15% / 0.9), hsl(220 60% 25% / 0.8)), url('/lovable-uploads/58f1478c-d1dd-44f8-ba7c-7c2ac9498182.png')`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
            Now Accepting Registrations
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight max-w-4xl mx-auto leading-tight">
            RCN Ordination Induction Program
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering the next generation of Christian Leaders for Kingdom Service
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/25 text-base">
              <Link to="/registration">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-xl px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-base"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Gallery</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Explore moments from our previous Ordination Services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl aspect-[4/3] group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Benefits</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              What You Will Gain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group bg-card"
              >
                <CardContent className="pt-7 pb-6 px-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(220 60% 22%), hsl(220 60% 30%))`,
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white tracking-tight">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-9 leading-relaxed">
            Join the RCN Ordination Induction Program today to get equipped for Kingdom Service.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90 rounded-xl px-8 shadow-lg text-base font-semibold"
            asChild
          >
            <Link to="/registration">Register for the Programme</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
