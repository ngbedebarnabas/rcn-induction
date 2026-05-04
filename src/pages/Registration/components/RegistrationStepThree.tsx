import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StepThreeFormData } from "../types";

const refereeBlock = {
  name: z.string().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().min(1, "Phone is required"),
};

const formSchema = z.object({
  pastorName: refereeBlock.name,
  pastorEmail: refereeBlock.email,
  pastorPhone: refereeBlock.phone,
  ministerName: refereeBlock.name,
  ministerEmail: refereeBlock.email,
  ministerPhone: refereeBlock.phone,
  elderName: refereeBlock.name,
  elderEmail: refereeBlock.email,
  elderPhone: refereeBlock.phone,
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the statement of undertaking" }),
  }),
});

interface RegistrationStepThreeProps {
  onSubmit: (data: StepThreeFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const RefereeGroup = ({
  title,
  form,
  nameKey,
  emailKey,
  phoneKey,
}: {
  title: string;
  form: ReturnType<typeof useForm<StepThreeFormData>>;
  nameKey: keyof StepThreeFormData;
  emailKey: keyof StepThreeFormData;
  phoneKey: keyof StepThreeFormData;
}) => (
  <div className="space-y-3">
    <h4 className="font-medium">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name={nameKey as never}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={emailKey as never}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={phoneKey as never}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);

const UNDERTAKING = `I certify that the information I provided on this application is complete and accurate to the best of my knowledge, and that RCN is authorised to make whatever inquiries are necessary to certify the accuracy of my records.

I will support the work of RCN with prayers and submit an annual report in the month of March each year. The annual reporting process is a significant ingredient of accountability, which is part of the integrity of this Ministry.

I will maintain a functioning email and agree to receive regular emails from RCN, will visit the website and social media regularly for updates, and I shall abide by the policies and procedures of this Ministry and conduct myself according to the Code of Ethical Standards established by this Ministry.

I shall devote myself to spreading the Gospel of Jesus Christ and the general principles of the Church.

I believe in the statement of faith of RCN and agree to uphold the high standards and reputation of the Ministry.

I do further undertake that Remnant Christian Network Ministry reserves the right to deny, revoke, repossess or withhold the ministerial credentials for reasons stated in the Ordination Guidelines or for whatever the Presbytery considers a valid reason.`;

const RegistrationStepThree: React.FC<RegistrationStepThreeProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
}) => {
  const form = useForm<StepThreeFormData>({
    resolver: zodResolver(formSchema) as never,
    defaultValues: {
      pastorName: "",
      pastorEmail: "",
      pastorPhone: "",
      ministerName: "",
      ministerEmail: "",
      ministerPhone: "",
      elderName: "",
      elderEmail: "",
      elderPhone: "",
      acceptTerms: false as unknown as true,
    },
  });

  const handleSubmit = (data: StepThreeFormData) => onSubmit(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <section className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold">Referees</h3>
            <FormDescription className="mt-1">
              A minimum of three good references is required: the local
              minister you directly submit to, another pastor who knows you,
              and an elder. Please do not list your spouse, parents, or
              siblings.
            </FormDescription>
          </div>

          <RefereeGroup
            title="Pastor"
            form={form}
            nameKey="pastorName"
            emailKey="pastorEmail"
            phoneKey="pastorPhone"
          />
          <RefereeGroup
            title="Local Minister"
            form={form}
            nameKey="ministerName"
            emailKey="ministerEmail"
            phoneKey="ministerPhone"
          />
          <RefereeGroup
            title="Elder"
            form={form}
            nameKey="elderName"
            emailKey="elderEmail"
            phoneKey="elderPhone"
          />
        </section>

        <hr />

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Statement of Undertaking</h3>
          <div className="rounded-lg border bg-muted/40 p-4 max-h-72 overflow-y-auto">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {UNDERTAKING}
            </p>
          </div>

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                    id="acceptTerms"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="acceptTerms">
                    I agree to the Statement of Undertaking *
                  </FormLabel>
                  <FormDescription>
                    By checking this box, I confirm that I have read,
                    understood, and agree to the Statement of Undertaking.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </section>

        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationStepThree;
