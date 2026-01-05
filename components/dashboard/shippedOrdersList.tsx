"use client"

import { useState, useMemo } from "react"
import { Calendar, CheckCircle2, ArrowUpDown, Clock, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ShippedOrdersList({ orders }: { orders: any[] }) {
    const [sortBy, setSortBy] = useState<"date" | "price">("date");

    // Memoized sorting logic handling ISO Date Strings
    const sortedOrders = useMemo(() => {
        const list = [...orders];
        
        if (sortBy === "price") {
            return list.sort((a, b) => b.totalAmount - a.totalAmount);
        }

        // Default: Sort by ISO Date String (Newest first)
        return list.sort((a, b) => {
            // deliveredAt: "2025-12-31T22:20:07.756Z"
            const dateA = a.deliveredAt ? new Date(a.deliveredAt).getTime() : 0;
            const dateB = b.deliveredAt ? new Date(b.deliveredAt).getTime() : 0;
            return dateB - dateA; 
        });
    }, [orders, sortBy]);

    return (
        <div className="space-y-4">
            {/* Sort Control Bar */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                        <ArrowUpDown size={14} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Archive Filter
                    </span>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => setSortBy("date")}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all",
                            sortBy === "date" 
                                ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" 
                                : "text-slate-400 hover:text-slate-500"
                        )}
                    >
                        <Clock size={10} />
                        Recent
                    </button>
                    <button
                        onClick={() => setSortBy("price")}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all",
                            sortBy === "price" 
                                ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" 
                                : "text-slate-400 hover:text-slate-500"
                        )}
                    >
                        <DollarSign size={10} />
                        Value
                    </button>
                </div>
            </div>

            {/* Orders Feed */}
            <div className="grid gap-4">
                {sortedOrders.map((order: any) => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center justify-between group hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-default"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-2xl group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <CheckCircle2 size={22} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 dark:text-slate-100 leading-none mb-1 text-sm lg:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {order.customer_email}
                                </p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black tracking-tight uppercase">
                                    REF: {order.id.slice(0, 16).toUpperCase()}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1 transition-colors">
                                {order.totalAmount.toLocaleString()} <span className="text-[10px] text-slate-400">SDG</span>
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 font-black justify-end uppercase tracking-widest mt-1">
                                <Calendar size={12} />
                                <span>
                                    {/* Formats the ISO string to a readable date */}
                                    {new Date(order.deliveredAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}