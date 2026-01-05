"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  Loader2,
  Package,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
  History,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getOrdersWh,  delOrder } from "@/services/ordersServices";

// --- Fetcher Logic ---
const fetchOrders = async () => {
  return getOrdersWh([{ field: "status", op: "!=", val: "Delivered" }]);
};

export default function ManageOrdersPage() {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );

  // SWR Hook for data fetching and caching
  const {
    data: orders,
    error,
    isLoading,
    isValidating,
  } = useSWR("admin/orders", fetchOrders, {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };



  const handleDelete = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return;
    }
    
    try {
      await delOrder(orderId);
      mutate("admin/orders");
      toast.success("Order deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  if (isLoading)
    return (
      <div className="h-[70vh] w-full flex flex-col justify-center items-center gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-500 font-medium">Loading store orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Error loading database.
      </div>
    );
    
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                Order Management
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Track, fulfill, and update customer shipments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/manegeOrder/shipped/${new Date().toISOString().slice(0, 7)}` as any}
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-100 dark:border-blue-900/30 whitespace-nowrap"
              >
                <History size={16} />
                <span className="hidden md:inline">Delivered Orders</span>
              </Link>
              <button
                onClick={() => mutate("admin/orders")}
                disabled={isValidating}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-xl transition-colors disabled:opacity-50"
                title="Refresh orders"
              >
                <RefreshCcw size={18} className={cn(isValidating && "animate-spin")} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Orders List */}
      <div className="grid gap-4">
        {orders?.map((order) => {
          const isExpanded = expandedOrders[order.id];
          const totalItems = order.productsList.reduce(
            (sum, p) => sum + (Number(p.p_qu) || 0),
            0
          );

          return (
     <div
  key={order.id}
  className={cn(
    "bg-white dark:bg-slate-900 border rounded-2xl transition-all duration-300 overflow-hidden mx-auto w-full",
    isExpanded
      ? "ring-1 ring-blue-500/50 border-transparent shadow-lg"
      : "border-slate-100 dark:border-slate-800 shadow-sm"
  )}
>
  {/* Summary Row */}
  <div
    onClick={() => toggleOrder(order.id)}
    className="p-3 sm:p-4 cursor-pointer select-none"
  >
    <div className="flex items-center gap-3">
      {/* Minified Icon */}
      <div
        className={cn(
          "p-2 rounded-xl transition-all shrink-0",
          isExpanded
            ? "bg-blue-600 text-white shadow-md"
            : "bg-slate-50 dark:bg-slate-800 text-slate-400"
        )}
      >
        <Package size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          {/* Status and Items */}
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[7px] font-black uppercase tracking-[0.1em] px-1 py-0.5 rounded border",
              order.status === "Delivered" 
                ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400"
            )}>
              {order.status || "Pending"}
            </span>
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">
              {totalItems} {totalItems === 1 ? "Unit" : "Units"}
            </span>
          </div>

          {/* Amount */}
          <p className="text-xs font-black text-slate-900 dark:text-white mt-0.5">
            {order.totalAmount.toLocaleString()} <span className="text-[8px] text-blue-600">SDG</span>
          </p>
        </div>
      </div>

      {/* --- MINIFIED VIEW BUTTON --- */}
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <Link
          href={`/dashboard/manegeOrder/${order.id}` as any}
          className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white transition-all border border-slate-200 dark:border-white/5"
        >
          View
        </Link>
        <button className="text-slate-300">
           {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  </div>

  {/* Expanded Details */}
  <div
    className={cn(
      "transition-all duration-300 ease-in-out bg-slate-50/50 dark:bg-slate-900/50",
      isExpanded ? "max-h-[2000px] border-t dark:border-slate-800 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
    )}
  >
    <div className="p-3 space-y-3">
      {/* Mobile-Friendly Product List */}
      <div className="space-y-1.5">
        {order.productsList.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-white/5 flex justify-between items-center">
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">{p.p_name}</p>
              <p className="text-[7px] text-slate-400 font-black uppercase tracking-widest">
                {p.p_qu} × {Number(p.p_cost).toLocaleString()}
              </p>
            </div>
            <p className="text-[10px] font-black text-slate-900 dark:text-white shrink-0">
              {(Number(p.p_cost) * Number(p.p_qu)).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Compact Total Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => handleDelete(order.id)}
          className="text-[8px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 px-1"
        >
          Delete
        </button>
        <div className="flex items-center gap-3">
            <span className="text-[8px] font-black text-slate-400 uppercase">Total:</span>
            <span className="text-xs font-black text-blue-600">{order.totalAmount.toLocaleString()} SDG</span>
        </div>
      </div>
    </div>
  </div>
</div>
          );
        })}
      </div>

      {orders?.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
          <Package size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-xs">
            No active orders found
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
