"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { TrendingUp } from "lucide-react";
import DateSelector from "@/components/DataPicker";

type DaySales = {
  month: string;
  day: number;
  sales: number;
  orders: number;
  formattedDate?: string;
};

const chartConfig = {
  sales: { label: "Revenue", color: "#2563eb" },
  orders: { label: "Orders", color: "#10b981" },
};

export default function Component({
  salesData = [],
}: {
  salesData: DaySales[];
}) {
  const params = useParams();
  const currentMonth = (params.date as string) || "2026-01";

  // Navigation Setup for 2025

  const { totalSales, totalOrders } = useMemo(() => {
    return salesData.reduce(
      (acc, curr) => ({
        totalSales: acc.totalSales + curr.sales,
        totalOrders: acc.totalOrders + curr.orders,
      }),
      { totalSales: 0, totalOrders: 0 }
    );
  }, [salesData]);

  return (
    <Card className="space-y-6 w-full border-none shadow-none overflow-hidden bg-transparent">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Revenue Analytics
          </CardTitle>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] transition-colors">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <TrendingUp className="w-3 h-3" />
            {totalOrders.toLocaleString()} Successfully Fulfilled
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-baseline gap-1 bg-blue-600 text-white font-black px-5 py-2.5 rounded-xl shadow-xl shadow-blue-500/20 dark:shadow-none">
            <span className="text-lg">{totalSales.toLocaleString()}</span>
            <span className="text-[10px] opacity-70 uppercase tracking-tighter">SDG</span>
          </div>

          <DateSelector currentMonth={currentMonth} />
        </div>
      </div>

      <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesData}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800/50"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-tighter"
              />
              <YAxis hide />
              <ChartTooltip
                cursor={{ stroke: "#3b82f6", strokeWidth: 2, strokeDasharray: "4 4" }}
                content={<ChartTooltipContent indicator="dot" className="rounded-xl border-slate-100 dark:border-slate-800 shadow-2xl" />}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={4}
                fill="url(#salesGrad)"
                animationDuration={1500}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
              />
              <Area dataKey="orders" fill="transparent" stroke="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>

  );
}
