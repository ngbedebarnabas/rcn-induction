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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileUp, Trash2, Loader2 } from "lucide-react";
import { YesNoOptions } from "./YesNoOptions";
import { PartialDateInput } from "./PartialDateInput";

const hasYear = (v?: string) => !!v && /^\d{4}(-|$)/.test(v);
import {
  StepTwoFormData,
  SpiritualHistoryItem,
  SPIRITUAL_GIFT_OPTIONS,
} from "../types";

const formSchema = z
  .object({
    acceptedChristDate: z.string().refine(hasYear, "Year of new birth is required"),
    waterBaptized: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    dateOfWaterBaptism: z.string().optional(),
    dateOfHolyGhostBaptism: z.string().optional(),
    prayInTongues: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    believeInTongues: z.enum(["Yes", "No"]).optional(),
    desireTongues: z.enum(["Yes", "No"]).optional(),
    spiritualGiftsList: z.array(z.string()).default([]),
    spiritualGiftsOther: z.string().optional(),
    formalChristianTraining: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    trainingInstitution: z.string().optional(),
    highestProgramme: z.string().optional(),
    trainingDuration: z.string().optional(),
    previouslyOrdained: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    ordinationType: z.enum(["Licensed", "Ordained", ""]).optional(),
    ordinationDate: z.string().optional(),
    ordinationBy: z.string().optional(),
    ordinationDenomination: z.string().optional(),
    currentAffiliation: z.string().min(1, "This field is required"),
    currentCapacity: z.string().min(1, "This field is required"),
    ministryDuration: z.string().min(1, "This field is required"),
    ministryIncome: z.string().min(1, "This field is required"),
    otherEmployment: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    employmentDescription: z.string().optional(),
  })
  .refine(
    (d) => d.waterBaptized !== "Yes" || hasYear(d.dateOfWaterBaptism),
    { message: "Year of water baptism is required", path: ["dateOfWaterBaptism"] }
  );

