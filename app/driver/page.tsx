"use client";

import React from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { getOrdersWh, upOrder } from "@/services/ordersServices";
import { getDriverByEmail } from "@/services/driversServices";
import { 
  Package, 
  MapPin, 
  Phone, 
  Truck, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  Loader2,
  Hash,
  AlertCircle,
  User
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function DriverTaskPage() {
  const { data: session, status: authStatus } = useSession();

  // Fetch driver info based on session email
  const { data: driver, isLoading: driverLoading } = useSWR(
    session?.user?.email ? `driver-email-${session.user.email}` : null, 
    () => getDriverByEmail(session?.user?.email as string),
    { revalidateOnFocus: false, dedupingInterval: 60000 ,revalidateOnReconnect: false}
  );

  // Fetch orders based on driver ID (once driver info is loaded)
  const { data: orders, isLoading: ordersLoading, mutate: mutateOrders } = useSWR(
    driver?.id ? `driver-orders-${driver.id}` : null, 
    () => getOrdersWh([{ field: "driverId", op: "==", val: driver?.id as string }]),
    { revalidateOnFocus: false, dedupingInterval: 60000 ,revalidateOnReconnect: false}
  );

  const handleCompleteOrder = async (orderId: string) => {
    try {
      await upOrder(orderId, { 
        status: "Delivered",
        deliveredAt: new Date().toISOString(),
        deleveratstamp: new Date()
      });
      toast.success("Delivery protocol finalized");
      mutateOrders();
    } catch (error) {
      toast.error("Transmission error");
    }
  };

  if (authStatus === "loading" || driverLoading || ordersLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-400 font-black animate-pulse uppercase tracking-[0.2em] text-[10px]">Syncing Operative Hub...</p>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-4">
        <AlertCircle size={48} className="text-rose-500" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Access Denied</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Please sign in with operative credentials.</p>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-4">
         <AlertCircle size={48} className="text-amber-500" />
         <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Identity Not Verified</h2>
         <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your email ({session?.user?.email}) is not registered as an active operative.</p>
      </div>
    );
  }

  const activeOrders = orders?.filter(o => o.status !== "Delivered" && o.status !== "Cancelled") || [];
  const completedOrders = orders?.filter(o => o.status === "Delivered") || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Operative Header */}
      <header className="bg-slate-900 dark:bg-blue-600 p-4 text-white shadow-xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Operative Online
            </div>
            <h1 className="text-3xl font-black tracking-tight">{driver.name}</h1>
            <p className="text-white/60 font-medium italic mt-1">{driver.vehicle}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/10">
            <Truck size={32} />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:p-8 mt-3 space-y-8">
        {/* Active Payload Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Active Payloads</h2>
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {activeOrders.length} Tasks
            </span>
          </div>

          {activeOrders.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="mx-auto text-emerald-500 mb-4" size={32} />
              <p className="font-bold text-slate-900 dark:text-white">All Payloads Delivered</p>
              <p className="text-xs text-slate-400 font-medium">Standing by for next dispatch.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-slate-900  rounded border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-blue-900/5">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <Hash size={10} />
                        {order.id.slice(-6).toUpperCase()}
                      </div>
                      <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={12} className="animate-pulse" />
                        Awaiting In-Person Transfer
                      </span>
                    </div>

                    <div className="space-y-4 py-4 border-y border-slate-50 dark:border-slate-800">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                            {order.customer_name || "Customer"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Drop-off Coordinate</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                            {order.shippingInfo ? (
                              <>
                                {order.shippingInfo.address}<br />
                                {order.shippingInfo.city}, {order.shippingInfo.zip}
                              </>
                            ) : (
                              order.deliveredAt || "Address not provided"
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                          <Package size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payload Items</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {order.productsList.length} Units • {order.totalAmount} SDG
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={`tel:${order.shippingInfo?.phone || order.customer_email}`} 
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        <Phone size={14} /> Call
                      </Link>
                      <Link
                        href={`https://wa.me/${(order.shippingInfo?.phone || order.customer_email || '').replace(/[^0-9]/g, '')}`} 
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all"
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </Link>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCompleteOrder(order.id)}
                    className="w-full py-5 bg-slate-900 dark:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:bg-blue-700"
                  >
                    Confirm Handover <CheckCircle2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* History Section */}
        {completedOrders.length > 0 && (
          <section className="space-y-4">
            <h2 className="px-4 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Completed Missions</h2>
            <div className="space-y-3">
              {completedOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between opacity-70">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={16} />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">#{order.id.slice(-6).toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Handed Over {new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
