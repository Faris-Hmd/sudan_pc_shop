"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { getOrdersWh } from "@/services/ordersServices";
import { getDriverByEmail } from "@/services/driversServices";
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Package, 
  Loader2,
  Filter,
  ArrowDown,
  Banknote
} from "lucide-react";
import Link from "next/link";

export default function DriverHistoryPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: driver, isLoading: driverLoading } = useSWR(
    session?.user?.email ? `driver-email-${session.user.email}` : null, 
    () => getDriverByEmail(session?.user?.email as string)
  );

  const { data: orders, isLoading: ordersLoading } = useSWR(
    driver?.id ? `driver-history-${driver.id}` : null, 
    () => getOrdersWh([
      { field: "driverId", op: "==", val: driver?.id as string },
      { field: "status", op: "==", val: "Delivered" }
    ])
  );

  const processedOrders = React.useMemo(() => {
    if (!orders) return [];
    return orders
      .filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.deliveredAt).getTime() - new Date(a.deliveredAt).getTime());
  }, [orders, searchTerm]);

  if (driverLoading || ordersLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#0a0c12]">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Archives...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05070a] pb-10 transition-colors">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0c12]/80 backdrop-blur-md py-4 px-5 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <Link href={"/driver" as any} className="p-2 -ml-2 text-slate-400 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Mission <span className="text-blue-600">Archives</span>
          </h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 space-y-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search missions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-[#0d0f14] border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-[#0d0f14] p-4 rounded-2xl border border-slate-100 dark:border-white/5">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Delivered</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{orders?.length || 0}</p>
          </div>
          <div className="bg-white dark:bg-[#0d0f14] p-4 rounded-2xl border border-slate-100 dark:border-white/5">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
            <p className="text-xl font-black text-blue-600">
                {orders?.reduce((acc, curr) => acc + Number(curr.totalAmount || 0), 0).toLocaleString()}
                <span className="text-[8px] ml-1">SDG</span>
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
                <ArrowDown size={14} className="text-blue-600" />
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Log</h2>
            </div>
            <Filter size={14} className="text-slate-400" />
          </div>

          {processedOrders.length === 0 ? (
            <div className="py-20 text-center">
              <Package size={32} className="mx-auto text-slate-200 dark:text-slate-800 mb-2" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">No history records</p>
            </div>
          ) : (
            processedOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white dark:bg-[#11141d] rounded-2xl p-4 border border-slate-100 dark:border-white/5 shadow-sm space-y-3 active:scale-[0.98] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black text-blue-600 uppercase">
                          #{order.id.slice(-6).toUpperCase()}
                        </span>
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Delivered</span>
                      </div>
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {order.customer_name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-slate-400 mb-0.5">
                      <Calendar size={10} />
                      <span className="text-[9px] font-bold uppercase tracking-tighter">
                        {new Date(order.deliveredAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-[9px] font-black text-slate-500 uppercase">
                      {new Date(order.deliveredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* --- PRICE SECTION --- */}
                <div className="pt-3 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-slate-400">
                     <Banknote size={12} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Order Value</span>
                   </div>
                   <p className="text-sm font-black text-slate-900 dark:text-white">
                      {Number(order.totalAmount).toLocaleString()}
                      <span className="text-[9px] ml-1 text-slate-400 uppercase">Sdg</span>
                   </p>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}