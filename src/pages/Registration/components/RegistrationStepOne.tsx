import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, User, Trash2 } from "lucide-react";
import { SpiritualHistoryItem, StepOneFormData } from "../types";

// First step form schema
const stepOneSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  dateOfNewBirth: z.string().min(1, "Date of new birth is required"),
  dateOfWaterBaptism: z.string().min(1, "Date of water baptism is required"),
  dateOfHolyGhostBaptism: z.string().min(1, "Date of Holy Ghost baptism is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  ministryGift: z.string().min(1, "Ministry gift is required"),
  spiritualGifts: z.string().min(1, "Spiritual gifts are required"),
});

interface RegistrationStepOneProps {
  onSubmit: (data: StepOneFormData) => void;
  spiritualHistory: SpiritualHistoryItem[];
  addSpiritualHistory: () => void;
  updateSpiritualHistory: (id: number, value: string) => void;
  removeSpiritualHistory: (id: number) => void;
  passportPreview: string | null;
  handlePassportChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removePassport: () => void;
}

const RegistrationStepOne = ({
  onSubmit,
  spiritualHistory,
  addSpiritualHistory,
  updateSpiritualHistory,
  removeSpiritualHistory,
  passportPreview,
  handlePassportChange,
  removePassport
}: RegistrationStepOneProps) => {
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      dateOfNewBirth: "",
      dateOfWaterBaptism: "",
      dateOfHolyGhostBaptism: "",
      maritalStatus: "",
      ministryGift: "",
      spiritualGifts: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="surname, first name, other name(s)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="dateOfNewBirth"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Date of New Birth *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dateOfWaterBaptism"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Date of Water Baptism *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfHolyGhostBaptism"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Date of Holy Ghost Baptism *</FormLabel>
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
          name="maritalStatus"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Marital Status *</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
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

        <FormField
          control={form.control}
          name="ministryGift"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Ministry Gift *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your ministry gift" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spiritualGifts"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Gift(s) of the Spirit in Manifestation *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List the spiritual gifts you have" 
                  className="resize-none" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 text-left">
          <FormLabel>Spiritual History with dates</FormLabel>
          <FormDescription>
            All the major capacities in the various churches/ministries you have ever served with dates.
            E.g., 2005-2007: Prayer band member, Assemblies of God Church, Utako, Abuja.
          </FormDescription>

          {spiritualHistory.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              <Textarea 
                value={item.text}
                onChange={(e) => updateSpiritualHistory(item.id, e.target.value)}
                placeholder="Year: Position, Church/Ministry, Location"
                className="resize-none flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => removeSpiritualHistory(item.id)}
                className={spiritualHistory.length <= 1 ? "opacity-50" : ""}
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
            + Add Another Entry
          </Button>
        </div>

        {/* Passport Photo Upload */}
        <div className="space-y-4 text-left">
          <FormLabel htmlFor="passport-upload">Passport Photograph *</FormLabel>
          <FormDescription>
            Please upload a clear passport photograph with a plain background (JPEG or PNG format).
          </FormDescription>

          {!passportPreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
              <div className="flex flex-col items-center space-y-2">
                <User className="h-12 w-12 text-gray-400" />
                <div className="text-center">
                  <label htmlFor="passport-upload" className="cursor-pointer text-primary hover:underline">
                    <span>Click to upload passport</span>
                    <Input 
                      id="passport-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/*"
                      onChange={handlePassportChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
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
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Next Step <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationStepOne;
