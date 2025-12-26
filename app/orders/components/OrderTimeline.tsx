"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Package, MapPin } from "lucide-react";

interface OrderMetricsProps {
  createdAt: string | Date;
  estimatedDate: string | Date;
  deliveredAt?: string | Date | null;
}

export default function OrderJourney({
  createdAt,
  estimatedDate,
  deliveredAt,
}: OrderMetricsProps) {
  const [now, setNow] = useState(Date.now());

  // Update time every minute for a "live" feel without over-rendering
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const start = new Date(createdAt).getTime();
  const est = new Date(estimatedDate).getTime();
  const end = deliveredAt ? new Date(deliveredAt).getTime() : est;
  const isDelivered = !!deliveredAt;

  // Calculation Logic
  const totalDurationMs = end - start;
  const remainingMs = Math.max(0, end - now);
  const elapsedMs = Math.min(now - start, totalDurationMs);
  const progressPercent = Math.max(
    0,
    Math.min(100, (elapsedMs / totalDurationMs) * 100)
  );

  /**
   * Precise Formatter:
   * Shows "2d 4h 30m" based on duration
   */
  const formatTimeFull = (ms: number) => {
    if (ms <= 0) return "Arriving";
    const totalMins = Math.floor(ms / 60000);
    const days = Math.floor(totalMins / 1440);
    const hours = Math.floor((totalMins % 1440) / 60);
    const mins = totalMins % 60;

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);
    return parts.join(" ");
  };

  /**
   * Formats the specific arrival time with H:MM
   */
  const formatArrival = (date: number) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-sm p-4 rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-100/50 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-400">
            {isDelivered ? "ORDER COMPLETE" : "IN TRANSIT"}
          </h4>
          <p className="text-base font-black text-slate-900 tabular-nums">
            {isDelivered ? "Delivered" : `${formatTimeFull(remainingMs)} to go`}
          </p>
        </div>
        <div
          className={`p-2 rounded-xl ${
            isDelivered
              ? "bg-emerald-50 text-emerald-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {isDelivered ? (
            <CheckCircle2 size={20} />
          ) : (
            <Clock size={20} className="animate-pulse" />
          )}
        </div>
      </div>

      {/* Modern High-Visibility Progress Bar */}
      <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${
            isDelivered
              ? "bg-emerald-500"
              : "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          }`}
          style={{ width: `${isDelivered ? 100 : progressPercent}%` }}
        />
      </div>

      {/* Info Grid: High Visibility for 2025 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2">
            <Package size={14} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Trip Time
            </span>
          </div>
          <span className="text-xs font-bold text-slate-700 tabular-nums">
            {formatTimeFull(totalDurationMs)}
          </span>
        </div>

        <div
          className={`flex items-center justify-between px-3 py-2 rounded-xl border ${
            isDelivered
              ? "bg-emerald-50/50 border-emerald-100"
              : "bg-indigo-50/50 border-indigo-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin
              size={14}
              className={isDelivered ? "text-emerald-500" : "text-indigo-500"}
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              {isDelivered ? "Arrived At" : "Expect At"}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-800 tracking-tight">
            {formatArrival(end)}
          </span>
        </div>
      </div>
    </div>
  );
}
