
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../../types";
import { YesNoOptions } from "../YesNoOptions";

interface EmploymentSectionProps {
  form: UseFormReturn<StepTwoFormData>;
}

const EmploymentSection = ({ form }: EmploymentSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Employment Information</h3>
      
      <div className="space-y-2">
        <FormLabel htmlFor="otherEmployment">Other than the ministry, do you have other employment? *</FormLabel>
        <YesNoOptions name="otherEmployment" form={form} />
        <FormMessage>{form.formState.errors.otherEmployment?.message}</FormMessage>
      </div>

      <FormField
        control={form.control}
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
        control={form.control}
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
  );
};

export default EmploymentSection;
