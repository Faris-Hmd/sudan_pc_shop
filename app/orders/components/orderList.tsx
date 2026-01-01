"use client";

import React, { useState, useMemo } from "react";
import {
  Truck,
  CheckCircle2,
  Clock,
  ChevronDown,
  Package,
  XCircle,
  Phone,
  User,
  ExternalLink,
} from "lucide-react";
import { OrderData } from "@/types/productsTypes";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CompactOrderCard = ({ order }: { order: OrderData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCancelled = order.status === "Cancelled";
  const isShipped = order.status === "Shipped";
  const isDelivered = order.status === "Delivered";

  const statusConfig = useMemo(() => {
    switch (order.status) {
      case "Delivered":
        return {
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          border: "border-emerald-100",
          Icon: CheckCircle2,
          label: "Delivered",
        };
      case "Shipped":
        return {
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-100",
          Icon: Truck,
          label: "On the way",
        };
      case "Processing":
        return {
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-100",
          Icon: Package,
          label: "Processing",
        };
      case "Cancelled":
        return {
          color: "text-rose-600",
          bg: "bg-rose-50",
          border: "border-rose-100",
          Icon: XCircle,
          label: "Cancelled",
        };
      default:
        return {
          color: "text-slate-600",
          bg: "bg-slate-50",
          border: "border-slate-100",
          Icon: Clock,
          label: order.status,
        };
    }
  }, [order.status]);

  const totalCost = useMemo(
    () =>
      order.productsList
        .reduce((acc, p) => acc + Number(p.p_cost) * (p.p_qu || 1), 0)
        .toFixed(2),
    [order.productsList]
  );

  return (
    <div
      className={cn(
        "group w-full bg-white border rounded-2xl transition-all duration-300 overflow-hidden",
        isOpen ? "shadow-md ring-1 ring-black/5" : "shadow-sm hover:shadow-md",
        statusConfig.border
      )}
    >
      {/* Header / Summary */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              statusConfig.bg,
              statusConfig.color
            )}
          >
            <statusConfig.Icon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-base font-bold text-slate-900">
                Order #{order.id.slice(-6).toUpperCase()}
               </span>
               <span className={cn("text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full", statusConfig.bg, statusConfig.color)}>
                  {statusConfig.label}
               </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-medium mb-0.5">Total Amount</p>
            <p className="text-lg font-black text-slate-900">${totalCost}</p>
          </div>
          
          <div className={cn(
              "w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-transform duration-300",
              isOpen && "rotate-180 bg-slate-100 text-slate-600"
          )}>
            <ChevronDown size={18} strokeWidth={2.5} />
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <div
        className={cn(
            "border-t border-slate-50 transition-all duration-300 ease-in-out bg-slate-50/50",
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-5 space-y-6">
            
            {/* Courier Info (Mock Data for Demo) */}
            {isShipped && (
                <div className="flex items-center justify-between p-4 bg-white border border-blue-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Alex Thompson</p>
                            <p className="text-xs text-slate-500">Your Courier</p>
                        </div>
                    </div>
                    <a href="tel:+" className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-blue-200 shadow-lg">
                        <Phone size={16} />
                    </a>
                </div>
            )}

            {/* Items List */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Order Items</h4>
                {order.productsList.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex-shrink-0" /> {/* Placeholder/Image */}
                            <div>
                                <Link href={`/products/${product.id}`} className="text-sm font-bold text-slate-800 hover:text-blue-600 line-clamp-1 transition-colors">
                                    {product.p_name}
                                </Link>
                                <p className="text-xs text-slate-500">{product.p_cat} • x{product.p_qu}</p>
                            </div>
                        </div>
                        <span className="font-bold text-slate-900 text-sm">
                            ${(Number(product.p_cost) * (product.p_qu || 1)).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end pt-2">
                <Link 
                    href={`/orders/${order.id}` as any}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                >
                    View Invoice <ExternalLink size={12} />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompactOrderCard;
