"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { getOrdersWh, upOrder } from "@/services/ordersServices";
import { getDriverByEmail } from "@/services/driversServices";
import { 
   MapPin, Phone, Clock, 
  CheckCircle2, MessageSquare, Loader2, 
  User, ChevronRight,
  History,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function DriverTaskPage() {
  const { data: session, status: authStatus } = useSession();

  const [orderToConfirm, setOrderToConfirm] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: driver, isLoading: driverLoading } = useSWR(
    session?.user?.email ? `driver-email-${session.user.email}` : null, 
    () => getDriverByEmail(session?.user?.email as string),
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  const { data: orders, isLoading: ordersLoading, mutate: mutateOrders } = useSWR(
    driver?.id ? `driver-orders-${driver.id}` : null, 
    () => getOrdersWh([{ field: "driverId", op: "==", val: driver?.id as string }]),
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  const handleFinalHandover = async () => {
    if (!orderToConfirm) return;
    setIsSubmitting(true);
    try {
      await upOrder(orderToConfirm.id, { 
        status: "Delivered",
        deliveredAt: new Date().toISOString(),
        deleveratstamp: new Date()
      });
      toast.success("Handover Successful");
      setOrderToConfirm(null);
      mutateOrders();
    } catch (error) {
      toast.error("Transmission error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authStatus === "loading" || driverLoading || ordersLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#0a0c12]">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Ops...</p>
      </div>
    );
  }

  const activeOrders = orders?.filter(o => o.status !== "Delivered" && o.status !== "Cancelled") || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05070a] pb-20 transition-colors duration-500">
      
      {/* --- CONFIRMATION MODAL --- */}
      {orderToConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-[#0a0c12] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 animate-in slide-in-from-bottom-5 duration-300">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Handover To:</h3>
                <p className="text-xl font-black text-blue-600 dark:text-blue-400 uppercase leading-tight">
                  {orderToConfirm.customer_name || "Guest Client"}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">
                  ORDER ID: #{orderToConfirm.id.slice(-6).toUpperCase()}
                </p>
              </div>
              <div className="mt-8 space-y-2">
                <button
                  disabled={isSubmitting}
                  onClick={handleFinalHandover}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                  Confirm Handover
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={() => setOrderToConfirm(null)}
                  className="w-full py-3 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0c12]/80 backdrop-blur-md py-4 px-5 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <User size={20} />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                {driver?.name.split(' ')[0]} <span className="text-blue-600">Ops</span>
              </h1>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Unit Online
              </div>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
             <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{activeOrders.length} Tasks</span>
          </div>
             <Link href={"/driver/history" as any}>
             <History size={16} className="ml-2" />
             </Link>
          
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 space-y-8">
        {/* Active Assignments */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Assignments</h2>
          </div>
          {activeOrders.length === 0 ? (
            <div className="bg-white dark:bg-[#0a0c12] rounded-2xl p-10 text-center border border-slate-100 dark:border-white/5 shadow-sm">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">No Active Payloads</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Standing by for dispatch...</p>
            </div>
          ) : (
            activeOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-[#11141d] rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm transition-all hover:border-blue-500/30">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-md uppercase">
                      #{order.id.slice(-6)}
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1.5 tracking-widest">
                      <Clock size={10} /> Fast Track
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0"><User size={14}/></div>
                       <div className="min-w-0">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Receiver</p>
                         <p className="text-xs font-bold dark:text-white truncate">{order.customer_name || "Guest Client"}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-rose-500 shrink-0"><MapPin size={14}/></div>
                       <div className="min-w-0">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Coordinates</p>
                         <p className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate">
                            {order.shippingInfo ? `${order.shippingInfo.address}` : "Address Hidden"}
                         </p>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`tel:${order.shippingInfo?.phone}`} className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 text-center text-[10px] font-black uppercase text-slate-900 dark:text-white flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
                      <Phone size={12}/> Audio
                    </Link>
                    <Link href={`https://wa.me/${(order.shippingInfo?.phone || '').replace(/\D/g,'')}`} target="_blank" className="py-2.5 rounded-xl bg-emerald-600 text-white text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:bg-emerald-700 transition-all">
                      <MessageSquare size={12}/> Message
                    </Link>
                  </div>
                </div>

                <button
                  onClick={() => setOrderToConfirm(order)}
                  className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:bg-blue-700 transition-all"
                >
                  Finalize Handover <ChevronRight size={14} />
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}