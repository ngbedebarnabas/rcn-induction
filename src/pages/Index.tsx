
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { BookOpen, Calendar, Users, CheckCircle } from "lucide-react";

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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            RCN Induction Training Programme
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Welcome to our comprehensive induction training programme designed to equip new members with essential skills and knowledge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <NavLink to="/registration">
                Register Now
              </NavLink>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <NavLink to="/about">
                Learn More
              </NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
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
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join our induction programme today and take the first step towards excellence in your role.
          </p>
          <Button size="lg" variant="default" asChild>
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
