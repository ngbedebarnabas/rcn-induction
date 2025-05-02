
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../../types";

interface StatementSectionProps {
  form: UseFormReturn<StepThreeFormData>;
}

const StatementSection = ({ form }: StatementSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">STATEMENT OF UNDERTAKING</h3>
      
      <div className="bg-gray-50 p-4 border rounded-md">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          I certify that the information I provided on this application is complete and accurate to the best of my knowledge, and that RCN is authorized to make whatever inquiries are necessary to certify the accuracy of my records.

          I will support the work of RCN with prayers and submit an annual report in the month of March each year. The annual reporting process is a significant ingredient of accountability, which is part of the integrity of this Ministry. 
          I will maintain a functioning email and agree to receive regular emails from RCN, will visit the website and social media regularly for updates, and I shall abide by the policies and procedures of this Ministry and conduct myself according to the Code of Ethical Standards established by this Ministry.
          I shall devote myself to spreading the Gospel of Jesus Christ and the general principles of the Church.
          I believe in the statement of faith of RCN and agree to uphold the high standards and reputation of the Ministry. 
          I do further undertake that Remnant Christian Network Ministry reserves the right to deny, revoke, repossess, or withhold the ministerial credentials for reasons stated in the Ordination Guidelines or for whatever the Presbytery considers a valid reason.
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange} 
                id="acceptTerms"
                className={form.formState.errors.acceptTerms ? "border-red-500" : ""}  
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel htmlFor="acceptTerms" className={form.formState.errors.acceptTerms ? "text-red-500" : ""}>
                I agree to the Statement of Undertaking *
              </FormLabel>
              <FormDescription>
                By checking this box, I confirm that I have read, understood, and agree to the Statement of Undertaking.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default StatementSection;
