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
    <Card className="space-y-1 w-full border-none shadow-none overflow-hidden">
      <div className=" flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="space-y-0 px-4">
          <CardTitle className="text-xl font-black text-slate-900 ">
            Revenue Analytics
          </CardTitle>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
            <TrendingUp className="w-3 h-3" />
            {totalOrders.toLocaleString()} Total Orders
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Badge className="bg-blue-600 text-white font-black px-4 py-2 rounded-xl">
            ${totalSales.toLocaleString()}
          </Badge>

          <DateSelector currentMonth={currentMonth} />
        </div>
      </div>

      <div className="w-full sm:h-[130px] sm:min-h-[130px] lg:h-[250px] lg:min-h-[250px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesData}
              margin={{ left: 10, right: 10, top: 20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                opacity={0.4}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                className="text-[10px] font-bold"
              />
              <YAxis hide />
              <ChartTooltip
                cursor={{ stroke: "#2563eb", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={3}
                fill="url(#salesGrad)"
                animationDuration={1000}
              />
              {/* Internal tracking for Orders data series */}
              <Area dataKey="orders" fill="transparent" stroke="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>

  );
}
