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
} from "lucide-react";

// Compact Action Card
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
    className="group p-4 md:p-6 rounded-xl border bg-white hover:border-blue-500 hover:shadow-md transition-all active:scale-95"
  >
    <div className="flex flex-col gap-3">
      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-sm md:text-base text-gray-900 group-hover:text-blue-600 line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1 md:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview of store performance and management tools
          </p>
        </header>

      {/* Stats Section - Scrollable/Grid compact */}
      <section className="p-4 py-1 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
        {[
          {
            label: "Revenue",
            val: "$12.3k",
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
          },
          {
            label: "Orders",
            val: "42",
            icon: Clock,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Low Stock",
            val: "7",
            icon: AlertCircle,
            color: "text-rose-500",
            bg: "bg-rose-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-3 md:p-6 bg-white rounded-xl border shadow-sm flex items-center gap-3"
          >
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-lg md:text-2xl font-bold text-slate-900">
                {stat.val}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Main Grid - 2 columns on mobile */}
      <section className="grid grid-cols-2 p-4 py-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        <ActionCard
          href="/dashboard/analatic/2026-01"
          title="Analytics"
          description="Sales & traffic"
          Icon={BarChart3}
        />
        <ActionCard
          href="/dashboard/manegeOrder"
          title="Orders"
          description="Fulfillment"
          Icon={Package}
        />
        <ActionCard
          href="/dashboard/productsSet"
          title="Inventory"
          description="Catalog"
          Icon={ShoppingBag}
        />
        <ActionCard
          href="/dashboard/productsSet/prod_add"
          title="Add New"
          description="Create item"
          Icon={PlusCircle}
        />
        <ActionCard
          href="/dashboard/manegeOrder/shipped/2026-01"
          title="Logs"
          description="History"
          Icon={ClipboardList}
        />
        <ActionCard
          href="/profile"
          title="Settings"
          description="Account"
          Icon={Settings}
        />
      </section>
      </div>
    </div>
  );
}
