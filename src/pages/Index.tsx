import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Book, Award, Zap, Users } from "lucide-react";

const Index = () => {
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

  const galleryImages = [
    {
      src: "/lovable-uploads/1fb935dc-2434-46f0-9afb-3f971b98334b.png",
      alt: "Minister adjusting another minister's tie",
    },
    {
      src: "/lovable-uploads/72baae12-f642-4aba-bcaa-fa71c0c781e1.png",
      alt: "Minister speaking to a congregation",
    },
    {
      src: "/lovable-uploads/c8d726b0-122b-46e4-88aa-7196caea0008.png",
      alt: "Ministers gathered in prayer",
    },
    {
      src: "/lovable-uploads/3f847268-0593-494b-9e92-43a545c3e1d7.png",
      alt: "Minister presenting a certificate",
    },
    {
      src: "/lovable-uploads/c288ad98-cc2f-4923-bdf1-5aafa20057d9.png",
      alt: "Minister praying over congregation",
    },
    {
      src: "/lovable-uploads/00e0e4f1-712b-41bf-8a0f-5cb8d7f9e5f1.png",
      alt: "Minister teaching",
    },
    {
      src: "/lovable-uploads/0c2d3306-b807-44d0-80d8-085f42f9dc74.png",
      alt: "Group of ministers",
    },
    {
      src: "/lovable-uploads/9d5e2b83-ab8a-4bfa-b49d-b07ae659ab00.png",
      alt: "Large group of ordained ministers",
    },
  ];

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section
        className="relative bg-cover bg-center h-[60vh] flex items-center w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/58f1478c-d1dd-44f8-ba7c-7c2ac9498182.png')`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            RCN Ordination Induction Program
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Empowering the next generation of Christian Leaders for Kingdom
            Service
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Link to="/registration">Register Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Gallery
          </h2>
          <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto">
            Explore moments from our previous Ordination Services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg aspect-video"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What You Will Benefit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
            Join the RCN Ordination Induction Program today to get equipped for
            Kingdom Service.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-gray-100"
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
