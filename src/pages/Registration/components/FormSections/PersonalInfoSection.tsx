
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../../types";

interface PersonalInfoSectionProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PersonalInfoSection = ({ form }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Information</h3>
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="phoneNumbers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number(s) *</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number(s)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="socialMedia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media Handles</FormLabel>
              <FormControl>
                <Input placeholder="Enter your social media handles" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recommendedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who recommended you? *</FormLabel>
              <FormControl>
                <Input placeholder="Name of your recommender" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="placeOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Place of Birth *</FormLabel>
            <FormControl>
              <Input placeholder="Enter your place of birth" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoSection;
