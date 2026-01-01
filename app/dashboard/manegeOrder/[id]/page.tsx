"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { getOrder, upOrder } from "@/services/ordersServices";
import { getDrivers } from "@/services/driversServices";
import { 
  ChevronLeft, 
  Package, 
  User, 
  MapPin, 
  Phone, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Hash,
  ShoppingBag,
  Loader2,
  Calendar,
  Mail,
  MessageSquare,
  Edit3,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = useState(false);

  const { data: order, isLoading: orderLoading, mutate: mutateOrder } = useSWR(id ? `order-${id}` : null, () => getOrder(id as string));
  const { data: drivers, isLoading: driversLoading } = useSWR("drivers", getDrivers);

  const statusConfig = {
    Processing: {
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-900/40",
      icon: Clock,
      label: "Processing"
    },
    Shipped: {
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-900/40",
      icon: Truck,
      label: "Shipped"
    },
    Delivered: {
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-900/40",
      icon: CheckCircle2,
      label: "Delivered"
    },
    Cancelled: {
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-rose-200 dark:border-rose-900/40",
      icon: AlertCircle,
      label: "Cancelled"
    }
  };

  const handleUpdateStatus = async (status: any) => {
    setUpdating(true);
    try {
      await upOrder(id as string, { status });
      toast.success(`Status updated to ${status}`);
      mutateOrder();
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignDriver = async (driverId: string) => {
    setUpdating(true);
    try {
      await upOrder(id as string, { driverId });
      toast.success("Driver assigned successfully");
      mutateOrder();
    } catch (error) {
      toast.error("Failed to assign driver");
    } finally {
      setUpdating(false);
    }
  };

  if (orderLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-400 font-black animate-pulse uppercase tracking-[0.2em] text-[10px]">Loading Order Details...</p>
      </div>
    );
  }

  if (!order) {
    return <div className="p-20 text-center font-black text-rose-500 uppercase tracking-widest">Order Not Found</div>;
  }

  const assignedDriver = drivers?.find(d => d.id === order.driverId);
  const currentStatus = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-400"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                <Hash size={10} />
                Order #{order.id.slice(-6).toUpperCase()}
              </div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                Order Details
              </h1>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${currentStatus.bg} ${currentStatus.color} border ${currentStatus.border}`}>
              <StatusIcon size={16} className={order.status === "Processing" ? "animate-pulse" : ""} />
              <span className="text-xs font-black uppercase tracking-wider">{currentStatus.label}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Order Items</h2>
                  <span className="ml-auto text-xs font-bold text-slate-400">{order.productsList.length} items</span>
                </div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {order.productsList.map((product, idx) => (
                  <div key={idx} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      {/* <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                        <Package size={24} className="text-blue-600 dark:text-blue-400" />
                      </div> */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{product.p_name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">{product.p_cat}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-900 dark:text-white">{product.p_cost} SDG</p>
                        <p className="text-xs text-slate-400 font-medium">Qty: {product.p_qu || 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Total Amount</span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{order.totalAmount} SDG</span>
                </div>
              </div>
            </section>

            {/* Customer Information */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                onClick={() => setIsCustomerInfoOpen(!isCustomerInfoOpen)}
                className="w-full p-6 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Customer Information</h2>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-slate-400 transition-transform duration-300 ${isCustomerInfoOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              <div className={`transition-all duration-300 ease-in-out ${isCustomerInfoOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Name</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customer_name || "Not provided"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customer_email || "Not provided"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{order.shippingInfo?.phone || "Not provided"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Date</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {order.shippingInfo && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Address</p>
                      <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <MapPin size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          <p>{order.shippingInfo.address}</p>
                          <p>{order.shippingInfo.city}, {order.shippingInfo.zip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Status Control */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Update Status</h2>
              </div>
              <div className="p-6 space-y-3">
                {["Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleUpdateStatus(status)}
                    disabled={updating || order.status === status}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      order.status === status
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </section>

            {/* Driver Assignment */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Assign Driver</h2>
              </div>
              <div className="p-6 space-y-4">
                {assignedDriver && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-900/40">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Truck size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{assignedDriver.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{assignedDriver.vehicle}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${assignedDriver.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Phone size={14} /> Call
                      </a>
                      <a
                        href={`https://wa.me/${assignedDriver.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 rounded-lg text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </a>
                    </div>
                  </div>
                )}
                {driversLoading ? (
                  <Loader2 className="animate-spin mx-auto text-slate-400" size={24} />
                ) : (
                  <select
                    value={order.driverId || ""}
                    onChange={(e) => handleAssignDriver(e.target.value)}
                    disabled={updating}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="">Select Driver</option>
                    {drivers?.filter(d => d.status === "Active").map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} ({driver.vehicle})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
