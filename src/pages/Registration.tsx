
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

// First step form schema
const stepOneSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  dateOfNewBirth: z.string().min(1, "Date of new birth is required"),
  dateOfWaterBaptism: z.string().min(1, "Date of water baptism is required"),
  dateOfHolyGhostBaptism: z.string().min(1, "Date of Holy Ghost baptism is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  ministryGift: z.string().min(1, "Ministry gift is required"),
  spiritualGifts: z.string().min(1, "Spiritual gifts are required"),
});

// Second step form schema (original form fields)
const stepTwoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  additionalInfo: z.string().optional(),
});

// Combined schema for both steps
const formSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
});

type FormValues = z.infer<typeof formSchema>;

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [spiritualHistory, setSpiritualHistory] = useState<Array<{id: number; text: string}>>([
    { id: 1, text: "" }
  ]);

  // Form for step 1
  const stepOneForm = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      dateOfNewBirth: "",
      dateOfWaterBaptism: "",
      dateOfHolyGhostBaptism: "",
      maritalStatus: "",
      ministryGift: "",
      spiritualGifts: "",
    },
  });

  // Form for step 2 (original registration form)
  const stepTwoForm = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      startDate: "",
      additionalInfo: "",
    },
  });

  // Add another spiritual history entry
  const addSpiritualHistory = () => {
    setSpiritualHistory([
      ...spiritualHistory,
      { id: spiritualHistory.length + 1, text: "" }
    ]);
  };

  // Update a spiritual history entry
  const updateSpiritualHistory = (id: number, value: string) => {
    setSpiritualHistory(spiritualHistory.map(item => 
      item.id === id ? { ...item, text: value } : item
    ));
  };

  // Remove a spiritual history entry
  const removeSpiritualHistory = (id: number) => {
    if (spiritualHistory.length > 1) {
      setSpiritualHistory(spiritualHistory.filter(item => item.id !== id));
    }
  };

  // Handle form submission for step 1
  function onSubmitStepOne(data: z.infer<typeof stepOneSchema>) {
    console.log(data);
    setCurrentStep(2);
  }

  // Handle form submission for step 2
  function onSubmitStepTwo(data: z.infer<typeof stepTwoSchema>) {
    // Combine both form data
    const completeFormData = {
      ...stepOneForm.getValues(),
      ...data,
      spiritualHistory: spiritualHistory.map(item => item.text).filter(Boolean),
    };
    
    console.log("Complete form data:", completeFormData);
    
    toast({
      title: "Registration submitted",
      description: "You have successfully registered for the induction programme.",
    });

    setIsSubmitted(true);
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Registration Form</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Complete the form below to register for the RCN Induction Training Programme. All fields marked with an asterisk (*) are required.
      </p>

      {isSubmitted ? (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for registering for the RCN Induction Training Programme. We've sent a confirmation email with further details.
              </p>
              <Button onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                stepOneForm.reset();
                stepTwoForm.reset();
                setSpiritualHistory([{ id: 1, text: "" }]);
              }}>Register Another Person</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 
                ? "Step 1: Spiritual Information" 
                : "Step 2: Personal and Professional Information"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 
                ? "Please provide your spiritual background details." 
                : "Please provide your personal and contact information."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 ? (
              <Form {...stepOneForm}>
                <form onSubmit={stepOneForm.handleSubmit(onSubmitStepOne)} className="space-y-6">
                  <FormField
                    control={stepOneForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="surname, first name, other name(s)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={stepOneForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepOneForm.control}
                      name="dateOfNewBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of New Birth *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={stepOneForm.control}
                      name="dateOfWaterBaptism"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Water Baptism *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepOneForm.control}
                      name="dateOfHolyGhostBaptism"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Holy Ghost Baptism *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={stepOneForm.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your marital status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="widow">Widow</SelectItem>
                            <SelectItem value="widower">Widower</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="remarried">Remarried</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={stepOneForm.control}
                    name="ministryGift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ministry Gift *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your ministry gift" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apostle">Apostle</SelectItem>
                            <SelectItem value="prophet">Prophet</SelectItem>
                            <SelectItem value="evangelist">Evangelist</SelectItem>
                            <SelectItem value="pastor">Pastor</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={stepOneForm.control}
                    name="spiritualGifts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gift(s) of the Spirit in Manifestation *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the spiritual gifts you have" 
                            className="resize-none" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormLabel>Spiritual History with dates</FormLabel>
                    <FormDescription>
                      All the major capacities in the various churches/ministries you have ever served with dates.
                      E.g., 2005-2007: Prayer band member, Assemblies of God Church, Utako, Abuja.
                    </FormDescription>

                    {spiritualHistory.map((item) => (
                      <div key={item.id} className="flex items-start gap-2">
                        <Textarea 
                          value={item.text}
                          onChange={(e) => updateSpiritualHistory(item.id, e.target.value)}
                          placeholder="Year: Position, Church/Ministry, Location"
                          className="resize-none flex-1"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeSpiritualHistory(item.id)}
                          className={spiritualHistory.length <= 1 ? "opacity-50" : ""}
                          disabled={spiritualHistory.length <= 1}
                        >
                          -
                        </Button>
                      </div>
                    ))}
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addSpiritualHistory}
                      className="w-full"
                    >
                      + Add Another Entry
                    </Button>
                  </div>

                  <Button type="submit" className="w-full">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...stepTwoForm}>
                <form onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={stepTwoForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={stepTwoForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={stepTwoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={stepTwoForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={stepTwoForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="it">IT</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={stepTwoForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position/Role *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your position or role" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={stepTwoForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={stepTwoForm.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information or special requirements"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please include any additional information that might be relevant for your induction.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <Button type="submit" className="flex-1">
                      Submit Registration
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Registration;
