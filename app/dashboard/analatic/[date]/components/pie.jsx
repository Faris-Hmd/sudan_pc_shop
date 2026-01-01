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
  PC: { label: "PC", color: "#3b82f6" },
  LAPTOP: { label: "Laptop", color: "#10b981" },
  WEBCAMS: { label: "Webcams", color: "#f59e0b" },
  HARD_DRIVES: { label: "Hard Drives", color: "#ef4444" },
  HEADSETS: { label: "Headsets", color: "#8b5cf6" },
  KEYBOARDS: { label: "Keyboards", color: "#ec4899" },
  SPEAKERS: { label: "Speakers", color: "#06b6d4" },
  PRINTERS: { label: "Printers", color: "#f97316" },
  MICROPHONES: { label: "Microphones", color: "#14b8a6" },
  MONITORS: { label: "Monitors", color: "#6366f1" },
  TABLETS: { label: "Tablets", color: "#d946ef" },
  PROJECTORS: { label: "Projectors", color: "#84cc16" },
  SCANNERS: { label: "Scanners", color: "#475569" },
  SSD: { label: "SSD", color: "#0f172a" },
  MOUSES: { label: "Mouses", color: "#7c3aed" },
  DESKTOP: { label: "Desktop", color: "#2563eb" },
};

export default function ChartPieInteractive({ categories }) {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(categories[0]?.category || "");

  const activeIndex = React.useMemo(
    () => categories.findIndex((item) => item.category === activeMonth),
    [activeMonth, categories]
  );
  const months = React.useMemo(
    () => categories.map((item) => item.category),
    [categories]
  );

  if (!categories || categories.length === 0) return null;

  return (
    <Card
      data-chart={id}
      className="flex flex-col rounded-xl border-none shadow-none w-full bg-transparent"
    >
      <ChartStyle id={id} config={chartConfig} />

      {/* Header */}
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
          Inventory Distribution
        </CardTitle>
        <CardDescription className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">
          Stock allocation across all categories
        </CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex flex-1 items-center justify-center p-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="aspect-square h-[200px]"
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
              innerRadius={70}
              strokeWidth={8}
              stroke="transparent"
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 20}
                    innerRadius={outerRadius + 12}
                    opacity={0.3}
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
                          className="fill-slate-900 dark:fill-white text-3xl font-black"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {categories[activeIndex].quantity.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-slate-400 dark:fill-slate-500 text-[10px] font-black uppercase tracking-widest"
                        >
                          Units
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
      <div className="pt-6">
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger className="h-10 w-full text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm transition-all focus:ring-4 focus:ring-blue-500/10">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent className="rounded-xl dark:bg-slate-900 dark:border-slate-800">
            {months.map((key) => {
              const config = chartConfig[key];
              if (!config) return null;

              return (
                <SelectItem key={key} value={key} className="text-xs font-bold py-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3 w-3 rounded-md"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    <span className="text-slate-700 dark:text-slate-300">
                      {config.label}
                    </span>
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
