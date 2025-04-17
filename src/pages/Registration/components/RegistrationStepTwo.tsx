
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import PersonalInfoSection from "./FormSections/PersonalInfoSection";
import MaritalInfoSection from "./FormSections/MaritalInfoSection";
import SpiritualInfoSection from "./FormSections/SpiritualInfoSection";
import EducationSection from "./FormSections/EducationSection";
import MinistrySection from "./FormSections/MinistrySection";
import EmploymentSection from "./FormSections/EmploymentSection";
import ReferenceSection from "./FormSections/ReferenceSection";
import FileUploadSection from "./FormSections/FileUploadSection";
import StatementSection from "./FormSections/StatementSection";
import { StepTwoFormData } from "../types";

// Define the form schema
const formSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phoneNumbers: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  socialMedia: z.string().optional(),
  recommendedBy: z.string().min(1, "Recommender is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  isDivorced: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  divorceCount: z.string().optional(),
  lastDivorceDate: z.string().optional(),
  childrenCount: z.string().min(1, "Number of children is required"),
  spouseName: z.string().min(1, "Spouse name is required"),
  isSpouseBeliever: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  spouseDateOfBirth: z.string().min(1, "Spouse's date of birth is required"),
  anniversaryDate: z.string().min(1, "Anniversary date is required"),
  acceptedChristDate: z.string().min(1, "Date is required"),
  waterBaptized: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  prayInTongues: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  believeInTongues: z.enum(["Yes", "No"], { required_error: "Please select an option" }).optional(),
  desireTongues: z.enum(["Yes", "No"], { required_error: "Please select an option" }).optional(),
  spiritualGiftsManifest: z.string().min(1, "This field is required"),
  formalChristianTraining: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  trainingInstitution: z.string().optional(),
  trainingDuration: z.string().optional(),
  previouslyOrdained: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  ordinationType: z.string().optional(),
  ordinationDate: z.string().optional(),
  ordinationBy: z.string().optional(),
  denominationalBackground: z.string().min(1, "This field is required"),
  currentAffiliation: z.string().min(1, "This field is required"),
  currentCapacity: z.string().min(1, "This field is required"),
  ministryDescription: z.string().min(1, "This field is required"),
  ministryDuration: z.string().min(1, "This field is required"),
  ministryIncome: z.string().min(1, "This field is required"),
  otherEmployment: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  employmentDescription: z.string().optional(),
  employmentAddress: z.string().optional(),
  pastorName: z.string().min(1, "Pastor's name is required"),
  pastorEmail: z.string().email("Invalid email").min(1, "Pastor's email is required"),
  pastorPhone: z.string().min(1, "Pastor's phone is required"),
  ministerName: z.string().min(1, "Minister's name is required"),
  ministerEmail: z.string().email("Invalid email").min(1, "Minister's email is required"),
  ministerPhone: z.string().min(1, "Minister's phone is required"),
  elderName: z.string().min(1, "Elder's name is required"),
  elderEmail: z.string().email("Invalid email").min(1, "Elder's email is required"),
  elderPhone: z.string().min(1, "Elder's phone is required"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the statement of undertaking" }),
  }),
});

interface RegistrationStepTwoProps {
  onSubmit: (data: StepTwoFormData) => void;
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const RegistrationStepTwo: React.FC<RegistrationStepTwoProps> = ({
  onSubmit,
  selectedFile,
  handleFileChange,
  removeFile,
  onBack,
  isLoading = false,
}) => {
  // Initialize form
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phoneNumbers: "",
      email: "",
      socialMedia: "",
      recommendedBy: "",
      placeOfBirth: "",
      isDivorced: "No",
      childrenCount: "",
      spouseName: "",
      isSpouseBeliever: "Yes",
      spouseDateOfBirth: "",
      anniversaryDate: "",
      acceptedChristDate: "",
      waterBaptized: "Yes",
      prayInTongues: "Yes",
      spiritualGiftsManifest: "",
      formalChristianTraining: "No",
      previouslyOrdained: "No",
      denominationalBackground: "",
      currentAffiliation: "",
      currentCapacity: "",
      ministryDescription: "",
      ministryDuration: "",
      ministryIncome: "",
      otherEmployment: "No",
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

  // Handle form submission
  const handleSubmit = (data: StepTwoFormData) => {
    console.log("Form data submitted:", data);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <PersonalInfoSection form={form} />
        <hr />
        <MaritalInfoSection form={form} />
        <hr />
        <SpiritualInfoSection form={form} />
        <hr />
        <EducationSection form={form} />
        <hr />
        <MinistrySection form={form} />
        <hr />
        <EmploymentSection form={form} />
        <hr />
        <ReferenceSection form={form} />
        <hr />
        <FileUploadSection
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          removeFile={removeFile}
        />
        <hr />
        <StatementSection form={form} />
        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationStepTwo;
