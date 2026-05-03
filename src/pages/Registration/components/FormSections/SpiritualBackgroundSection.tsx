import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData, SpiritualHistoryItem } from "../../types";

interface SpiritualBackgroundSectionProps {
  form: UseFormReturn<StepTwoFormData>;
  spiritualHistory: SpiritualHistoryItem[];
  addSpiritualHistory: () => void;
  updateSpiritualHistory: (id: number, value: string) => void;
  removeSpiritualHistory: (id: number) => void;
}

const SpiritualBackgroundSection = ({
  form,
  spiritualHistory,
  addSpiritualHistory,
  updateSpiritualHistory,
  removeSpiritualHistory,
}: SpiritualBackgroundSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Spiritual Background</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="dateOfNewBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of New Birth *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfWaterBaptism"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Water Baptism *</FormLabel>
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
        name="dateOfHolyGhostBaptism"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Holy Ghost Baptism *</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ministryGift"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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

      <div className="space-y-3">
        <FormLabel>Spiritual History with dates</FormLabel>
        <FormDescription>
          All the major capacities in the various churches/ministries you have ever served
          with dates. E.g., 2005-2007: Prayer band member, Assemblies of God Church, Utako, Abuja.
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
    </div>
  );
};

export default SpiritualBackgroundSection;