interface RegistrationStepTwoProps {
  onSubmit: (data: StepTwoFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
  spiritualHistory: SpiritualHistoryItem[];
  addSpiritualHistory: () => void;
  updateSpiritualHistory: (id: number, value: string) => void;
  removeSpiritualHistory: (id: number) => void;
  initialValues?: StepTwoFormData | null;
  responseDocument: File | null;
  handleResponseDocumentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeResponseDocument: () => void;
}

const RegistrationStepTwo: React.FC<RegistrationStepTwoProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
  spiritualHistory,
  addSpiritualHistory,
  updateSpiritualHistory,
  removeSpiritualHistory,
  initialValues,
  responseDocument,
  handleResponseDocumentChange,
  removeResponseDocument,
}) => {
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(formSchema) as never,
    defaultValues: initialValues ?? {
      acceptedChristDate: "",
      waterBaptized: "Yes",
      dateOfWaterBaptism: "",
      dateOfHolyGhostBaptism: "",
      prayInTongues: "Yes",
      believeInTongues: undefined,
      desireTongues: undefined,
      spiritualGiftsList: [],
      spiritualGiftsOther: "",
      formalChristianTraining: "No",
      trainingInstitution: "",
      highestProgramme: "",
      trainingDuration: "",
      previouslyOrdained: "No",
      ordinationType: "",
      ordinationDate: "",
      ordinationBy: "",
      ordinationDenomination: "",
      currentAffiliation: "",
      currentCapacity: "",
      ministryDuration: "",
      ministryIncome: "",
      otherEmployment: "No",
      employmentDescription: "",
    },
  });

  const watchWaterBaptized = form.watch("waterBaptized");
  const watchPrayInTongues = form.watch("prayInTongues");
  const watchTraining = form.watch("formalChristianTraining");
  const watchOrdained = form.watch("previouslyOrdained");
  const watchEmployment = form.watch("otherEmployment");
  const watchGifts = form.watch("spiritualGiftsList") ?? [];

  const toggleGift = (gift: string) => {
    const current = form.getValues("spiritualGiftsList") ?? [];
    if (current.includes(gift)) {
      form.setValue(
        "spiritualGiftsList",
        current.filter((g) => g !== gift),
        { shouldDirty: true }
      );
    } else {
      form.setValue("spiritualGiftsList", [...current, gift], { shouldDirty: true });
    }
  };

  const handleSubmit = (data: StepTwoFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Spiritual Information */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold">Spiritual Information</h3>

          <FormField
            control={form.control}
            name="acceptedChristDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>When did you accept Christ (Date of New Birth)? *</FormLabel>
                <FormDescription>Year is required. Day and Month are optional.</FormDescription>
                <FormControl>
                  <PartialDateInput value={field.value || ""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Have you been baptised in water? *</FormLabel>
            <YesNoOptions name="waterBaptized" form={form} />
            <FormMessage>{form.formState.errors.waterBaptized?.message}</FormMessage>
          </div>

          {watchWaterBaptized === "Yes" && (
            <FormField
              control={form.control}
              name="dateOfWaterBaptism"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Water Baptism *</FormLabel>
                  <FormDescription>Year is required. Day and Month are optional.</FormDescription>
                  <FormControl>
                    <PartialDateInput value={field.value || ""} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="dateOfHolyGhostBaptism"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Holy Ghost Baptism</FormLabel>
                <FormDescription>Day and Month are optional.</FormDescription>
                <FormControl>
                  <PartialDateInput value={field.value || ""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Do you pray in tongues? *</FormLabel>
            <YesNoOptions name="prayInTongues" form={form} />
            <FormMessage>{form.formState.errors.prayInTongues?.message}</FormMessage>
          </div>

          {watchPrayInTongues === "No" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-1">
              <div className="space-y-2">
                <FormLabel>If No, do you believe in it?</FormLabel>
                <YesNoOptions name="believeInTongues" form={form} />
              </div>
              <div className="space-y-2">
                <FormLabel>Do you desire it?</FormLabel>
                <YesNoOptions name="desireTongues" form={form} />
              </div>
            </div>
          )}
        </section>

        <hr />

        {/* Spiritual Gifts */}
        <section className="space-y-3">
          <FormLabel>
            Tick the spiritual gifts that manifest in your life
          </FormLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-lg border p-4">
            {SPIRITUAL_GIFT_OPTIONS.map((gift) => (
              <label
                key={gift}
                className="flex items-start gap-2 cursor-pointer text-sm"
              >
                <Checkbox
                  checked={watchGifts.includes(gift)}
                  onCheckedChange={() => toggleGift(gift)}
                  className="mt-0.5"
                />
                <span>{gift}</span>
              </label>
            ))}
          </div>
          <FormField
            control={form.control}
            name="spiritualGiftsOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Others (Specify)</FormLabel>
                <FormControl>
                  <Input placeholder="List any other gifts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <hr />

        {/* Theological Education */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold">Theological Education</h3>
          <div className="space-y-2">
            <FormLabel>Do you have any formal theological education? *</FormLabel>
            <YesNoOptions name="formalChristianTraining" form={form} />
            <FormMessage>
              {form.formState.errors.formalChristianTraining?.message}
            </FormMessage>
          </div>

          {watchTraining === "Yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="trainingInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theological Seminary or Bible School</FormLabel>
                    <FormControl>
                      <Input placeholder="Institution name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="highestProgramme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highest programme studied</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Diploma, Bachelor's" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trainingDuration"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Total duration completed</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Number of days, weeks, months, or years"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </section>

        <hr />

        {/* Ordination */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold">Licensing & Ordination</h3>
          <div className="space-y-2">
            <FormLabel>
              Have you ever been licensed or ordained as a minister? *
            </FormLabel>
            <YesNoOptions name="previouslyOrdained" form={form} />
            <FormMessage>
              {form.formState.errors.previouslyOrdained?.message}
            </FormMessage>
          </div>

          {watchOrdained === "Yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ordinationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Licensed">Licensed</SelectItem>
                        <SelectItem value="Ordained">Ordained</SelectItem>
                      </SelectContent>
                    </Select>
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
              <FormField
                control={form.control}
                name="ordinationDenomination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>By which denomination?</FormLabel>
                    <FormControl>
                      <Input placeholder="Denomination" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </section>

        <hr />

        {/* Affiliation & Ministry */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold">Current Ministry</h3>
          <FormField
            control={form.control}
            name="currentAffiliation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  With what Church/Ministry are you presently affiliated? *
                </FormLabel>
                <FormControl>
                  <Input placeholder="Church / Ministry" {...field} />
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
                <FormLabel>In what capacity are you serving there? *</FormLabel>
                <FormControl>
                  <Input placeholder="Your role" {...field} />
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
                    <Input placeholder="Duration" {...field} />
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
                  <FormLabel>
                    What percentage of your income is derived from your ministry? *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 50%" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <hr />

        {/* Employment */}
        <section className="space-y-5">
          <h3 className="text-lg font-semibold">Other Employment</h3>
          <div className="space-y-2">
            <FormLabel>
              Other than the ministry, do you have other employment? *
            </FormLabel>
            <YesNoOptions name="otherEmployment" form={form} />
            <FormMessage>
              {form.formState.errors.otherEmployment?.message}
            </FormMessage>
          </div>
          {watchEmployment === "Yes" && (
            <FormField
              control={form.control}
              name="employmentDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>If yes, describe</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your employment"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </section>

        <hr />

        {/* Service History */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Spiritual Service History with Dates</h3>
          <FormDescription>
            State all the major capacities in the various churches/ministries
            you have served, with dates. <br />
            E.g.: 2005-2007: Prayer band member, Assemblies of God Church,
            Utako, Abuja.
          </FormDescription>

          {spiritualHistory.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              <Textarea
                value={item.text}
                onChange={(e) => updateSpiritualHistory(item.id, e.target.value)}
                placeholder="Year(s): Position, Church/Ministry, Location"
                className="resize-none flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSpiritualHistory(item.id)}
                disabled={spiritualHistory.length <= 1}
              >
                -
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addSpiritualHistory}
            className="w-full"
          >
            + Add Another Service History
          </Button>
        </section>

        <hr />

        {/* Document Upload */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Upload Typed Response Document *</h3>
          <FormDescription>
            Upload your typed response to the questions on the first page of the
            registration form. Document file formats only (PDF, DOC, DOCX).
          </FormDescription>

          <div className="space-y-2">
            <Label htmlFor="response-doc">Document File</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-input rounded-md">
              <div className="space-y-1 text-center">
                <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                <div className="flex text-sm text-muted-foreground">
                  <label
                    htmlFor="response-doc"
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:opacity-80 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <Input
                      id="response-doc"
                      type="file"
                      accept=".pdf,.doc,.docx,.odt,.rtf,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="sr-only"
                      onChange={handleResponseDocumentChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </div>
            </div>

            {responseDocument && (
              <div className="mt-2 flex items-center space-x-2 py-2 px-4 bg-muted rounded-md">
                <FileUp size={16} />
                <span className="text-sm flex-1 truncate">
                  {responseDocument.name}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeResponseDocument}
                >
                  <Trash2 size={16} className="text-destructive" />
                </Button>
              </div>
            )}
          </div>
        </section>

        <div className="flex justify-between mt-8">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationStepTwo;
