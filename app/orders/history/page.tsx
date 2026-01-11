"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import OrderList from "../components/orderList";
import { useSession } from "next-auth/react";
import { ArrowLeft, Loader2, PackageSearch } from "lucide-react";
import Link from "next/link";
import { OrderData } from "@/types/productsTypes";
import { getOrdersWh } from "@/services/ordersServices";

export default function HistoryPage() {
  const { data: session, status } = useSession();

  const { data: orders, isLoading } = useSWR<OrderData[]>(
    session?.user?.email ? `history-orders/${session.user.email}` : null,
    () =>
      getOrdersWh([
        { field: "customer_email", op: "==", val: session?.user?.email },
        { field: "status", op: "==", val: "Delivered" },
      ]),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 30000,
    },
  );

  // --- CALCULATE STATISTICS ---
  const stats = useMemo(() => {
    if (!orders) return { totalSpend: 0, totalItems: 0, count: 0 };
    return orders.reduce(
      (acc, order) => {
        const itemsCount =
          order.productsList?.reduce((sum, p) => sum + Number(p.p_qu), 0) || 0;
        return {
          totalSpend: acc.totalSpend + (order.totalAmount || 0),
          totalItems: acc.totalItems + itemsCount,
          count: acc.count + 1,
        };
      },
      { totalSpend: 0, totalItems: 0, count: 0 },
    );
  }, [orders]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Loading Archives...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={"/orders" as any}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Mission <span className="text-emerald-500">History</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {/* --- COMPACT MINIFIED STATS BAR --- */}
            <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl shadow-sm">
              <div className="flex flex-col items-center justify-center py-1 border-r border-slate-100 dark:border-slate-800">
                <span className="text-[12px] font-black text-slate-400 uppercase tracking-tighter">
                  Spend
                </span>
                <p className="text-xs font-black text-slate-900 dark:text-white">
                  {Math.round(stats.totalSpend / 1000)}k{" "}
                  <span className="text-[7px] text-blue-500">SDG</span>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-1 border-r border-slate-100 dark:border-slate-800">
                <span className="text-[12px] font-black text-slate-400 uppercase tracking-tighter">
                  Units
                </span>
                <p className="text-xs font-black text-slate-900 dark:text-white">
                  {stats.totalItems}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center py-1">
                <span className="text-[12px] font-black text-slate-400 uppercase tracking-tighter">
                  Orders
                </span>
                <p className="text-xs font-black text-slate-900 dark:text-white">
                  {stats.count}
                </p>
              </div>
            </div>

            {/* List Header */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Deployment Log
              </h2>
              <span className="text-[12px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                {stats.count} Total
              </span>
            </div>

            {/* History List */}
            <div className="grid gap-4">
              {orders.map((order) => (
                <OrderList key={order.id} order={order} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 md:p-20 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
              <PackageSearch className="w-8 h-8 text-slate-300 " />
            </div>
            <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tighter">
              No History Found
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-[12px] font-bold uppercase tracking-widest mt-2">
              You haven't received any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
