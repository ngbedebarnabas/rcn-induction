import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PartialDateInputProps {
  value: string; // stored as "YYYY-MM-DD" with "00" for missing day/month
  onChange: (value: string) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const parse = (v: string) => {
  const [y = "", m = "", d = ""] = (v || "").split("-");
  return {
    year: y,
    month: m && m !== "00" ? String(parseInt(m, 10)) : "",
    day: d && d !== "00" ? String(parseInt(d, 10)) : "",
  };
};

const compose = (year: string, month: string, day: string) => {
  if (!year && !month && !day) return "";
  const y = year || "";
  const hasMonth = !!month;
  const hasDay = !!day;
  // If neither day nor month provided, store year only
  if (!hasMonth && !hasDay) return y;
  const m = hasMonth ? month.padStart(2, "0") : "00";
  // If no day provided, store YYYY-MM
  if (!hasDay) return `${y}-${m}`;
  const d = day.padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const PartialDateInput = ({ value, onChange }: PartialDateInputProps) => {
  const { year, month, day } = parse(value);

  return (
    <div className="grid grid-cols-3 gap-2">
      <div>
        <Input
          type="number"
          placeholder="Day"
          min={1}
          max={31}
          value={day}
          onChange={(e) => onChange(compose(year, month, e.target.value))}
        />
      </div>
      <div>
        <Select
          value={month}
          onValueChange={(v) => onChange(compose(year, v, day))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((name, i) => (
              <SelectItem key={name} value={String(i + 1)}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Input
          type="number"
          placeholder="Year *"
          min={1900}
          max={2100}
          value={year}
          onChange={(e) => onChange(compose(e.target.value, month, day))}
        />
      </div>
    </div>
  );
};

export default PartialDateInput;
