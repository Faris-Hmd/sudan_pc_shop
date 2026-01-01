import React from "react";
import Link from "next/link";
import {
  BarChart3,
  Package,
  ShoppingBag,
  PlusCircle,
  ClipboardList,
  Settings,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

const ActionCard = ({
  href,
  title,
  description,
  Icon,
}: {
  href: string;
  title: string;
  description: string;
  Icon: any;
}) => (
  <Link
    href={href as any}
    className="group relative p-5 md:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] dark:hover:shadow-none transition-all duration-300 active:scale-[0.98]"
  >
    <div className="flex flex-col gap-4">
      <div className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 dark:group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tight">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default function DashboardPage() {
  const currentMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-01"

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">
              Manage your store's operations and track performance metrics.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3 transition-colors">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">System Live</span>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-3 gap-3 md:gap-6">
          {[
            {
              label: "Revenue",
              val: "12,450 SDG",
              trend: "+12.5%",
              icon: TrendingUp,
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-50 dark:bg-emerald-900/20",
            },
            {
              label: "Active",
              val: "48 Orders",
              trend: "Process",
              icon: Clock,
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              label: "Alerts",
              val: "04 Low",
              trend: "Restock",
              icon: AlertCircle,
              color: "text-amber-600 dark:text-amber-400",
              bg: "bg-amber-50 dark:bg-amber-900/20",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 md:p-6 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all group"
            >
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <div className={`p-1.5 md:p-3 rounded-lg md:rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                </div>
                <span className={`hidden xs:inline-block text-[8px] md:text-[10px] font-black uppercase tracking-tight px-1.5 py-0.5 md:px-2 md:py-1 rounded-full ${stat.bg} ${stat.color}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[8px] md:text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5 md:mb-1">
                  {stat.label}
                </p>
                <p className="text-xs sm:text-base md:text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors truncate">
                  {stat.val}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Main Controls Header */}
        <div className="flex items-center gap-4">
           <div className="h-px grow bg-slate-200 dark:bg-slate-800" />
           <h2 className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Management Console</h2>
           <div className="h-px grow bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Action Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <ActionCard
            href={`/dashboard/analatic/${currentMonth}`}
            title="Analytics"
            description="Deep performance insights"
            Icon={BarChart3}
          />
          <ActionCard
            href="/dashboard/manegeOrder"
            title="Fulfillment"
            description="Manage active orders"
            Icon={Package}
          />
          <ActionCard
            href="/dashboard/productsSet"
            title="Inventory"
            description="Update store catalog"
            Icon={ShoppingBag}
          />
          <ActionCard
            href="/dashboard/productsSet/prod_add"
            title="Create Product"
            description="Add items to store"
            Icon={PlusCircle}
          />
          <ActionCard
            href={`/dashboard/manegeOrder/shipped/${currentMonth}`}
            title="Order Logs"
            description="Review delivery history"
            Icon={ClipboardList}
          />
          <ActionCard
            href="/profile"
            title="Settings"
            description="System configurations"
            Icon={Settings}
          />
        </section>
      </div>
    </div>
  );
}
