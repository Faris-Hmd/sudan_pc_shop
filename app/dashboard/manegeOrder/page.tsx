"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  Loader2,
  Package,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getOrdersWh, upOrder, delOrder } from "@/services/ordersServices";

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

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    try {
      if (newStatus === "Delivered") {
        await upOrder(orderId, {
          status: newStatus,
          deliveredAt: new Date(Date.now()).toISOString(), // Set delivered date to now
          deleveratstamp: new Date(Date.now()),
        });
      } else if (newStatus === "Shipped") {
        await upOrder(orderId, {
          status: newStatus,
        });
      } else if (newStatus === "Cancelled" || newStatus === "Processing") {
        await upOrder(orderId, {
          status: newStatus,
        });
      }

      // Tell SWR to refresh data
      mutate("admin/orders");
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
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
 console.log(orders)
  return (
    <div className="max-w-6xl mx-auto p-2 md:p-8 space-y-2 pb-24">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
            Order Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Track, fulfill, and update customer shipments
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Added Link to Shipped Orders */}
          <Link
            href={`/dashboard/manegeOrder/shipped/${new Date().toISOString().slice(0, 7)}` as any}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-100 dark:border-blue-900/30"
          >
            <Package size={16} />
            <span>Delivered Orders</span>
          </Link>

          <button
            onClick={() => mutate("admin/orders")}
            className={cn(
              "p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition",
              isValidating && "animate-spin"
            )}
          >
            <RefreshCcw size={18} className="text-slate-400 dark:text-slate-500" />
          </button>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block" />
          <div className="text-right">
            <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Live Count
            </p>
            <p className="text-2xl font-black text-slate-800 dark:text-white leading-none">
              {orders?.length || 0}
            </p>
          </div>
        </div>
      </header>

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
                "bg-white dark:bg-slate-900 border rounded-3xl transition-all duration-300 overflow-hidden",
                isExpanded
                  ? "ring-2 ring-blue-500 dark:ring-blue-600 border-transparent shadow-xl dark:shadow-blue-900/10 scale-[1]"
                  : "border-slate-100 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900"
              )}
            >
              {/* Summary Row */}
              <div
                onClick={() => toggleOrder(order.id)}
                className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 justify-between w-full">
                  <div
                    className={cn(
                      "p-3 rounded-2xl transition-all",
                      isExpanded
                        ? "bg-blue-600 dark:bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                    )}
                  >
                    <Package size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-3">
                      <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md">
                        {totalItems} {totalItems === 1 ? "Item" : "Items"}
                      </span>
                      <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                        {order.totalAmount.toLocaleString()} <span className="text-[9px] uppercase">SDG</span>
                      </span>
                    </div>
                  </div>{" "}
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Status Picker */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleChangeStatus(order.id, e.target.value)
                        }
                        className={cn(
                          "text-[11px] font-black uppercase tracking-wider rounded-xl px-4 py-2 border appearance-none cursor-pointer outline-none transition-all",
                          order.status === "Delivered" &&
                            "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
                          order.status === "Processing" &&
                            "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
                          order.status === "Shipped" &&
                            "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
                          order.status === "Cancelled" &&
                            "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50"
                        )}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button
                      className=" text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                      onClick={() => {
                        toggleOrder(order.id);
                      }}
                    >
                      {isExpanded ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details Section */}
              <div
                className={cn(
                  "transition-all duration-500 ease-in-out bg-slate-50/50 dark:bg-slate-900/50",
                  isExpanded
                    ? "max-h-[2000px] border-t dark:border-slate-800 opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                )}
              >
                <div className="p-2 lg:p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800">
                          <th className="p-3 font-black text-[10px] uppercase tracking-widest px-2">Product</th>
                          <th className="p-3 font-black text-[10px] uppercase tracking-widest text-center">
                            Quantity
                          </th>
                          <th className="p-3 font-black text-[10px] uppercase tracking-widest text-right">Unit</th>
                          <th className="p-3 font-black text-[10px] uppercase tracking-widest text-right">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                        {order.productsList.map((p) => (
                          <tr
                            key={p.id}
                            className="group hover:bg-white dark:hover:bg-slate-800 transition-colors"
                          >
                            <td className="py-4 px-2 font-bold text-slate-800 dark:text-slate-200">
                              {p.p_name}
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                {p.p_cat}
                              </p>
                            </td>
                            <td className="py-4 text-center">
                              <span className="bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm px-3 py-1 rounded-lg font-black text-xs">
                                {p.p_qu}
                              </span>
                            </td>
                            <td className="py-4 text-right text-slate-500 dark:text-slate-400 font-bold text-xs">
                              {Number(p.p_cost).toLocaleString()}
                            </td>
                            <td className="py-4 text-right font-black text-slate-900 dark:text-white text-xs">
                              {(Number(p.p_cost) * Number(p.p_qu)).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Order Footer Info */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-2">
                       <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider">
                        ID: {order.id.slice(0, 16).toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 py-1.5 px-3 -ml-3 rounded-lg transition-colors w-fit flex items-center gap-1"
                      >
                         Delete Order
                      </button>
                    </div>
                    <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-8 shadow-lg shadow-blue-500/20">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                        Total Value
                      </span>
                      <span className="text-xl font-black">
                        {order.totalAmount.toLocaleString()} <span className="text-xs ml-1">SDG</span>
                      </span>
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
  );
}
