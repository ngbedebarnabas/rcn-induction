
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../../types";
import { YesNoOptions } from "../YesNoOptions";

interface MinistrySectionProps {
  form: UseFormReturn<StepTwoFormData>;
}

const MinistrySection = ({ form }: MinistrySectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Ministry Experience</h3>
      
      <div className="space-y-2">
        <FormLabel htmlFor="previouslyOrdained">Have you ever been Commissioned, Licensed or Ordained as a minister? *</FormLabel>
        <YesNoOptions name="previouslyOrdained" form={form} />
        <FormMessage>{form.formState.errors.previouslyOrdained?.message}</FormMessage>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="ordinationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If so, which of the above?</FormLabel>
              <FormControl>
                <Input placeholder="Type of ordination" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ordinationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When?</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ordinationBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>By Whom?</FormLabel>
              <FormControl>
                <Input placeholder="Name of ordaining body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="denominationalBackground"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What is your denominational background? *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your denominational background" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currentAffiliation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>With what Church/Ministry are you presently affiliated? *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your current affiliation" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="currentCapacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>In what capacity? *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your role" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ministryDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What is your ministry? (Describe) *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your ministry" 
                className="resize-none" 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="ministryDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How long have you been in this ministry? *</FormLabel>
              <FormControl>
                <Input placeholder="Enter duration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ministryIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What percentage of your income is derived from your ministry? *</FormLabel>
              <FormControl>
                <Input placeholder="Enter percentage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MinistrySection;
