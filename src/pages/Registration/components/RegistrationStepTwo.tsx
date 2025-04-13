
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { StepTwoFormData } from "../types";
import PersonalInfoSection from "./FormSections/PersonalInfoSection";
import MaritalInfoSection from "./FormSections/MaritalInfoSection";
import SpiritualInfoSection from "./FormSections/SpiritualInfoSection";
import EducationSection from "./FormSections/EducationSection";
import MinistrySection from "./FormSections/MinistrySection";
import EmploymentSection from "./FormSections/EmploymentSection";
import ReferenceSection from "./FormSections/ReferenceSection";
import FileUploadSection from "./FormSections/FileUploadSection";
import StatementSection from "./FormSections/StatementSection";

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

interface RegistrationStepTwoProps {
  onSubmit: (data: StepTwoFormData) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  removeFile: () => void;
  onBack: () => void;
}

const RegistrationStepTwo = ({
  onSubmit,
  handleFileChange,
  selectedFile,
  removeFile,
  onBack
}: RegistrationStepTwoProps) => {
  const form = useForm<StepTwoFormData>({
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <PersonalInfoSection form={form} />
        <Separator className="my-6" />
        
        {/* Marital Information Section */}
        <MaritalInfoSection form={form} />
        <Separator className="my-6" />
        
        {/* Spiritual Information Section */}
        <SpiritualInfoSection form={form} />
        <Separator className="my-6" />
        
        {/* Education & Training Section */}
        <EducationSection form={form} />
        <Separator className="my-6" />
        
        {/* Ministry Experience Section */}
        <MinistrySection form={form} />
        <Separator className="my-6" />
        
        {/* Employment Information Section */}
        <EmploymentSection form={form} />
        <Separator className="my-6" />
        
        {/* References Section */}
        <ReferenceSection form={form} />
        <Separator className="my-6" />
        
        {/* File Upload Section */}
        <FileUploadSection 
          selectedFile={selectedFile} 
          handleFileChange={handleFileChange}
          removeFile={removeFile}
        />
        <Separator className="my-6" />
        
        {/* Statement of Undertaking */}
        <StatementSection form={form} />

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
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
  );
};

export default RegistrationStepTwo;
