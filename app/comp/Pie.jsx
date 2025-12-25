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

const chartConfig = {
  PC: { label: "PC", color: "hsl(0, 0%, 90%)" },
  LAPTOP: { label: "LAPTOP", color: "hsl(0, 0%, 82%)" },
  WEBCAMS: { label: "WEBCAMS", color: "hsl(0, 0%, 74%)" },
  HARD_DRIVES: { label: "HARD_DRIVES", color: "hsl(0, 0%, 66%)" },
  HEADSETS: { label: "HEADSETS", color: "hsl(0, 0%, 58%)" },
  KEYBOARDS: { label: "KEYBOARDS", color: "hsl(0, 0%, 50%)" },
  SPEAKERS: { label: "SPEAKERS", color: "hsl(0, 0%, 42%)" },
  PRINTERS: { label: "PRINTERS", color: "hsl(0, 0%, 38%)" },
  MICROPHONES: { label: "MICROPHONES", color: "hsl(0, 0%, 34%)" },
  MONITORS: { label: "MONITORS", color: "hsl(0, 0%, 30%)" },
  TABLETS: { label: "TABLETS", color: "hsl(0, 0%, 27%)" },
  PROJECTORS: { label: "PROJECTORS", color: "hsl(0, 0%, 24%)" },
  SCANNERS: { label: "SCANNERS", color: "hsl(0, 0%, 21%)" },
  SSD: { label: "SSD", color: "hsl(0, 0%, 18%)" },
  MOUSES: { label: "MOUSES", color: "hsl(0, 0%, 15%)" },
  DESKTOP: { label: "DESKTOP", color: "hsl(0, 0%, 12%)" },
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
    <Card
      data-chart={id}
      className="flex flex-col rounded-xl border-none shadow-none w-full"
    >
      <ChartStyle id={id} config={chartConfig} />

      {/* Header */}
      <CardHeader className="">
        <CardTitle className="text-base font-semibold">
          Products by Category
        </CardTitle>
        <CardDescription className="text-xs">
          Distribution of products across categories
        </CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex flex-1 items-center justify-center pb-4">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="aspect-square w-[220px]"
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
              innerRadius={65}
              strokeWidth={4}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 8} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 18}
                    innerRadius={outerRadius + 10}
                    opacity={0.25}
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
                          className="fill-foreground text-2xl font-semibold"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {categories[activeIndex].quantity.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="fill-muted-foreground text-xs"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* Footer / Select */}
      <div className="border-t px-4 py-3">
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger className="h-8 w-full text-xs">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent className="rounded-lg">
            {months.map((key) => {
              const config = chartConfig[key];
              if (!config) return null;

              return (
                <SelectItem key={key} value={key} className="text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
