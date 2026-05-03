import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import SpiritualBackgroundSection from "./FormSections/SpiritualBackgroundSection";
import SpiritualInfoSection from "./FormSections/SpiritualInfoSection";
import EducationSection from "./FormSections/EducationSection";
import MinistrySection from "./FormSections/MinistrySection";
import EmploymentSection from "./FormSections/EmploymentSection";
import ReferenceSection from "./FormSections/ReferenceSection";
import { StepTwoFormData, SpiritualHistoryItem } from "../types";

const formSchema = z.object({
  dateOfNewBirth: z.string().min(1, "Date of new birth is required"),
  dateOfWaterBaptism: z.string().min(1, "Date of water baptism is required"),
  dateOfHolyGhostBaptism: z.string().min(1, "Date of Holy Ghost baptism is required"),
  ministryGift: z.string().min(1, "Ministry gift is required"),
  spiritualGifts: z.string().min(1, "Spiritual gifts are required"),

  acceptedChristDate: z.string().min(1, "Date is required"),
  waterBaptized: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
  prayInTongues: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
  believeInTongues: z.enum(["Yes", "No"]).optional(),
  desireTongues: z.enum(["Yes", "No"]).optional(),
  spiritualGiftsManifest: z.string().min(1, "This field is required"),

  formalChristianTraining: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
  trainingInstitution: z.string().optional(),
  trainingDuration: z.string().optional(),
  previouslyOrdained: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
  ordinationType: z.string().optional(),
  ordinationDate: z.string().optional(),
  ordinationBy: z.string().optional(),

  denominationalBackground: z.string().min(1, "This field is required"),
  currentAffiliation: z.string().min(1, "This field is required"),
  currentCapacity: z.string().min(1, "This field is required"),
  ministryDescription: z.string().min(1, "This field is required"),
  ministryDuration: z.string().min(1, "This field is required"),
  ministryIncome: z.string().min(1, "This field is required"),

  otherEmployment: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
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
});

interface RegistrationStepTwoProps {
  onSubmit: (data: StepTwoFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
  spiritualHistory: SpiritualHistoryItem[];
  addSpiritualHistory: () => void;
  updateSpiritualHistory: (id: number, value: string) => void;
  removeSpiritualHistory: (id: number) => void;
  initialValues?: StepTwoFormData | null;
}

const RegistrationStepTwo: React.FC<RegistrationStepTwoProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
  spiritualHistory,
  addSpiritualHistory,
  updateSpiritualHistory,
  removeSpiritualHistory,
  initialValues,
}) => {
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? {
      dateOfNewBirth: "",
      dateOfWaterBaptism: "",
      dateOfHolyGhostBaptism: "",
      ministryGift: "",
      spiritualGifts: "",
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

  const handleSubmit = (data: StepTwoFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <SpiritualBackgroundSection
          form={form}
          spiritualHistory={spiritualHistory}
          addSpiritualHistory={addSpiritualHistory}
          updateSpiritualHistory={updateSpiritualHistory}
          removeSpiritualHistory={removeSpiritualHistory}
        />
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
