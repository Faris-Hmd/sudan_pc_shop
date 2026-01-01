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
  const isShipped = order.status === "Shipped";

  const statusConfig = useMemo(() => {
    switch (order.status) {
      case "Delivered":
        return {
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
          border: "border-emerald-100 dark:border-emerald-900/40",
          Icon: CheckCircle2,
          label: "Delivered",
        };
      case "Shipped":
        return {
          color: "text-blue-600 dark:text-blue-400",
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-100 dark:border-blue-900/40",
          Icon: Truck,
          label: "On the way",
        };
      case "Processing":
        return {
          color: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-50 dark:bg-amber-900/20",
          border: "border-amber-100 dark:border-amber-900/40",
          Icon: Package,
          label: "Processing",
        };
      case "Cancelled":
        return {
          color: "text-rose-600 dark:text-rose-400",
          bg: "bg-rose-50 dark:bg-rose-900/20",
          border: "border-rose-100 dark:border-rose-900/40",
          Icon: XCircle,
          label: "Cancelled",
        };
      default:
        return {
          color: "text-slate-600 dark:text-slate-400",
          bg: "bg-slate-50 dark:bg-slate-800",
          border: "border-slate-100 dark:border-slate-700",
          Icon: Clock,
          label: order.status,
        };
    }
  }, [order.status]);

  const totalCost = useMemo(
    () =>
      order.productsList
        .reduce((acc, p) => acc + Number(p.p_cost) * (p.p_qu || 1), 0)
        .toLocaleString(),
    [order.productsList]
  );

  return (
    <div
      className={cn(
        "group w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl transition-all duration-500 overflow-hidden",
        isOpen ? "shadow-xl shadow-slate-200/60 dark:shadow-none ring-1 ring-blue-500/5 dark:ring-blue-600/20" : "shadow-sm hover:shadow-md dark:hover:shadow-none hover:border-blue-100 dark:hover:border-blue-900",
      )}
    >
      {/* Header / Summary */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
              statusConfig.bg,
              statusConfig.color
            )}
          >
            <statusConfig.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
               <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white transition-colors">
                Order #{order.id.slice(-6).toUpperCase()}
               </span>
               <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider transition-colors", statusConfig.bg, statusConfig.color)}>
                  {statusConfig.label}
               </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight">
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-0.5">Total</p>
            <p className="text-lg font-black text-slate-900 dark:text-white transition-colors">
              {totalCost} <span className="text-[10px] text-slate-400 dark:text-slate-500">SDG</span>
            </p>
          </div>
          
          <div className={cn(
              "w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 transition-all duration-500",
              isOpen && "rotate-180 bg-blue-600 dark:bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
          )}>
            <ChevronDown size={18} strokeWidth={3} />
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <div
        className={cn(
            "border-t border-slate-50 dark:border-slate-800 transition-all duration-500 ease-in-out bg-slate-50/30 dark:bg-slate-800/10",
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="p-4 sm:p-6 space-y-6">
            
            {/* Courier Info (Mock Data for Demo) */}
            {isShipped && (
                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-blue-50 dark:border-blue-900/30 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-900 dark:text-white">Alex Thompson</p>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Assigned Courier</p>
                        </div>
                    </div>
                    <a href="tel:+" className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-slate-900 dark:hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-90">
                        <Phone size={16} />
                    </a>
                </div>
            )}

            {/* Items List */}
            <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-3 ml-1">Order Manifest</h4>
                {order.productsList.map((product, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800/50 rounded-2xl hover:border-blue-100 dark:hover:border-blue-900 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                               <img 
                                 src={product.p_imgs?.[0]?.url || "/placeholder.png"} 
                                 alt={product.p_name}
                                 className="w-full h-full object-cover"
                               />
                            </div>
                            <div>
                                <Link href={`/products/${product.id}`} className="text-xs font-black text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1 transition-colors">
                                    {product.p_name}
                                </Link>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                                  {product.p_cat} • x{product.p_qu}
                                </p>
                            </div>
                        </div>
                        <span className="font-black text-slate-900 dark:text-white text-xs transition-colors">
                            {(Number(product.p_cost) * (product.p_qu || 1)).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end pt-2">
                <Link 
                    href={`/orders/${order.id}` as any}
                    className="group/link text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 hover:text-slate-900 dark:hover:text-white tracking-widest flex items-center gap-1.5 transition-colors"
                >
                    Official Invoice <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompactOrderCard;
