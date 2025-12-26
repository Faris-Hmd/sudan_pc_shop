import { db } from "@/db/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { Package, Calendar, CheckCircle2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import DateSelector from "@/components/DataPicker";

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

  const ordersCol = collection(db, "orders");
  const q = query(
    ordersCol,
    where("status", "==", "Delivered"),
    where("deleveratstamp", ">=", Timestamp.fromDate(startDate)),
    where("deleveratstamp", "<=", Timestamp.fromDate(endDate))
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const d = doc.data() as OrderData;
    return {
      orderId: doc.id.slice(0, 12).toUpperCase(),
      customer_email: d.customer_email,
      totalPrice: (d.productsList || []).reduce(
        (sum: number, item: any) => sum + item.p_cost * item.p_qu,
        0
      ),
      deliveryDate:
        d.deleveratstamp?.toDate().toLocaleDateString("en-GB") || "N/A",
    };
  });
}

// ... existing imports
import { OrderData } from "@/types/productsTypes";

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
    (sum, order) => sum + order.totalPrice,
    0
  );

  return (
    <div className="w-full mx-auto p-2 lg:p-10 pb-32">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow border border-blue-50 p-6 mb-6 flex flex-row flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/manegeOrder"
            className="p-2 hover:bg-blue-50 rounded-full transition-colors text-blue-600"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl lg:text-2xl font-black text-slate-900 tracking-tight">
              Shipped Orders
            </h1>
            {/* <p className="text-xs font-black text-blue-500 uppercase tracking-widest">
              {monthName} {year}
            </p> */}
          </div>
        </div>
        <DateSelector currentMonth={date} />
      </div>

      {/* --- ADDED SUMMARY STATS --- */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-linear-to-br from-blue-600 to-blue-500 p-5 rounded-3xl shadow-lg shadow-blue-200 text-white">
          <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">
            Monthly Revenue
          </p>
          <p className="text-2xl font-black">
            $
            {totalSalesVolume.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="bg-white border border-blue-100 p-5 rounded-3xl shadow-sm">
          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
            Total Shipments
          </p>
          <p className="text-2xl font-black text-slate-900">
            {totalOrderCount}{" "}
            <span className="text-xs font-bold text-slate-400">Orders</span>
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 leading-none mb-1 text-sm lg:text-base">
                    {order.customer_email}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono font-bold tracking-tighter uppercase">
                    REF: {order.orderId}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-black text-slate-900 leading-none mb-1">
                  ${order.totalPrice.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold justify-end uppercase tracking-widest">
                  <Calendar size={12} />
                  <span>{order.deliveryDate}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-bold">
              No orders recorded for {monthName}.
            </p>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Instance: Dec 24, 2025 • Revalidating every 20s
      </footer>
    </div>
  );
}
