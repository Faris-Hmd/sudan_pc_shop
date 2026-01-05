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
  User, 
  Package, 
  Loader2,
  Filter
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

  const filteredOrders = orders?.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
      
      {/* --- HEADER --- */}
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
        
        {/* --- SEARCH BAR --- */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
          <input 
            type="text"
            placeholder="Search by ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-[#0d0f14] border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold focus:outline-none focus:border-blue-500/50 transition-all shadow-sm"
          />
        </div>

        {/* --- STATS SUMMARY --- */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-[#0d0f14] p-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Lifetime Tasks</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{orders?.length || 0}</p>
          </div>
          <div className="bg-white dark:bg-[#0d0f14] p-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Status</p>
            <p className="text-xl font-black text-emerald-500">100% OK</p>
          </div>
        </div>

        {/* --- HISTORY LIST --- */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Log</h2>
            <Filter size={14} className="text-slate-400" />
          </div>

          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center">
              <Package size={32} className="mx-auto text-slate-200 dark:text-slate-800 mb-2" />
              <p className="text-[10px] font-bold text-slate-400 uppercase">No records matching query</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white dark:bg-[#11141d] rounded-2xl p-4 border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter leading-none">
                        #{order.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">•</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Success</span>
                    </div>
                    <p className="text-xs font-black text-slate-900 dark:text-white truncate">
                      {order.customer_name}
                    </p>
                  </div>
                </div>
                
                <div className="text-right shrink-0">
                  <div className="flex items-center justify-end gap-1 text-slate-400 mb-1">
                    <Calendar size={10} />
                    <span className="text-[9px] font-bold uppercase tracking-tighter">
                      {new Date(order.deliveredAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    {new Date(order.deliveredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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