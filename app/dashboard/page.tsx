"use client";

import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { getAllOrders } from "@/services/ordersServices";
import {
  BarChart3,
  Package,
  ShoppingBag,
  PlusCircle,
  ClipboardList,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight,
  User,
  Truck,
} from "lucide-react";

const ActionCard = ({
  href,
  title,
  description,
  Icon,
}: {
  href: string;
  title: string;
  description: string;
  Icon: any;
}) => (
  <Link
    href={href as any}
    className="group relative p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 active:scale-[0.98] flex flex-col h-full"
  >
    <div className="flex flex-col gap-3 md:gap-4 flex-1">
      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl md:rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      </div>
      <div className="space-y-0.5 md:space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm md:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 dark:group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tight line-clamp-1">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default function DashboardPage() {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const { data: orders, isLoading } = useSWR("all-orders", getAllOrders, {
    revalidateOnFocus: false,
    dedupingInterval: 30000,
  });

  const realRevenue = orders?.filter(o => o.status === "Delivered").reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 0;
  const openOrdersCount = orders?.filter(o => o.status === "Processing").length || 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              Control Center
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Manage your store's operations and track performance metrics.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* High-Impact Stats */}
        <section className="grid grid-cols-2 md:grid-cols-2 gap-4 animate-in-slide mb-8">
          {[
            {
              label: "Net Revenue",
              val: isLoading ? "..." : realRevenue.toLocaleString(),
              unit: "SDG",
              trend: "Life",
              icon: TrendingUp,
              color: "text-emerald-500",
              bg: "bg-emerald-50 dark:bg-emerald-500/10",
            },
            {
              label: "Open Orders",
              val: isLoading ? "..." : openOrdersCount.toString().padStart(2, '0'),
              unit: "Active",
              trend: "Queue",
              icon: Clock,
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-600/10",
            },
        
          ].map((stat, i) => (
            <div
              key={i}
              className="group p-4 md:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${stat.bg} ${stat.color}`}>
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-0">
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {stat.val}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    {stat.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Management Console */}
        <div className="space-y-4 md:space-y-8 animate-in-slide [animation-delay:200ms]">
          <div className="flex items-center gap-4 md:gap-6">
             <h2 className="text-[9px] md:text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] whitespace-nowrap">Management Console</h2>
             <div className="h-px grow bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <ActionCard
              href={`/dashboard/analatic/${currentMonth}`}
              title="Analytics"
              description="Deep performance data"
              Icon={BarChart3}
            />
            <ActionCard
              href="/dashboard/manegeOrder"
              title="Fulfillment"
              description="Dispatch & logistics"
              Icon={Package}
            />
            <ActionCard
              href="/dashboard/productsSet"
              title="Inventory"
              description="Stock & catalog"
              Icon={ShoppingBag}
            />
            <ActionCard
              href="/dashboard/productsSet/prod_add"
              title="Create"
              description="New product entry"
              Icon={PlusCircle}
            />
            <ActionCard
              href={`/dashboard/manegeOrder/shipped/${currentMonth}`}
              title="Logs"
              description="Delivery history"
              Icon={ClipboardList}
            />
            <ActionCard
              href="/profile"
              title="Profile"
              description="User account settings"
              Icon={User}
            />
            <ActionCard
              href="/dashboard/drivers"
              title="Fleet"
              description="Manage drivers & vehicles"
              Icon={Truck}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
