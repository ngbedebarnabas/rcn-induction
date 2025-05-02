
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import StatementSection from "./FormSections/StatementSection";
import { StepThreeFormData } from "../types";
import MinistryQuestionsSection from "./FormSections/MinistryQuestionsSection";

// Form schema for step three
const formSchema = z.object({
  conversionExperience: z.string().min(1, "This field is required"),
  devotionalPattern: z.string().min(1, "This field is required"),
  familyDevotional: z.string().min(1, "This field is required"),
  godsCallExperience: z.string().min(1, "This field is required"),
  ministryConcept: z.string().min(1, "This field is required"),
  futureVision: z.string().min(1, "This field is required"),
  ministrySuccessDefinition: z.string().min(1, "This field is required"),
  ministryStrengths: z.string().min(1, "This field is required"),
  ministryWeaknesses: z.string().min(1, "This field is required"),
  relationshipEvaluation: z.string().min(1, "This field is required"),
  nonOrdinationEffect: z.string().min(1, "This field is required"),
  spouseMinistryFeelings: z.string().min(1, "This field is required"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the statement of undertaking" }),
  }),
});

interface RegistrationStepThreeProps {
  onSubmit: (data: StepThreeFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const RegistrationStepThree: React.FC<RegistrationStepThreeProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  // Initialize form
  const form = useForm<StepThreeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conversionExperience: "",
      devotionalPattern: "",
      familyDevotional: "",
      godsCallExperience: "",
      ministryConcept: "",
      futureVision: "",
      ministrySuccessDefinition: "",
      ministryStrengths: "",
      ministryWeaknesses: "",
      relationshipEvaluation: "",
      nonOrdinationEffect: "",
      spouseMinistryFeelings: "",
      acceptTerms: false,
    },
  });

  // Handle form submission
  const handleSubmit = (data: StepThreeFormData) => {
    console.log("Step three data submitted:", data);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <MinistryQuestionsSection form={form} />
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

export default RegistrationStepThree;
