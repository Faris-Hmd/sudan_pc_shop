"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MonthYearSelector({
  currentDate, // Expected format: "YYYY-MM"
}: {
  currentDate: string;
}) {
  const router = useRouter();

  // Split the "2025-01" string into ["2025", "01"]
  const [currentYear, currentMonth] = currentDate.split("-");

  const updatePath = (year: string, month: string) => {
    router.push(`/Dashboard/manegeOrder/shipped/${year}-${month}`);
  };

  const years = ["2024", "2025", "2026"];
  const months = [
    { name: "Jan", val: "01" },
    { name: "Feb", val: "02" },
    { name: "Mar", val: "03" },
    { name: "Apr", val: "04" },
    { name: "May", val: "05" },
    { name: "Jun", val: "06" },
    { name: "Jul", val: "07" },
    { name: "Aug", val: "08" },
    { name: "Sep", val: "09" },
    { name: "Oct", val: "10" },
    { name: "Nov", val: "11" },
    { name: "Dec", val: "12" },
  ];

  return (
    <div className="flex gap-2">
      {/* Year Selector */}
      <Select
        value={currentYear}
        onValueChange={(y) => updatePath(y, currentMonth)}
      >
        <SelectTrigger className="w-[100px] rounded-xl bg-slate-50 border-none font-bold text-slate-700 h-10 px-4">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-none shadow-2xl">
          {years.map((y) => (
            <SelectItem key={y} value={y} className="font-bold">
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Month Selector */}
      <Select
        value={currentMonth}
        onValueChange={(m) => updatePath(currentYear, m)}
      >
        <SelectTrigger className="w-[120px] rounded-xl bg-slate-50 border-none font-bold text-slate-700 h-10 px-4">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-none shadow-2xl">
          {months.map((m) => (
            <SelectItem
              key={m.val}
              value={m.val}
              className="font-bold text-slate-600"
            >
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
