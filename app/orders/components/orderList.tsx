"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  CheckCircle2,
  Clock,
  ChevronDown,
  Package,
  XCircle,
  User,
  Phone,
} from "lucide-react";
import { OrderData } from "@/types/productsTypes";

/**
 * Utility to calculate human-readable delivery duration from ISO strings.
 */
const getDeliveryDuration = (startStr: string, endStr?: string | any) => {
  if (!startStr || !endStr) return null;
  const start = new Date(startStr).getTime();
  const end = new Date(endStr).getTime();

  if (isNaN(start) || isNaN(end)) return null;

  const diffMs = end - start;
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
};

const CompactOrderCard = ({ order }: { order: OrderData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCancelled = order.status === "Cancelled";
  const isShipped = order.status === "Shipped";
  const isDelivered = order.status === "Delivered";

  const statusConfig = useMemo(() => {
    switch (order.status) {
      case "Delivered":
        return {
          color: "text-green-600",
          bg: "bg-green-100",
          Icon: CheckCircle2,
        };
      case "Shipped":
        return { color: "text-blue-600", bg: "bg-blue-100", Icon: Truck };
      case "Processing":
        return { color: "text-amber-600", bg: "bg-amber-100", Icon: Package };
      case "Cancelled":
        return { color: "text-red-600", bg: "bg-red-100", Icon: XCircle };
      default:
        return { color: "text-slate-600", bg: "bg-slate-100", Icon: Clock };
    }
  }, [order.status]);

  const deliveryDuration = useMemo(() => {
    if (!isDelivered) return null;
    return getDeliveryDuration(
      order.createdAt,
      order.deliveredAt || order.deleveratstamp
    );
  }, [order.status, order.createdAt, order.deliveredAt, order.deleveratstamp]);

  const totalCost = useMemo(
    () =>
      order.productsList
        .reduce((acc, p) => acc + Number(p.p_cost) * (p.p_qu || 1), 0)
        .toFixed(2),
    [order.productsList]
  );

  return (
    <div
      className={`w-full bg-white border-2 ${
        isCancelled ? "border-red-100" : "border-slate-100"
      } rounded-[1.5rem] shadow-sm overflow-hidden mb-3 transition-all active:scale-[0.99]`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3.5 rounded-2xl ${statusConfig.bg} ${statusConfig.color}`}
          >
            <statusConfig.Icon size={20} strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black text-slate-900 leading-tight tracking-tight">
              #{order.id.slice(-6).toUpperCase()}
            </h3>
            <p
              className={`text-[10px] font-bold uppercase tracking-widest ${statusConfig.color}`}
            >
              {order.status}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-base font-black text-slate-900 tracking-tighter">
            ${totalCost}
          </span>
          <div
            className={`p-1.5 rounded-full bg-slate-50 transition-transform ${
              isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
            }`}
          >
            <ChevronDown size={18} strokeWidth={3} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* DELIVERY TIME BADGE - Only shows if delivered */}
          {isDelivered && deliveryDuration && (
            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl flex justify-between items-center">
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">
                Total Delivery Time
              </span>
              <span className="text-sm font-black text-green-700">
                {deliveryDuration}
              </span>
            </div>
          )}

          {isShipped && (
            <div className="mb-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-blue-600 uppercase leading-none mb-0.5">
                    Courier
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    Alex Thompson
                  </p>
                </div>
              </div>
              <a
                href="tel:00000000"
                className="p-2 bg-white rounded-lg border border-blue-200 text-blue-600 active:bg-blue-600 active:text-white transition-colors"
              >
                <Phone size={16} />
              </a>
            </div>
          )}

          <div className="space-y-3 mb-4">
            {order.productsList.map((product, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <div className="flex flex-col">
                  <p
                    className={`text-sm font-bold ${
                      isCancelled
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                    }`}
                  >
                    {product.p_name}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {product.p_cat}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-xs font-black text-slate-400">
                    x{product.p_qu}
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    ${Number(product.p_cost).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-3 border-t border-slate-50">
            <span>
              Ordered: {new Date(order.createdAt).toLocaleDateString()}
            </span>
            {isDelivered && <span>Fulfilled</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactOrderCard;
