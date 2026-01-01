import { Timestamp } from "firebase/firestore";
import { Package, Calendar, CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import DateSelector from "@/components/DataPicker";
import { getOrdersWhOrdered } from "@/services/ordersServices";

export const revalidate = 20;

// Pre-render months of 2025 at build time
export async function generateStaticParams() {
  const months = Array.from(
    { length: 12 },
    (_, i) => `2025-${String(i + 1).padStart(2, "0")}`
  );
  return months.map((date) => ({
    date: date,
  }));
}

async function getMonthlyDeliveredOrders(dateStr: string) {
  const [year, month] = dateStr.split("-").map(Number);

  // Create start and end date objects
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  return await getOrdersWhOrdered([
    { field: "status", op: "==", val: "Delivered" },
    { field: "deleveratstamp", op: ">=", val: Timestamp.fromDate(startDate) },
    { field: "deleveratstamp", op: "<=", val: Timestamp.fromDate(endDate) },
  ]);
}

export default async function ShippedOrdersPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const orders = await getMonthlyDeliveredOrders(date);

  const [year, month] = date.split("-");
  const monthName = new Date(Number(year), Number(month) - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  // --- ADDED CALCULATIONS ---
  const totalOrderCount = orders.length;
  const totalSalesVolume = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <div className="w-full mx-auto p-2 lg:p-10 pb-32">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-8 flex flex-row flex-wrap justify-between items-center gap-6 transition-colors">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/manegeOrder"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-blue-600 dark:text-blue-400"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Shipped Orders
            </h1>
            <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5">
              History & Fulfillment
            </p>
          </div>
        </div>
        <DateSelector currentMonth={date} />
      </div>

      {/* --- SUMMARY STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10">
        <div className="bg-blue-600 dark:bg-blue-700 p-6 rounded-3xl shadow-lg shadow-blue-500/20 text-white">
          <p className="text-[10px] font-black uppercase opacity-80 tracking-widest mb-1">
            Monthly Revenue
          </p>
          <p className="text-3xl font-black">
            {totalSalesVolume.toLocaleString()} <span className="text-sm">SDG</span>
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm transition-colors">
          <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mb-1">
            Total Shipments
          </p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {totalOrderCount}{" "}
            <span className="text-sm font-bold text-slate-400 dark:text-slate-600">Orders</span>
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
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
                  <span>{order.deliveredAt}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl transition-colors">
            <Package size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-xs">
              No revenue recorded for {monthName}.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-16 text-center text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
        Instance: Dec 24, 2025 • Revalidating active channel 
      </footer>
    </div>
  );
}
