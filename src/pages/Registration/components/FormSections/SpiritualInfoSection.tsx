
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../../types";
import { YesNoOptions } from "../YesNoOptions";

interface SpiritualInfoSectionProps {
  form: UseFormReturn<StepTwoFormData>;
}

const SpiritualInfoSection = ({ form }: SpiritualInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Spiritual Information</h3>
      
      <FormField
        control={form.control}
        name="acceptedChristDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>When did you accept Christ? *</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Describe when you accepted Christ" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel htmlFor="waterBaptized">Have you been baptized in water? *</FormLabel>
        <YesNoOptions name="waterBaptized" form={form} />
        <FormMessage>{form.formState.errors.waterBaptized?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="prayInTongues">Do you pray in tongues? *</FormLabel>
        <YesNoOptions name="prayInTongues" form={form} />
        <FormMessage>{form.formState.errors.prayInTongues?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="believeInTongues">If No, do you believe in it?</FormLabel>
        <YesNoOptions name="believeInTongues" form={form} isRequired={false} dependantField={true} />
        <FormMessage>{form.formState.errors.believeInTongues?.message}</FormMessage>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="desireTongues">If No - Do you desire it?</FormLabel>
        <YesNoOptions name="desireTongues" form={form} isRequired={false} dependantField={true} />
        <FormMessage>{form.formState.errors.desireTongues?.message}</FormMessage>
      </div>

      <FormField
        control={form.control}
        name="spiritualGiftsManifest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Have you identified any manifest spiritual gift in your life? (Describe) *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your spiritual gifts" 
                className="resize-none" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SpiritualInfoSection;
