"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MonthSelector({
  currentDate,
}: {
  currentDate: string;
}) {
  const router = useRouter();

  const handleMonthChange = (val: string) => {
    // val will be "2025-01", "2025-02", etc.
    router.push(`/Dashboard/manegeOrder/shipped/${val}`);
  };

  const months = [
    { name: "January", val: "2025-01" },
    { name: "February", val: "2025-02" },
    { name: "March", val: "2025-03" },
    { name: "April", val: "2025-04" },
    { name: "May", val: "2025-05" },
    { name: "June", val: "2025-06" },
    { name: "July", val: "2025-07" },
    { name: "August", val: "2025-08" },
    { name: "September", val: "2025-09" },
    { name: "October", val: "2025-10" },
    { name: "November", val: "2025-11" },
    { name: "December", val: "2025-12" },
  ];

  return (
    <Select value={currentDate} onValueChange={handleMonthChange}>
      <SelectTrigger className="w-[160px] rounded-xl bg-slate-50 border-none font-bold text-slate-700 h-10 px-4">
        <SelectValue placeholder="Select Period" />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-none shadow-2xl">
        {months.map((m) => (
          <SelectItem
            key={m.val}
            value={m.val}
            className="font-bold text-slate-600 focus:text-blue-600"
          >
            {m.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
