"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DateSelector({
  currentMonth,
}: {
  currentMonth: string;
}) {
  const router = useRouter();

  // Split "2025-01" into year="2025" and month="01"
  const [selectedYear, selectedMonth] = currentMonth.split("-");

  const years = ["2024", "2025", "2026"];
  const months = [
    { label: "January", val: "01" },
    { label: "February", val: "02" },
    { label: "March", val: "03" },
    { label: "April", val: "04" },
    { label: "May", val: "05" },
    { label: "June", val: "06" },
    { label: "July", val: "07" },
    { label: "August", val: "08" },
    { label: "September", val: "09" },
    { label: "October", val: "10" },
    { label: "November", val: "11" },
    { label: "December", val: "12" },
  ];

  const handleUpdate = (year: string, month: string) => {
    router.push(`${year}-${month}` as any);
  };

  return (
    <div className="flex gap-2">
      {/* Year Selection */}
      <Select
        value={selectedYear}
        onValueChange={(v) => handleUpdate(v, selectedMonth)}
      >
        <SelectTrigger className="w-[100px] h-10 rounded-xl bg-blue-50 border-blue-100 text-blue-700 font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {years.map((y) => (
            <SelectItem key={y} value={y} className="font-semibold">
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Month Selection */}
      <Select
        value={selectedMonth}
        onValueChange={(v) => handleUpdate(selectedYear, v)}
      >
        <SelectTrigger className="w-[140px] h-10 rounded-xl bg-blue-50 border-blue-100 text-blue-700 font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {months.map((m) => (
            <SelectItem key={m.val} value={m.val} className="font-semibold">
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
