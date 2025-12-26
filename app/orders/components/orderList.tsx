"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  AlertCircle,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { OrderData } from "@/types/productsTypes";

const OrderList = ({ orders }: { orders: OrderData[] }) => {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const formatMsFull = (ms: number) => {
    if (ms <= 0) return "0m";
    const totalMins = Math.floor(ms / 60000);
    const days = Math.floor(totalMins / 1440);
    const hours = Math.floor((totalMins % 1440) / 60);
    const mins = totalMins % 60;
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);
    return parts.slice(0, 2).join(" ");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-full pb-24 px-4">
      {orders.map((order) => {
        const isExpanded = expandedOrders[order.orderId];
        const status = order.status?.toLowerCase() || "processing";

        // 1. Status Guards
        const isCancelled = status === "cancelled";
        const isProcessing = status === "processing";
        const isDelivered = status === "delivered" || !!order.deliveredAt;

        // 2. Date Logic (Handling nulls for Processing/Cancelled)
        const start = new Date(order.createdAt).getTime();
        const est = order.estimatedDate
          ? new Date(order.estimatedDate).getTime()
          : null;
        const deliveredAt = order.deliveredAt
          ? new Date(order.deliveredAt).getTime()
          : null;

        const end = deliveredAt || est;
        const isLate =
          !isDelivered && !isCancelled && !isProcessing && est && now > est;

        // 3. Progress Calculation
        let progressPercent = 0;
        if (isDelivered) progressPercent = 100;
        else if (isCancelled) progressPercent = 0;
        else if (isProcessing) progressPercent = 10; // Initial bump
        else if (start && end) {
          const totalDurationMs = end - start;
          const elapsedMs = Math.min(now - start, totalDurationMs);
          progressPercent = Math.max(
            0,
            Math.min(100, (elapsedMs / totalDurationMs) * 100)
          );
        }

        const totalOrderCost = order.productsList.reduce(
          (sum, item) => sum + item.p_cost,
          0
        );

        return (
          <div
            key={order.orderId}
            className={`bg-white rounded-[2rem] border transition-all duration-500 ${
              isExpanded
                ? "shadow-2xl ring-1 ring-slate-200"
                : "shadow-sm border-slate-100"
            }`}
          >
            <div
              onClick={() => toggleOrder(order.orderId)}
              className="p-6 cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Summary */}
                <div className="flex flex-col justify-between min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-2xl ${
                        isCancelled
                          ? "bg-red-50 text-red-600"
                          : isLate
                          ? "bg-amber-100 text-amber-600"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {isCancelled ? (
                        <XCircle size={22} />
                      ) : (
                        <Package size={22} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-tight">
                        Order #{order.orderId.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        ${totalOrderCost.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {isLate && (
                    <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full w-fit">
                      <AlertCircle size={14} className="animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">
                        Delayed
                      </span>
                    </div>
                  )}
                </div>

                {/* Center: Journey Bar */}
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        Status Update
                      </span>
                      <p
                        className={`text-sm font-black tabular-nums ${
                          isCancelled
                            ? "text-red-600"
                            : isProcessing
                            ? "text-indigo-500"
                            : "text-slate-700"
                        }`}
                      >
                        {isCancelled
                          ? "Order Cancelled"
                          : isProcessing
                          ? "Preparing your package..."
                          : isDelivered
                          ? `Took ${formatMsFull(deliveredAt! - start)}`
                          : est
                          ? `${formatMsFull(est - now)} remaining`
                          : "Processing"}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase ${
                        isCancelled
                          ? "bg-red-50 text-red-600"
                          : isDelivered
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full transition-all duration-1000 ease-in-out ${
                        isCancelled
                          ? "bg-red-400"
                          : isDelivered
                          ? "bg-emerald-500"
                          : isLate
                          ? "bg-amber-500"
                          : "bg-indigo-500"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {/* Created Time: Shows Date + Hour/Min */}
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-md">
                      <Clock size={12} className="text-slate-400" />
                      <span>
                        {new Date(start).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        <span className="mx-1 text-slate-300">•</span>
                        <span className="text-slate-600">
                          {new Date(start).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </span>
                    </div>

                    {/* Arrival Time: Shows Date + Hour/Min (Only if date exists) */}
                    {end && (
                      <div
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md ${
                          isDelivered
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        <MapPin size={12} />
                        <span>
                          {new Date(end).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          <span className="mx-1 opacity-40">•</span>
                          <span className="font-black">
                            {new Date(end).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center lg:pl-4 border-t lg:border-t-0 pt-4 lg:pt-0">
                  {isExpanded ? (
                    <ChevronUp className="text-slate-300" />
                  ) : (
                    <ChevronDown className="text-slate-300" />
                  )}
                </div>
              </div>
            </div>

            {/* EXPANDED RECEIPT (Unchanged logic) */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isExpanded
                  ? "max-h-[2000px] border-t border-slate-50"
                  : "max-h-0"
              }`}
            >
              <div className="p-8 bg-slate-50/50 rounded-b-[2rem]">
                {/* ... same receipt content as before ... */}
                <div className="space-y-3">
                  {order.productsList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xs font-black text-slate-400">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">
                            {item.p_name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            {item.p_cat} • Qty {item.p_qu}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-slate-800">
                        ${item.p_cost.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
