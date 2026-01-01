"use client";

import React from "react";
import useSWR from "swr";
import { getDrivers, delDriver } from "@/services/driversServices";
import { 
  Users, 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  Phone, 
  Truck, 
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function DriversPage() {
  const { data: drivers, isLoading, mutate } = useSWR("drivers", getDrivers);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to decommission this driver?")) return;
    
    try {
      const res = await delDriver(id);
      if (res.success) {
        toast.success("Driver removed");
        mutate();
      } else {
        toast.error(res.error || "Failed to remove driver");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                Fleet Management
              </h1>
              <p className="hidden md:block text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Manage your delivery personnel and logistics network.
              </p>
            </div>
            <Link
              href={"/dashboard/drivers/add" as any}
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-xs md:text-sm uppercase tracking-wider whitespace-nowrap"
            >
              <Plus size={18} /> Add Driver
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-blue-600" size={40} />
          <p className="text-slate-400 font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Scanning Fleet...</p>
        </div>
      ) : !drivers || drivers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="text-slate-300 dark:text-slate-600" size={32} />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Active Drivers</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium">
            Your logistics network is currently empty. Add your first driver to begin fulfillment operations.
          </p>
          <Link
            href={"/dashboard/drivers/add" as any}
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold transition-all active:scale-95"
          >
            Deploy New Driver
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in-slide">
          {drivers.map((driver) => (
            <div 
              key={driver.id}
              className="relative group bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6  absolute top-5 right-5 ">
             
                <div className="flex gap-2 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/dashboard/drivers/${driver.id}/edit` as any}
                    className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(driver.id)}
                    className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                     <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Truck size={24} />
                </div>  {driver.name} <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{driver.vehicle}</span>
                 
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      driver.status === "Active" 
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500" 
                        : "bg-slate-50 dark:bg-slate-800 text-slate-400"
                    }`}>
                      {driver.status}
                    </span>
                  </h3>
                    </div>


                <div className="pt-4 border-t border-slate-50 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <Phone size={14} className="text-slate-300" />
                    {driver.phone}
                  </div>
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                    <span>Active Tasks</span>
                    <span className="text-blue-600 dark:text-blue-400">{driver.currentOrders?.length || 0} Orders</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
