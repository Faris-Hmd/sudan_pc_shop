"use client";

import { useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- MOCK DATA ---------------- */
type DaySales = {
  month: string;
  day: number;
  sales: number;
};

const generateMonthData = (month: string, days: number): DaySales[] =>
  Array.from({ length: days }, (_, i) => ({
    month,
    day: i + 1,
    sales: Math.floor(80 + Math.random() * 120),
  }));

const mockData: DaySales[] = [
  ...generateMonthData("2024-06", 30),
  ...generateMonthData("2024-07", 31),
  ...generateMonthData("2024-08", 31),
];

/* ---------------- CONFIG ---------------- */
const chartConfig = {
  sales: {
    label: "Daily Sales",
    color: "hsl(var(--primary))",
  },
};

/* ---------------- COMPONENT ---------------- */
export default function Component() {
  const months = [...new Set(mockData.map((d) => d.month))].sort();
  const [selectedMonth, setSelectedMonth] = useState(
    months[months.length - 1] // default = last month
  );

  const monthData = mockData
    .filter((d) => d.month === selectedMonth)
    .sort((a, b) => a.day - b.day);

  const totalSales = monthData.reduce((sum, d) => sum + d.sales, 0);

  return (
    <Card className="rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg font-semibold">Daily Sales</CardTitle>
          <p className="text-sm text-muted-foreground">
            Month: {selectedMonth}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-base px-3 py-1">
            Total: {totalSales}
          </Badge>

          {/* Month Selector */}
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="h-[240px] w-full">
        <BarChart data={monthData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={6}
          />

          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar dataKey="sales" radius={6} fill="var(--color-sales)" />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
