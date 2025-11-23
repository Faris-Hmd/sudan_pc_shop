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
import { Card, CardTitle } from "@/components/ui/card";

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
  MONITORS: { label: "MONITORS", color: "#e6f4ff" },
  SSD: { label: "SSD", color: "#cceaff" },
  LAPTOP: { label: "LAPTOP", color: "#99d4ff" },
  WEBCAMS: { label: "WEBCAMS", color: "#66bfff" },
  HEADSETS: { label: "HEADSETS", color: "#33a9ff" },
  KEYBOARDS: { label: "KEYBOARDS", color: "#0093ff" },
  SPEAKERS: { label: "SPEAKERS", color: "#0077cc" },
  MICROPHONES: { label: "MICROPHONES", color: "#005ea3" },
  TABLETS: { label: "TABLETS", color: "#00457a" },
  PROJECTORS: { label: "PROJECTORS", color: "#00314f" },
  SCANNERS: { label: "SCANNERS", color: "#002534" },
  HARD_DRIVES: { label: "HARD_DRIVES", color: "#001a1f" },
  PRINTERS: { label: "PRINTERS", color: "#002b48" },
  MOUSES: { label: "MOUSES", color: "#003b66" },
  PC: { label: "PC", color: "#004b85" },
  DESKTOP: { label: "DESKTOP", color: "#005ba3" },
};

export default function Component({ data }: any) {
  // console.log(data);
  return (
    <Card className=" gap-0 p-0">
      <CardTitle className="ms-3 mt-3 text-lg font-semibold">
        Sales by Months
      </CardTitle>
      <ChartContainer
        config={chartConfig}
        className="max-h-[200px] w-full  p-2 rounded-lg "
      >
        <BarChart accessibilityLayer data={data}>
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
          <Bar dataKey="quantity" fill="var(--color-value)" radius={4} />
          {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
