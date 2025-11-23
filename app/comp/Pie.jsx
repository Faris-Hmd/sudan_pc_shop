"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive pie chart";

// const categories = [
//   { category: "MONITORS", quantity: 42, fill: "var(--color-MONITORS)" },
//   { category: "SSD", quantity: 40, fill: "var(--color-SSD)" },
//   { category: "LAPTOP", quantity: 36, fill: "var(--color-LAPTOP)" },
//   { category: "WEBCAMS", quantity: 34, fill: "var(--color-WEBCAMS)" },
//   { category: "HEADSETS", quantity: 34, fill: "var(--color-HEADSETS)" },
//   { category: "KEYBOARDS", quantity: 33, fill: "var(--color-KEYBOARDS)" },
//   { category: "SPEAKERS", quantity: 32, fill: "var(--color-SPEAKERS)" },
//   { category: "MICROPHONES", quantity: 32, fill: "var(--color-MICROPHONES)" },
//   { category: "TABLETS", quantity: 30, fill: "var(--color-TABLETS)" },
//   { category: "PROJECTORS", quantity: 28, fill: "var(--color-PROJECTORS)" },
//   { category: "SCANNERS", quantity: 28, fill: "var(--color-SCANNERS)" },
//   { category: "HARD_DRIVES", quantity: 28, fill: "var(--color-HARD_DRIVES)" },
//   { category: "PRINTERS", quantity: 27, fill: "var(--color-PRINTERS)" },
//   { category: "MOUSES", quantity: 27, fill: "var(--color-MOUSES)" },
//   { category: "PC", quantity: 26, fill: "var(--color-PC)" },
//   { category: "DESKTOP", quantity: 23, fill: "var(--color-DESKTOP)" },
// ];

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

export default function ChartPieInteractive({ categories }) {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(categories[0].category);

  const activeIndex = React.useMemo(
    () => categories.findIndex((item) => item.category === activeMonth),
    [activeMonth]
  );
  const months = React.useMemo(
    () => categories.map((item) => item.category),
    []
  );

  return (
    <Card data-chart={id} className="flex flex-col p-1">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1 pt-3 ">
          <CardTitle>Products By Category</CardTitle>
          <CardDescription>
            show all products in diffrent category
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center items-start pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categories}
              dataKey="quantity"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {categories[activeIndex].quantity.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[180px] rounded-lg pl-2.5  text-sm"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select category" className="text-sm" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex w-full"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs "
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
