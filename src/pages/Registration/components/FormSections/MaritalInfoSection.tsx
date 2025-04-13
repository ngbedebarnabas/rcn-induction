
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../../types";
import { YesNoOptions } from "../YesNoOptions";

interface MaritalInfoSectionProps {
  form: UseFormReturn<StepTwoFormData>;
}

const MaritalInfoSection = ({ form }: MaritalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Marital Information</h3>
      
      <div className="space-y-2">
        <FormLabel htmlFor="isDivorced">Have you been divorced? *</FormLabel>
        <YesNoOptions name="isDivorced" form={form} />
        <FormMessage>{form.formState.errors.isDivorced?.message}</FormMessage>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="divorceCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many times? (If divorced)</FormLabel>
              <FormControl>
                <Input placeholder="Enter number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastDivorceDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last divorce Date (If divorced)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="childrenCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of children *</FormLabel>
            <FormControl>
              <Input placeholder="Enter number of children" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="spouseName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name of Spouse *</FormLabel>
            <FormControl>
              <Input placeholder="Enter spouse's name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel htmlFor="isSpouseBeliever">Is spouse a believer? *</FormLabel>
        <YesNoOptions name="isSpouseBeliever" form={form} />
        <FormMessage>{form.formState.errors.isSpouseBeliever?.message}</FormMessage>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="spouseDateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spouse's Date of Birth *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anniversaryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anniversary Date *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MaritalInfoSection;
