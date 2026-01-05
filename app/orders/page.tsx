"use client";

import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Loader2, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Wallet, 
  ArrowRight,
  Package,
  Calendar
} from "lucide-react";

import OrderList from "./components/orderList";
import { OrderData } from "@/types/productsTypes";
import { getOrdersWh } from "@/services/ordersServices";
import { cn } from "@/lib/utils";

export default function UnifiedOrdersPage() {
  const { data: session, status } = useSession();
  const [sortBy, setSortBy] = useState<"date" | "cost">("date");

  const { data: orders, isLoading } = useSWR<OrderData[]>(
    session?.user?.email ? `customer-all-orders/${session.user.email}` : null,
    () => getOrdersWh([{ field: "customer_email", op: "==", val: session?.user?.email }]),
    { revalidateOnFocus: false, dedupingInterval: 10000 }
  );

  // --- REFINED SORTING & STATS ---
  const { sortedOrders, stats } = useMemo(() => {
    if (!orders) return { sortedOrders: [], stats: { active: 0, completed: 0, totalSpend: 0 } };

    const activeOrders = orders.filter((o) => o.status !== "Delivered");
    const completedOrders = orders.filter((o) => o.status === "Delivered");
    const totalSpend = completedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const sorted = [...orders].sort((a, b) => {
      // 1. Primary: Active on top
      const aIsActive = a.status !== "Delivered";
      const bIsActive = b.status !== "Delivered";
      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;

      // 2. Secondary: Selection
      if (sortBy === "cost") {
        return (b.totalAmount || 0) - (a.totalAmount || 0);
      }
      
      // 3. Date Parsing (Handles ISO String: 2025-12-31T21:55:32.700Z)
      const timeA = a.createdAt ? new Date(a.createdAt as any).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt as any).getTime() : 0;
      return timeB - timeA;
    });

    return { sortedOrders: sorted, stats: { active: activeOrders.length, completed: completedOrders.length, totalSpend } };
  }, [orders, sortBy]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-3">
        <Loader2 className="animate-spin text-blue-600" size={28} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05070a] pb-32">
      <header className="bg-white dark:bg-[#0a0c12] border-b border-slate-200 dark:border-white/5 sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0a0c12]/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            My <span className="text-blue-600">Orders</span>
          </h1>

          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
            {["date", "cost"].map((type) => (
              <button 
                key={type}
                onClick={() => setSortBy(type as any)}
                className={cn(
                  "px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all",
                  sortBy === type ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" : "text-slate-400"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* COMPACT STATS */}
        <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-2 rounded-2xl shadow-sm">
          <StatBox icon={<Clock className="text-amber-500" size={10} />} label="Active" value={stats.active} />
          <StatBox icon={<CheckCircle2 className="text-emerald-500" size={10} />} label="Received" value={stats.completed} />
          <StatBox 
            icon={<Wallet className="text-blue-500" size={10} />} 
            label="Total" 
            value={`${stats.totalSpend >= 1000 ? (stats.totalSpend / 1000).toFixed(1) + 'k' : stats.totalSpend}`} 
            suffix="SDG"
          />
        </div>

        {/* FEED */}
        <div className="space-y-4">
          {sortedOrders.map((order, idx) => {
            const isFirstDelivered = order.status === "Delivered" && sortedOrders[idx - 1]?.status !== "Delivered";
            return (
              <React.Fragment key={order.id}>
                {isFirstDelivered && (
                  <div className="flex items-center gap-4 py-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] shrink-0">Historical</span>
                    <div className="h-[1px] w-full bg-slate-200 dark:bg-white/5"></div>
                  </div>
                )}
                <div className={cn(
                  "transition-all duration-300",
                  order.status === "Delivered" ? "opacity-60 grayscale-[0.3]" : "opacity-100"
                )}>
                  <OrderList order={order} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// Small Helper Component for Stats
function StatBox({ icon, label, value, suffix }: { icon: React.ReactNode, label: string, value: string | number, suffix?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-2 border-r last:border-0 border-slate-100 dark:border-white/5">
      <div className="flex items-center gap-1.5 mb-1 opacity-60">
        {icon}
        <span className="text-[12px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
      </div>
      <p className="text-[12px] font-black text-slate-900 dark:text-white">
        {value} {suffix && <span className="text-[12px] opacity-40">{suffix}</span>}
      </p>
    </div>
  );
}