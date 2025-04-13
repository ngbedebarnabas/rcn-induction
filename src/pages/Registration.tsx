
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
import { CheckCircle, ArrowLeft, ArrowRight, FileUp, Trash2, Upload, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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

// Second step form schema (MCA form)
const stepTwoSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phoneNumbers: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  socialMedia: z.string().optional(),
  recommendedBy: z.string().min(1, "This field is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  isDivorced: z.string().min(1, "Please select an option"),
  divorceCount: z.string().optional(),
  lastDivorceDate: z.string().optional(),
  childrenCount: z.string().min(1, "Number of children is required"),
  spouseName: z.string().min(1, "Spouse's name is required"),
  isSpouseBeliever: z.string().min(1, "Please select an option"),
  spouseDateOfBirth: z.string().min(1, "Spouse's date of birth is required"),
  anniversaryDate: z.string().min(1, "Anniversary date is required"),
  acceptedChristDate: z.string().min(1, "This date is required"),
  waterBaptized: z.string().min(1, "Please select an option"),
  prayInTongues: z.string().min(1, "Please select an option"),
  believeInTongues: z.string().optional(),
  desireTongues: z.string().optional(),
  spiritualGiftsManifest: z.string().min(1, "This field is required"),
  formalChristianTraining: z.string().min(1, "Please select an option"),
  trainingInstitution: z.string().optional(),
  trainingDuration: z.string().optional(),
  previouslyOrdained: z.string().min(1, "Please select an option"),
  ordinationType: z.string().optional(),
  ordinationDate: z.string().optional(),
  ordinationBy: z.string().optional(),
  denominationalBackground: z.string().min(1, "This field is required"),
  currentAffiliation: z.string().min(1, "This field is required"),
  currentCapacity: z.string().min(1, "This field is required"),
  ministryDescription: z.string().min(1, "This field is required"),
  ministryDuration: z.string().min(1, "This field is required"),
  ministryIncome: z.string().min(1, "This field is required"),
  otherEmployment: z.string().min(1, "Please select an option"),
  employmentDescription: z.string().optional(),
  employmentAddress: z.string().optional(),
  pastorName: z.string().min(1, "Pastor's name is required"),
  pastorEmail: z.string().email("Invalid email address"),
  pastorPhone: z.string().min(1, "Pastor's phone is required"),
  ministerName: z.string().min(1, "Minister's name is required"),
  ministerEmail: z.string().email("Invalid email address"),
  ministerPhone: z.string().min(1, "Minister's phone is required"),
  elderName: z.string().min(1, "Elder's name is required"),
  elderEmail: z.string().email("Invalid email address"),
  elderPhone: z.string().min(1, "Elder's phone is required"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the Statement of Undertaking to proceed"
  }),
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [passportImage, setPassportImage] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);

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

  // Form for step 2 (MCA form)
  const stepTwoForm = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      address: "",
      phoneNumbers: "",
      email: "",
      socialMedia: "",
      recommendedBy: "",
      placeOfBirth: "",
      isDivorced: "",
      divorceCount: "",
      lastDivorceDate: "",
      childrenCount: "",
      spouseName: "",
      isSpouseBeliever: "",
      spouseDateOfBirth: "",
      anniversaryDate: "",
      acceptedChristDate: "",
      waterBaptized: "",
      prayInTongues: "",
      believeInTongues: "",
      desireTongues: "",
      spiritualGiftsManifest: "",
      formalChristianTraining: "",
      trainingInstitution: "",
      trainingDuration: "",
      previouslyOrdained: "",
      ordinationType: "",
      ordinationDate: "",
      ordinationBy: "",
      denominationalBackground: "",
      currentAffiliation: "",
      currentCapacity: "",
      ministryDescription: "",
      ministryDuration: "",
      ministryIncome: "",
      otherEmployment: "",
      employmentDescription: "",
      employmentAddress: "",
      pastorName: "",
      pastorEmail: "",
      pastorPhone: "",
      ministerName: "",
      ministerEmail: "",
      ministerPhone: "",
      elderName: "",
      elderEmail: "",
      elderPhone: "",
      acceptTerms: false,
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

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle passport image upload
  const handlePassportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPassportImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPassportPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
  };

  // Remove passport image
  const removePassport = () => {
    setPassportImage(null);
    setPassportPreview(null);
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
      uploadedFile: selectedFile ? selectedFile.name : null,
      passport: passportImage ? passportImage.name : null,
    };
    
    console.log("Complete form data:", completeFormData);
    
    toast({
      title: "Registration submitted",
      description: "You have successfully registered for the induction programme.",
    });

    setIsSubmitted(true);
  };

  // Yes/No radio option
  const renderYesNoOptions = (name: string, form: any, isRequired: boolean = true, dependantField: boolean = false) => {
    return (
      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <Input 
            type="radio" 
            id={`${name}-yes`}
            value="Yes"
            {...form.register(name, { required: isRequired && !dependantField })}
            className="h-4 w-4"
          />
          <Label htmlFor={`${name}-yes`}>Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input 
            type="radio" 
            id={`${name}-no`}
            value="No"
            {...form.register(name, { required: isRequired && !dependantField })}
            className="h-4 w-4"
          />
          <Label htmlFor={`${name}-no`}>No</Label>
        </div>
      </div>
    );
  };

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
                setSelectedFile(null);
                setPassportImage(null);
                setPassportPreview(null);
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
                : "Step 2: MINISTERIAL CREDENTIAL APPLICATION (MCA) FORM"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 
                ? "Please provide your spiritual background details." 
                : "Please provide your ministerial credential application details."}
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
                        <FormControl>
                          <Input placeholder="Enter your ministry gift" {...field} />
                        </FormControl>
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

                  {/* Passport Photo Upload */}
                  <div className="space-y-4">
                    <FormLabel htmlFor="passport-upload">Passport Photograph *</FormLabel>
                    <FormDescription>
                      Please upload a clear passport photograph with a plain background (JPEG or PNG format).
                    </FormDescription>

                    {!passportPreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                        <div className="flex flex-col items-center space-y-2">
                          <User className="h-12 w-12 text-gray-400" />
                          <div className="text-center">
                            <label htmlFor="passport-upload" className="cursor-pointer text-primary hover:underline">
                              <span>Click to upload passport</span>
                              <Input 
                                id="passport-upload" 
                                type="file" 
                                className="sr-only" 
                                accept="image/*"
                                onChange={handlePassportChange}
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-32 h-32 mx-auto">
                        <img 
                          src={passportPreview} 
                          alt="Passport Preview" 
                          className="w-full h-full object-cover rounded-md"
                        />
                        <Button 
                          type="button"
                          variant="destructive" 
                          size="icon"
                          onClick={removePassport}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...stepTwoForm}>
                <form onSubmit={stepTwoForm.handleSubmit(onSubmitStepTwo)} className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    
                    <FormField
                      control={stepTwoForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={stepTwoForm.control}
                        name="phoneNumbers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number(s) *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number(s)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepTwoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={stepTwoForm.control}
                        name="socialMedia"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Social Media Handles</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your social media handles" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepTwoForm.control}
                        name="recommendedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Who recommended you? *</FormLabel>
                            <FormControl>
                              <Input placeholder="Name of your recommender" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={stepTwoForm.control}
                      name="placeOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Place of Birth *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your place of birth" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Marital Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Marital Information</h3>
                    
                    <div className="space-y-2">
                      <FormLabel htmlFor="isDivorced">Have you been divorced? *</FormLabel>
                      {renderYesNoOptions("isDivorced", stepTwoForm)}
                      <FormMessage>{stepTwoForm.formState.errors.isDivorced?.message}</FormMessage>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={stepTwoForm.control}
                        name="divorceCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How many times? (If divorced)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepTwoForm.control}
                        name="lastDivorceDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last divorce Date (If divorced)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={stepTwoForm.control}
                      name="childrenCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of children *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter number of children" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepTwoForm.control}
                      name="spouseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Spouse *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter spouse's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel htmlFor="isSpouseBeliever">Is spouse a believer? *</FormLabel>
                      {renderYesNoOptions("isSpouseBeliever", stepTwoForm)}
                      <FormMessage>{stepTwoForm.formState.errors.isSpouseBeliever?.message}</FormMessage>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={stepTwoForm.control}
                        name="spouseDateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Spouse's Date of Birth *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepTwoForm.control}
                        name="anniversaryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Anniversary Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Spiritual Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Spiritual Information</h3>
                    
                    <FormField
                      control={stepTwoForm.control}
                      name="acceptedChristDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When did you accept Christ? *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel htmlFor="waterBaptized">Have you been baptized in water? *</FormLabel>
                      {renderYesNoOptions("waterBaptized", stepTwoForm)}
                      <FormMessage>{stepTwoForm.formState.errors.waterBaptized?.message}</FormMessage>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="prayInTongues">Do you pray in tongues? *</FormLabel>
                      {renderYesNoOptions("prayInTongues", stepTwoForm)}
                      <FormMessage>{stepTwoForm.formState.errors.prayInTongues?.message}</FormMessage>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="believeInTongues">If No, do you believe in it?</FormLabel>
                      {renderYesNoOptions("believeInTongues", stepTwoForm, false, true)}
                      <FormMessage>{stepTwoForm.formState.errors.believeInTongues?.message}</FormMessage>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor="desireTongues">If No - Do you desire it?</FormLabel>
                      {renderYesNoOptions("desireTongues", stepTwoForm, false, true)}
                      <FormMessage>{stepTwoForm.formState.errors.desireTongues?.message}</FormMessage>
                    </div>

                    <FormField
                      control={stepTwoForm.control}
                      name="spiritualGiftsManifest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Have you identified any manifest spiritual gift in your life? (Describe) *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your spiritual gifts" 
                              className="resize-none" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Education & Training Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Christian Education & Training</h3>
                    
                    <div className="space-y-2">
                      <FormLabel htmlFor="formalChristianTraining">Do you have any formal Christian training or education? *</FormLabel>
                      {renderYesNoOptions("formalChristianTraining", stepTwoForm)}
                      <FormMessage>{stepTwoForm.formState.errors.formalChristianTraining?.message}</FormMessage>
                    </div>

                    <FormField
                      control={stepTwoForm.control}
                      name="trainingInstitution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>If so, which Seminary, Bible School, or Extension courses?</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter institution name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepTwoForm.control}
                      name="trainingDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total duration completed</FormLabel>
                          <FormControl>
                            <Input placeholder="How many days, weeks, months, years?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Ministry Experience Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Ministry Experience</h3>
                    
                    <div className="space-y-2">
                      <FormLabel htmlFor="previouslyOrdained">Have you ever been Commissioned, Licensed or Ordained as a minister? *</FormLabel>
                      {renderYesNoOptions("previouslyOrdained", stepTwoForm)}
                      <FormMessage>{stepTwoForm.formState.errors.previouslyOrdained?.message}</FormMessage>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={stepTwoForm.control}
                        name="ordinationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>If so, which of the above?</FormLabel>
                            <FormControl>
                              <Input placeholder="Type of ordination" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepTwoForm.control}
                        name="ordinationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>When?</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepTwoForm.control}
                        name="ordinationBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>By Whom?</FormLabel>
                            <FormControl>
                              <Input placeholder="Name of ordaining body" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={stepTwoForm.control}
                      name="denominationalBackground"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What is your denominational background? *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your denominational background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepTwoForm.control}
                      name="currentAffiliation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>With what Church/Ministry are you presently affiliated? *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your current affiliation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepTwoForm.control}
                      name="currentCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>In what capacity? *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your role" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepTwoForm.control}
                      name="ministryDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What is your ministry? (Describe) *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your ministry" 
                              className="resize-none" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={stepTwoForm.control}
                        name="ministryDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How long have you been in this ministry? *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter duration" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={stepTwoForm.control}
                        name="ministryIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What percentage of your income is derived from your ministry? *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter percentage" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Employment Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Employment Information</h3>
                    
                    <div className="space-y-2">
                      <FormLabel htmlFor="otherEmployment">Other than the ministry, do you have other employment? *</FormLabel>
                      {renderYesNoOptions("otherEmployment", stepTwoForm)}
                      <FormMessage>{stepTwoForm.formState.errors.otherEmployment?.message}</FormMessage>
                    </div>

                    <FormField
                      control={stepTwoForm.control}
                      name="employmentDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>If yes, describe</FormLabel>
                          <FormControl>
                            <Input placeholder="Describe your employment" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={stepTwoForm.control}
                      name="employmentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address of employment</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter employment address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* References Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">References</h3>
                    
                    {/* Pastor's Reference */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Pastor's Reference *</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={stepTwoForm.control}
                          name="pastorName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Pastor's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={stepTwoForm.control}
                          name="pastorEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Pastor's email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={stepTwoForm.control}
                          name="pastorPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Pastor's phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Local Minister's Reference */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Local Minister's Reference *</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={stepTwoForm.control}
                          name="ministerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Minister's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={stepTwoForm.control}
                          name="ministerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Minister's email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={stepTwoForm.control}
                          name="ministerPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Minister's phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Elder's Reference */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Elder's Reference *</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={stepTwoForm.control}
                          name="elderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Elder's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={stepTwoForm.control}
                          name="elderEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Elder's email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={stepTwoForm.control}
                          name="elderPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Elder's phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Upload Response to Questions</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file-upload">Upload File</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="space-y-1 text-center">
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <Input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC up to 10MB
                          </p>
                        </div>
                      </div>

                      {selectedFile && (
                        <div className="mt-2 flex items-center space-x-2 py-2 px-4 bg-gray-100 rounded-md">
                          <FileUp size={16} />
                          <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={removeFile}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Statement of Undertaking */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">STATEMENT OF UNDERTAKING</h3>
                    
                    <div className="bg-gray-50 p-4 border rounded-md">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        I certify that the information I provided on this application is complete and accurate to the best of my knowledge, and that RCN is authorized to make whatever inquiries are necessary to certify the accuracy of my records.

                        I will support the work of RCN with prayers and submit an annual report in the month of March each year. The annual reporting process is a significant ingredient of accountability, which is part of the integrity of this Ministry. 
                        I will maintain a functioning email and agree to receive regular emails from RCN, will visit the website and social media regularly for updates, and I shall abide by the policies and procedures of this Ministry and conduct myself according to the Code of Ethical Standards established by this Ministry.
                        I shall devote myself to spreading the Gospel of Jesus Christ and the general principles of the Church.
                        I believe in the statement of faith of RCN and agree to uphold the high standards and reputation of the Ministry. 
                        I do further undertake that Remnant Christian Network Ministry reserves the right to deny, revoke, repossess, or withhold the ministerial credentials for reasons stated in the Ordination Guidelines or for whatever the Presbytery considers a valid reason.
                      </p>
                    </div>
                    
                    <FormField
                      control={stepTwoForm.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="acceptTerms"
                              className={stepTwoForm.formState.errors.acceptTerms ? "border-red-500" : ""}  
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="acceptTerms" className={stepTwoForm.formState.errors.acceptTerms ? "text-red-500" : ""}>
                              I agree to the Statement of Undertaking *
                            </FormLabel>
                            <FormDescription>
                              By checking this box, I confirm that I have read, understood, and agree to the Statement of Undertaking.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

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
