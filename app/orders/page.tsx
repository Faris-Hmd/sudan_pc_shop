"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import {
  Clock,
  CheckCircle2,
  Wallet,
  HistoryIcon,
  PackageOpen,
  ArrowRight,
} from "lucide-react";
import OrderList from "./components/orderList";
import { OrderData } from "@/types/productsTypes";
import { cn } from "@/lib/utils";
import { getOrdersWh, getUserOrdersStats } from "@/services/ordersServices";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function OrdersPage() {
  const { data: session, status } = useSession();

  const { data: statsData } = useSWR<{ count: number; totalSpend: number }>(
    session?.user?.email ? `customer-orders-stats/${session.user.email}` : null,
    () => getUserOrdersStats(session?.user?.email as string),
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      dedupingInterval: 20000,
    },
  );

  const { data: ordersData, isLoading } = useSWR<OrderData[]>(
    session?.user?.email ? `customer-all-orders/${session.user.email}` : null,
    () =>
      getOrdersWh([
        { field: "customer_email", op: "==", val: session?.user?.email },
        { field: "status", op: "!=", val: "Delivered" },
      ]),
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      revalidateIfStale: true,
    },
  );

  const { stats } = useMemo(() => {
    if (!statsData)
      return {
        stats: { active: 0, completed: 0, totalSpend: 0 },
      };

    const activeOrders = ordersData?.length || 0;
    const completedOrders = statsData.count - activeOrders;
    const totalSpend = statsData.totalSpend;

    return {
      stats: { active: activeOrders, completed: completedOrders, totalSpend },
    };
  }, [statsData, ordersData]);

  if (status === "loading" || isLoading) {
    return <Loading size="lg" text="Syncing Orders..." />;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="page-header">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-foreground uppercase tracking-tighter">
            My <span className="text-primary">Orders</span>
          </h1>

          <Link
            href="/orders/history"
            className="flex items-center justify-center gap-2 bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition-all duration-300 group"
          >
            <HistoryIcon
              size={16}
              className="text-primary group-hover:scale-110 transition-transform"
            />
            <span className="text-[11px] font-black uppercase tracking-tight text-primary hidden md:block">
              Previous Orders
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* COMPACT STATS */}
        <div className="grid grid-cols-3 gap-2 bg-card pb-0 border pt-2 rounded-2xl shadow-sm">
          <StatBox
            icon={<Clock className="text-warning" size={10} />}
            label="Active"
            value={stats.active}
          />
          <StatBox
            icon={<CheckCircle2 className="text-success" size={10} />}
            label="Received"
            value={stats.completed}
          />
          <StatBox
            icon={<Wallet className="text-primary" size={10} />}
            label="Total"
            value={`${stats.totalSpend >= 1000 ? (stats.totalSpend / 1000).toFixed(1) + "k" : stats.totalSpend}`}
            suffix="SDG"
          />
        </div>

        {/* FEED / EMPTY STATE */}
        <div className="space-y-4 pt-4">
          {ordersData && ordersData.length > 0 ? (
            ordersData.map((order, idx) => (
              <div
                key={order.id}
                className={cn(
                  "transition-all duration-300",
                  order.status === "Delivered"
                    ? "opacity-60 grayscale-[0.3]"
                    : "opacity-100",
                )}
              >
                <OrderList order={order} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 sm:px-6 bg-card rounded-[2.5rem] border border-dashed border-border text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <PackageOpen size={32} className="text-primary/40" />
              </div>
              <h3 className="text-lg font-black text-foreground uppercase tracking-tighter">
                No Active Missions
              </h3>
              <p className="text-xs text-muted-foreground max-w-[200px] mt-1 leading-relaxed">
                You don&apos;t have any orders in transit right now.
              </p>

              <Link
                href="/orders/history"
                className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-80 transition-opacity group"
              >
                View History{" "}
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Small Helper Component for Stats
function StatBox({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center  gap-1.5 mb-1 opacity-60">
        {icon}
        <span className="text-[12px] font-black text-muted-foreground uppercase tracking-tighter">
          {label}
        </span>
      </div>
      <p className="text-[12px] font-black text-foreground">
        {value}{" "}
        {suffix && <span className="text-[12px] opacity-40">{suffix}</span>}
      </p>
    </div>
  );
}
