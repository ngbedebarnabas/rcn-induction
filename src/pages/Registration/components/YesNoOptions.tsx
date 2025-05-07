
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../types";

interface YesNoOptionsProps {
  name: keyof StepTwoFormData;
  form: UseFormReturn<StepTwoFormData>;
  isRequired?: boolean;
  dependantField?: boolean;
  showNotMarriedOption?: boolean;
}

export const YesNoOptions = ({ 
  name, 
  form, 
  isRequired = true, 
  dependantField = false,
  showNotMarriedOption = false
}: YesNoOptionsProps) => {
  if (showNotMarriedOption) {
    return (
      <RadioGroup 
        defaultValue={form.getValues(name) as string}
        onValueChange={(value) => form.setValue(name, value)}
        className="flex gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Yes" id={`${name}-yes`} />
          <Label htmlFor={`${name}-yes`}>Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="No" id={`${name}-no`} />
          <Label htmlFor={`${name}-no`}>No</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Not Married" id={`${name}-not-married`} />
          <Label htmlFor={`${name}-not-married`}>Not Married</Label>
        </div>
      </RadioGroup>
    );
  }

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
