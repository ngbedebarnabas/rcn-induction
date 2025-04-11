
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About RCN Induction Programme</h1>
        
        <div className="mb-10 bg-slate-50 p-6 rounded-lg">
          <p className="text-lg leading-relaxed mb-4">
            The RCN Induction Training Programme is designed to provide new members with a comprehensive introduction to their roles and responsibilities within the organization.
          </p>
          <p className="text-lg leading-relaxed">
            Our structured curriculum ensures that all participants gain the necessary knowledge, skills, and understanding to excel in their positions and contribute effectively to the organization's goals.
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="mb-10">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <h2 className="text-2xl font-semibold">Programme Overview</h2>
            <p className="text-gray-700">
              The RCN Induction Programme spans over a period of 4 weeks, combining online learning modules, interactive workshops, and practical sessions. Participants will be guided through various aspects of their role, organizational policies, procedures, and best practices.
            </p>
            <h3 className="text-xl font-medium mt-6">Programme Objectives</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Familiarize new members with the organization's structure, culture, and values</li>
              <li>Provide essential knowledge and skills required for specific roles</li>
              <li>Establish clear expectations and performance standards</li>
              <li>Foster integration into teams and departments</li>
              <li>Encourage professional development and continuous learning</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="curriculum" className="space-y-4">
            <h2 className="text-2xl font-semibold">Curriculum Details</h2>
            <p className="text-gray-700 mb-6">
              Our curriculum is structured into four main modules, each focusing on specific aspects of professional development and organizational knowledge.
            </p>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Module 1: Organizational Introduction</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>History and mission of the organization</li>
                    <li>Organizational structure and departments</li>
                    <li>Core values and culture</li>
                    <li>Key policies and procedures</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Module 2: Role-Specific Training</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Job responsibilities and expectations</li>
                    <li>Technical skills and competencies</li>
                    <li>Tools and resources</li>
                    <li>Best practices and standards</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Module 3: Professional Development</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Communication skills</li>
                    <li>Team collaboration</li>
                    <li>Time management</li>
                    <li>Problem-solving techniques</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Module 4: Integration and Networking</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Team integration activities</li>
                    <li>Mentorship program</li>
                    <li>Cross-departmental networking</li>
                    <li>Future growth opportunities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <h2 className="text-2xl font-semibold">Programme Schedule</h2>
            <p className="text-gray-700 mb-6">
              The programme follows a structured schedule to ensure comprehensive coverage of all essential topics. Sessions are designed to accommodate different learning styles and provide practical application of concepts.
            </p>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Week 1: Orientation</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Monday & Tuesday: Organizational Introduction</li>
                    <li>Wednesday: Systems and Tools Overview</li>
                    <li>Thursday: Health & Safety Training</li>
                    <li>Friday: Team Introduction and Social Event</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Week 2: Core Training</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Monday-Wednesday: Role-Specific Technical Training</li>
                    <li>Thursday: Best Practices Workshop</li>
                    <li>Friday: Progress Assessment</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Week 3: Skills Development</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Monday: Communication Skills Workshop</li>
                    <li>Tuesday: Team Collaboration Exercises</li>
                    <li>Wednesday: Problem-Solving Techniques</li>
                    <li>Thursday & Friday: Practical Application Sessions</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium mb-2">Week 4: Integration</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Monday & Tuesday: Department Rotations</li>
                    <li>Wednesday: Mentorship Pairing</li>
                    <li>Thursday: Final Assessment</li>
                    <li>Friday: Graduation and Certification</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
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
  );
};

export default About;
