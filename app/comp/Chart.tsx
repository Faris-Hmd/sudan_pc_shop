"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// ...existing code...
const chartData = [
  { category: "MONITORS", value: 42, fill: "green" },
  { category: "SSD", value: 40 },
  { category: "LAPTOP", value: 36 },
  { category: "WEBCAMS", value: 34 },
  { category: "HEADSETS", value: 34 },
  { category: "KEYBOARDS", value: 33 },
  { category: "SPEAKERS", value: 32 },
  { category: "MICROPHONES", value: 32 },
  { category: "TABLETS", value: 30 },
  { category: "PROJECTORS", value: 28 },
  { category: "SCANNERS", value: 28 },
  { category: "HARD_DRIVES", value: 28 },
  { category: "PRINTERS", value: 27 },
  { category: "MOUSES", value: 27 },
  { category: "PC", value: 26 },
  { category: "DESKTOP", value: 23 },
];
// ...existing code...

const chartConfig = {
  value: {
    label: "quantity",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function Component({ data }: any) {
  // console.log(data);
  return (
    <div className="m-1 md:m-4">
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full border p-4 rounded-lg "
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {/* <ChartLegend content={<ChartLegendContent />} /> */}
          <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
