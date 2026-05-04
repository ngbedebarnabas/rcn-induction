import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface YesNoOptionsProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  showNotMarriedOption?: boolean;
}

export function YesNoOptions<T extends FieldValues>({
  name,
  form,
  showNotMarriedOption = false,
}: YesNoOptionsProps<T>) {
  const value = form.watch(name) as unknown as string | undefined;

  return (
    <RadioGroup
      value={value ?? ""}
      onValueChange={(v) =>
        form.setValue(name, v as never, { shouldValidate: true, shouldDirty: true })
      }
      className="flex flex-wrap gap-6"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Yes" id={`${String(name)}-yes`} />
        <Label htmlFor={`${String(name)}-yes`}>Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="No" id={`${String(name)}-no`} />
        <Label htmlFor={`${String(name)}-no`}>No</Label>
      </div>
      {showNotMarriedOption && (
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Not Married" id={`${String(name)}-not-married`} />
          <Label htmlFor={`${String(name)}-not-married`}>Not Married</Label>
        </div>
      )}
    </RadioGroup>
  );
}
