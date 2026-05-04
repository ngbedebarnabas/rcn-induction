
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, User, Trash2, Plus, Minus } from "lucide-react";
import { StepOneFormData } from "../types";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const stepOneSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name (surname) is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumbers: z.array(z.string()).min(1, "Phone number is required"),
  socialMediaHandles: z.array(z.string()).optional(),
  recommendedBy: z.string().min(1, "This field is required"),
  recommenderFullName: z.string().min(1, "Recommender's full name is required"),
  recommenderPhone: z.string().min(1, "Recommender's phone number is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  isDivorced: z.enum(["Yes", "No"]).optional(),
  divorceCount: z.string().optional(),
  lastDivorceDate: z.string().optional(),
  childrenCount: z.string().optional(),
  spouseName: z.string().optional(),
  isSpouseBeliever: z.enum(["Yes", "No"]).optional(),
  spouseDateOfBirth: z.string().optional(),
  anniversaryDate: z.string().optional(),
});

interface RegistrationStepOneProps {
  onSubmit: (data: StepOneFormData) => void;
  passportPreview: string | null;
  handlePassportChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removePassport: () => void;
  initialValues?: StepOneFormData | null;
}

const RegistrationStepOne = ({
  onSubmit,
  passportPreview,
  handlePassportChange,
  removePassport,
  initialValues,
}: RegistrationStepOneProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: initialValues ?? {
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      email: "",
      phoneNumbers: [""],
      socialMediaHandles: [""],
      recommendedBy: "",
      recommenderFullName: "",
      recommenderPhone: "",
      placeOfBirth: "",
      dateOfBirth: "",
      maritalStatus: "",
      isDivorced: undefined,
      divorceCount: "",
      lastDivorceDate: "",
      childrenCount: "",
      spouseName: "",
      isSpouseBeliever: undefined,
      spouseDateOfBirth: "",
      anniversaryDate: "",
    },
  });

  const handles = form.watch("socialMediaHandles") ?? [""];

  const updateHandle = (index: number, value: string) => {
    const next = [...(handles ?? [])];
    next[index] = value;
    form.setValue("socialMediaHandles", next, { shouldDirty: true });
  };

  const addHandle = () => {
    form.setValue("socialMediaHandles", [...(handles ?? []), ""], {
      shouldDirty: true,
    });
  };

  const removeHandle = (index: number) => {
    if ((handles ?? []).length <= 1) return;
    const next = (handles ?? []).filter((_, i) => i !== index);
    form.setValue("socialMediaHandles", next, { shouldDirty: true });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setIsUploading(true);
      const file = event.target.files[0];

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload only JPEG or PNG images",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        setIsUploading(false);
        return;
      }

      handlePassportChange(event);
      setIsUploading(false);
    }
  };

  const handleFormSubmit = (formData: z.infer<typeof stepOneSchema>) => {
    if (!passportPreview) {
      toast({
        title: "Passport photo required",
        description: "Please upload a headshot to continue",
        variant: "destructive",
      });
      return;
    }

    const cleanedHandles = (formData.socialMediaHandles ?? [])
      .map((h) => h.trim())
      .filter(Boolean);

    onSubmit({
      ...formData,
      socialMediaHandles: cleanedHandles,
    } as StepOneFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-2 text-left">
          <FormLabel>Full Name *</FormLabel>
          <FormDescription>
            Please type your name as it should appear on your certificate.
          </FormDescription>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Middle name (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Last Name (Surname) *</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="text-left">
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
            name="email"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumbers"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Phone Number(s) *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number(s)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3 text-left">
          <FormLabel>Social Media handles</FormLabel>
          <FormDescription>
            Add as many handles as you like (e.g. @yourname on Instagram, Facebook URL).
          </FormDescription>
          {(handles ?? [""]).map((value, index) => (
            <div key={index} className="flex items-start gap-2">
              <Input
                value={value}
                onChange={(e) => updateHandle(index, e.target.value)}
                placeholder="Platform: handle or URL"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeHandle(index)}
                disabled={(handles ?? []).length <= 1}
                className={(handles ?? []).length <= 1 ? "opacity-50" : ""}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addHandle}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add another handle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="recommendedBy"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Who recommended you? *</FormLabel>
                <FormControl>
                  <Input placeholder="Name of your recommender" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Place of Birth *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your place of birth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Date of Birth *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Marital Status *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your marital status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="widow">Widow</SelectItem>
                  <SelectItem value="widower">Widower</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="remarried">Remarried</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2 text-left">
          <FormLabel>Have you been divorced?</FormLabel>
          <RadioGroup
            value={form.watch("isDivorced") ?? ""}
            onValueChange={(value) =>
              form.setValue("isDivorced", value as "Yes" | "No")
            }
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="isDivorced-yes" />
              <Label htmlFor="isDivorced-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="isDivorced-no" />
              <Label htmlFor="isDivorced-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="divorceCount"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>If yes, how many times?</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastDivorceDate"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Last divorce date</FormLabel>
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
            <FormItem className="text-left">
              <FormLabel>Number of Children</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter number of children" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spouseName"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Name of Spouse</FormLabel>
              <FormControl>
                <Input placeholder="Enter spouse's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2 text-left">
          <FormLabel>Is your spouse a believer?</FormLabel>
          <RadioGroup
            value={form.watch("isSpouseBeliever") ?? ""}
            onValueChange={(value) =>
              form.setValue(
                "isSpouseBeliever",
                value as "Yes" | "No"
              )
            }
            className="flex flex-wrap gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="isSpouseBeliever-yes" />
              <Label htmlFor="isSpouseBeliever-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="isSpouseBeliever-no" />
              <Label htmlFor="isSpouseBeliever-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="spouseDateOfBirth"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Spouse's Date of Birth</FormLabel>
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
              <FormItem className="text-left">
                <FormLabel>Anniversary Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Passport / Headshot Upload */}
        <div className="space-y-4 text-left">
          <FormLabel htmlFor="passport-upload">
            Upload a headshot of yourself (Picture) *
          </FormLabel>
          <FormDescription>
            Please upload a clear headshot with a plain background (JPEG or PNG, max 5MB).
          </FormDescription>

          {!passportPreview ? (
            <div className="border-2 border-dashed border-input rounded-md p-6">
              <div className="flex flex-col items-center space-y-2">
                <User className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <label
                    htmlFor="passport-upload"
                    className="cursor-pointer text-primary hover:underline"
                  >
                    <span>{isUploading ? "Uploading..." : "Click to upload picture"}</span>
                    <Input
                      id="passport-upload"
                      type="file"
                      className="sr-only"
                      accept="image/jpeg,image/png"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={passportPreview}
                alt="Passport Preview"
                className="w-full h-full object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={removePassport}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                disabled={isUploading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationStepOne;
