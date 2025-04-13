
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../../types";
import { YesNoOptions } from "../YesNoOptions";

interface EducationSectionProps {
  form: UseFormReturn<StepTwoFormData>;
}

const EducationSection = ({ form }: EducationSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Christian Education & Training</h3>
      
      <div className="space-y-2">
        <FormLabel htmlFor="formalChristianTraining">Do you have any formal Christian training or education? *</FormLabel>
        <YesNoOptions name="formalChristianTraining" form={form} />
        <FormMessage>{form.formState.errors.formalChristianTraining?.message}</FormMessage>
      </div>

      <FormField
        control={form.control}
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
        control={form.control}
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
  );
};

export default EducationSection;
