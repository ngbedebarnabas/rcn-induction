
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/PageHeader";
import { GraduationCap, Book, Award, Zap, Users } from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Intensive Ministerial Trainings",
      description: "Comprehensive training sessions led by experienced ministers to develop your spiritual leadership skills."
    },
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      title: "Access to Training Resources",
      description: "Extensive library of books, videos, and study materials to support your spiritual growth journey."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Certificate of Ordination",
      description: "Official recognition of your ministerial qualifications upon successful completion of the programme."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Impartations",
      description: "Spiritual impartation sessions to activate and strengthen your ministerial gifts and calling."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Access and Networking",
      description: "Connect with a global network of ministers for collaboration, mentorship, and fellowship."
    }
  ];

  return (
    <div>
      <PageHeader 
        title="About RCN Induction Programme"
        subtitle="Empowering ministers for Kingdom service"
      />
      
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 bg-slate-50 p-6 rounded-lg">
            <p className="text-lg leading-relaxed">
              The RCN Induction Training Programme is a dedicated ministry designed to equip and empower ministers in Christian service. Our programme offers comprehensive training, rooted in biblical truth, to prepare you for impactful leadership and faithful stewardship. Through practical teaching, mentorship, and spiritual formation, we aim to support your calling, fostering growth in faith, wisdom, and ministry skills. Join us as we journey together to advance God's Kingdom with passion and purpose.
            </p>
          </div>
          
          <Tabs defaultValue="schedule" className="mb-10">
            <TabsList className="grid grid-cols-1 mb-8">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule" className="space-y-4">
              <h2 className="text-2xl font-semibold">Programme Schedule</h2>
              <p className="text-gray-700 mb-6">
                The programme follows a structured schedule over six days to ensure comprehensive coverage of all essential topics. Sessions are designed to accommodate different learning styles and provide practical application of concepts.
              </p>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Day 1: Orientation</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Organizational Introduction</li>
                      <li>Systems and Tools Overview</li>
                      <li>Health & Safety Training</li>
                      <li>Team Introduction and Social Event</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Day 2: Core Training</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Role-Specific Technical Training</li>
                      <li>Best Practices Workshop</li>
                      <li>Progress Assessment</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Day 3: Skills Development</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Communication Skills Workshop</li>
                      <li>Team Collaboration Exercises</li>
                      <li>Problem-Solving Techniques</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Day 4: Ministry Application</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Practical Ministry Sessions</li>
                      <li>Field Experience</li>
                      <li>Mentorship Connections</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Day 5: Integration</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Department Rotations</li>
                      <li>Leadership Training</li>
                      <li>Ministry Strategy Development</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Day 6: Graduation</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Final Assessment</li>
                      <li>Certification Ceremony</li>
                      <li>Graduation Celebration</li>
                      <li>Ministry Commissioning</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Benefits Section */}
          <section className="py-8">
            <h2 className="text-2xl font-semibold text-center mb-8">What You Will Benefit</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-1">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
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
              If you're interested in participating in our comprehensive induction programme, we encourage you to register today.
            </p>
            <div className="flex justify-center">
              <a href="/registration" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
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
