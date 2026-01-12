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
  MessageSquare,
} from "lucide-react";
import { OrderData } from "@/types/productsTypes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useSWR from "swr";
import { getDriver } from "@/services/driversServices";

const CompactOrderCard = ({ order }: { order: OrderData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: driver } = useSWR(
    order.driverId ? `driver-${order.driverId}` : null,
    () => getDriver(order.driverId!),
    { revalidateOnFocus: false, dedupingInterval: 60000 },
  );

  const statusConfig = useMemo(() => {
    switch (order.status) {
      case "Delivered":
        return {
          color: "text-success",
          bg: "bg-success/10",
          Icon: CheckCircle2,
          label: "Delivered",
        };
      case "Shipped":
        return {
          color: "text-info",
          bg: "bg-info/10",
          Icon: Truck,
          label: "On the way",
        };
      case "Processing":
        return {
          color: "text-warning",
          bg: "bg-warning/10",
          Icon: Package,
          label: "Processing",
        };
      case "Cancelled":
        return {
          color: "text-error",
          bg: "bg-error/10",
          Icon: XCircle,
          label: "Cancelled",
        };
      default:
        return {
          color: "text-muted-foreground",
          bg: "bg-muted",
          Icon: Clock,
          label: order.status,
        };
    }
  }, [order.status]);

  const totalCostNumeric = useMemo(
    () =>
      order.productsList.reduce(
        (acc, p) => acc + Number(p.p_cost) * (p.p_qu || 1),
        0,
      ),
    [order.productsList],
  );

  return (
    <div
      className={cn(
        "group w-full bg-card border border-border rounded transition-all duration-500 overflow-hidden",
        isOpen
          ? "shadow-xl ring-1 ring-primary/5"
          : "shadow-sm hover:border-primary/10",
      )}
    >
      {/* --- HEADER --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center",
              statusConfig.bg,
              statusConfig.color,
            )}
          >
            <statusConfig.Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-sm sm:text-base font-black text-foreground">
                #{order.id.slice(-6).toUpperCase()}
              </span>
              <span
                className={cn(
                  "text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider",
                  statusConfig.bg,
                  statusConfig.color,
                )}
              >
                {statusConfig.label}
              </span>
              {/* Mobile Price Tag */}
              <span className="sm:hidden text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {totalCostNumeric.toLocaleString()}{" "}
                <span className="text-[8px]">SDG</span>
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">
              Grand Total
            </p>
            <p className="text-lg font-black text-foreground">
              {totalCostNumeric.toLocaleString()}{" "}
              <span className="text-[10px] text-muted-foreground">SDG</span>
            </p>
          </div>

          <div
            className={cn(
              "w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground transition-all duration-500",
              isOpen &&
                "rotate-180 bg-primary text-primary-foreground shadow-lg",
            )}
          >
            <ChevronDown size={18} strokeWidth={3} />
          </div>
        </div>
      </button>

      {/* --- EXPANDED CONTENT --- */}
      <div
        className={cn(
          "border-t border-border transition-all duration-500 ease-in-out bg-muted/10",
          isOpen
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="p-4 sm:p-6 space-y-6">
          {driver && (
            <div className="flex items-center justify-between p-4 bg-card border border-primary/10 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-foreground">
                    {driver.name}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Courier assigned • {driver.vehicle}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${driver.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-muted text-foreground/70"
                >
                  <Phone size={16} />
                </a>
                <a
                  href={`https://wa.me/${driver.phone.replace(/\+/g, "")}`}
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-success text-success-foreground shadow-lg"
                >
                  <MessageSquare size={16} />
                </a>
              </div>
            </div>
          )}

          {/* --- DETAILED MANIFEST --- */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-3 ml-1">
              Order Manifest
            </h4>
            {order.productsList.map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <Link
                      href={`/products/${product.id}`}
                      className="text-xs font-black text-foreground hover:text-primary line-clamp-1"
                    >
                      {product.p_name}
                    </Link>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">
                      {product.p_qu} Unit{"s"} ×{" "}
                      {Number(product.p_cost).toLocaleString()} SDG
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-foreground text-xs">
                    {(
                      Number(product.p_cost) * (product.p_qu || 1)
                    ).toLocaleString()}
                  </span>
                  <p className="text-[8px] font-bold text-muted-foreground uppercase">
                    Total
                  </p>
                </div>
              </div>
            ))}

            {/* Expanded Footer Total */}
            <div className="mt-4 p-4 rounded-2xl bg-foreground text-background flex justify-between items-center shadow-inner">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Order Net Total
              </span>
              <span className="text-lg font-black tracking-tighter">
                {totalCostNumeric.toLocaleString()}{" "}
                <span className="text-[10px] opacity-60 uppercase">Sdg</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactOrderCard;
