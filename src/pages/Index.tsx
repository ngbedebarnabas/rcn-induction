
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { BookOpen, Calendar, Users, CheckCircle, Image, Book, UserCheck } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Comprehensive Curriculum",
      description: "Structured learning modules covering all essential aspects of the role."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Flexible Schedule",
      description: "Complete the training at your own pace with our accessible online platform."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Expert Mentorship",
      description: "Learn directly from experienced professionals in the field."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Certified Completion",
      description: "Receive official certification upon successful completion of the programme."
    }
  ];

  const galleryImages = [
    {
      src: "/lovable-uploads/58f1478c-d1dd-44f8-ba7c-7c2ac9498182.png",
      alt: "Training session",
      title: "Leadership Training",
      description: "Preparing leaders for excellence in ministry"
    },
    {
      src: "/lovable-uploads/7732724a-e581-4eac-a967-a55ff307a994.png", 
      alt: "RCN Logo",
      title: "RCN Ministry",
      description: "Building a community of faith"
    },
    {
      src: "/lovable-uploads/58f1478c-d1dd-44f8-ba7c-7c2ac9498182.png", 
      alt: "Prayer session",
      title: "Spiritual Growth",
      description: "Nurturing spiritual development"
    }
  ];

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center py-24 md:py-32" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/58f1478c-d1dd-44f8-ba7c-7c2ac9498182.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            RCN Induction Training Programme
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Empowering the next generation of Christian Leaders for Kingdom Service
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <NavLink to="/registration">
                Register Now
              </NavLink>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-transparent border-white text-white hover:bg-white/10">
              <NavLink to="/about">
                Learn More
              </NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Training Gallery
          </h2>
          <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto">
            Explore moments from our previous training sessions and community building activities.
          </p>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card>
                      <CardContent className="p-0 relative aspect-[16/9] overflow-hidden rounded-lg">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                          <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                          <p>{image.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Programme Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
            Join our induction programme today and take the first step towards excellence in your role.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100" asChild>
            <NavLink to="/registration">
              Register for the Programme
            </NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
