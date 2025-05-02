
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../../types";

interface MinistryQuestionsSectionProps {
  form: UseFormReturn<StepThreeFormData>;
}

const MinistryQuestionsSection = ({ form }: MinistryQuestionsSectionProps) => {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium">Ministry Questions</h3>
      
      <FormField
        control={form.control}
        name="conversionExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Share your experience of conversion, baptism, and any subsequent significant spiritual experience *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your experience..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="devotionalPattern"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Share your personal pattern of devotional prayer and Bible study *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your devotional pattern..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="familyDevotional"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Your family devotional pattern related to your wife and family *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your family devotional pattern..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="godsCallExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Relate your experience in determining "God's call" to the ministry *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your experience..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ministryConcept"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What is your concept of ministry? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your concept of ministry..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="futureVision"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What is your vision for future ministry? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your vision..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ministrySuccessDefinition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              How do you define success in ministry? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Define success in ministry..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ministryStrengths"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What particular strengths have you identified so far in your ministry? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your strengths..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ministryWeaknesses"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              What particular weaknesses have you identified so far in your ministry? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your weaknesses..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="relationshipEvaluation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              How do you evaluate yourself in relationships with other people? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Evaluate your relationships..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nonOrdinationEffect"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              If this council should choose not to ordain you, how will that affect your ministry? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the potential effect..." 
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="spouseMinistryFeelings"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              How does your spouse feel about you and the ministry? *
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your spouse's feelings..." 
                className="min-h-[100px]"
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

export default MinistryQuestionsSection;
