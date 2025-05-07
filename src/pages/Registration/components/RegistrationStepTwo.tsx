
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
import { StepTwoFormData } from "../types";

// Updated form schema with optional fields
const formSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phoneNumbers: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  recommendedBy: z.string().min(1, "Recommender is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  isDivorced: z.enum(["Yes", "No"]).optional(),
  divorceCount: z.string().optional(),
  lastDivorceDate: z.string().optional(),
  childrenCount: z.string().optional(),
  spouseName: z.string().optional(),
  isSpouseBeliever: z.enum(["Yes", "No", "Not Married"]).optional(),
  spouseDateOfBirth: z.string().optional(),
  anniversaryDate: z.string().optional(),
  acceptedChristDate: z.string().min(1, "Date is required"),
  waterBaptized: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  prayInTongues: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  
  // Optional fields for tongue-related questions
  believeInTongues: z.enum(["Yes", "No"]).optional(),
  desireTongues: z.enum(["Yes", "No"]).optional(),
  spiritualGiftsManifest: z.string().min(1, "This field is required"),
  formalChristianTraining: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  
  // Optional fields for training and ordination
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
  
  // Optional employment fields
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
  
  // Social media is now optional
  socialMedia: z.string().optional(),
});

interface RegistrationStepTwoProps {
  onSubmit: (data: StepTwoFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const RegistrationStepTwo: React.FC<RegistrationStepTwoProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  // Initialize form with updated default values
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      phoneNumbers: "",
      email: "",
      socialMedia: "",
      recommendedBy: "",
      placeOfBirth: "",
      isDivorced: undefined, // Changed from "No" to undefined to make it truly optional
      childrenCount: "",
      spouseName: "", 
      isSpouseBeliever: undefined, // Changed from "Yes" to undefined to make it truly optional
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
      
      // Optional fields now have empty defaults
      trainingInstitution: "",
      trainingDuration: "",
      ordinationType: "",
      ordinationDate: "",
      ordinationBy: "",
      employmentDescription: "",
      employmentAddress: "",
      believeInTongues: undefined,
      desireTongues: undefined,
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
              "Next"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationStepTwo;
