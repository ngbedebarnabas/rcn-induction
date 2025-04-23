
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../types";

interface YesNoOptionsProps {
  name: keyof StepTwoFormData;
  form: UseFormReturn<StepTwoFormData>;
  isRequired?: boolean;
  dependantField?: boolean;
}

export const YesNoOptions = ({ name, form, isRequired = true, dependantField = false }: YesNoOptionsProps) => {
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
