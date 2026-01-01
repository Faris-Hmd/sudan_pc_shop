import Chart from "./components/chart";
import {
  getCountFromServer,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { ordersRef, productsRef } from "@/lib/firebase";
import ChartPieInteractive from "./components/pie";
import { categories } from "@/data/categories";
import SectionCards from "./components/section";
import { CategoryDistribution, DailySalesData } from "@/types/productsTypes";
import { getOrdersWhOrdered } from "@/services/ordersServices";
export const revalidate = 60;

// generateStaticParams is correctly typed for Next.js 15
export async function generateStaticParams() {
  return [{ date: "2025-12" }, { date: "2025-11" }, { date: "2026-01" }];
}

interface PageProps {
  params: Promise<{ date: string }>;
}

export default async function OverviewPage({ params }: PageProps) {
  const { date } = await params;
  const [year, month] = date.split("-").map(Number);

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  // 1. Fetch Global Counts with specific return types
  const [ordersSnapshot, productsSnapshot] = await Promise.all([
    getCountFromServer(ordersRef),
    getCountFromServer(productsRef),
  ]);

  const ordersNum: number = ordersSnapshot.data().count;
  const productsNum: number = productsSnapshot.data().count;

  // 2. Typed Fetch for Pie Chart
  async function getCategoryData(): Promise<CategoryDistribution[]> {
    const results = await Promise.all(
      categories.slice(0, 16).map(async (category) => {
        const q = query(productsRef, where("p_cat", "==", category));
        const snap = await getCountFromServer(q);
        return {
          category,
          quantity: snap.data().count,
          fill: `var(--color-${category})`,
        };
      })
    );
    return results;
  }

  // 3. Typed Fetch for Sales Data
  async function getSalesData(): Promise<DailySalesData[]> {
    const delveredOrders = await getOrdersWhOrdered([
      { field: "status", op: "==", val: "Delivered" },
      { field: "deleveratstamp", op: ">=", val: Timestamp.fromDate(startDate) },
      { field: "deleveratstamp", op: "<=", val: Timestamp.fromDate(endDate) },
    ]);

    // Explicitly type the accumulator map
    const statsMap: Record<number, { sales: number; orders: number }> = {};
    delveredOrders.forEach((order) => {
      // Safety check for timestamps in 2025
      if (!order.deliveredAt) return;
      const d = new Date(order.deliveredAt);
      const day = d.getDate();

      const orderTotal = (order.productsList || []).reduce(
        (sum: number, item) =>
          sum + (Number(item.p_cost) * Number(item.p_qu) || 0),
        0
      );

      if (!statsMap[day]) {
        statsMap[day] = { sales: 0, orders: 0 };
      }

      statsMap[day].sales += orderTotal;
      statsMap[day].orders += 1;
    });

    const daysInMonth = new Date(year, month, 0).getDate();
    const finalData: DailySalesData[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      finalData.push({
        month: date,
        day: i,
        sales: statsMap[i]?.sales || 0,
        orders: statsMap[i]?.orders || 0,
      });
    }
    return finalData;
  }

  const [chartPieData, salesData] = await Promise.all([
    getCategoryData(),
    getSalesData(),
  ]);

  const totalMonthlySales = salesData.reduce((acc, curr) => acc + curr.sales, 0);

  return (
    <div className="max-w-[100vw] overflow-x-hidden pb-10">
      <header className="bg-white flex justify-between items-center m-2 p-4 border-b shadow-md rounded-2xl">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Store Overview
        </h1>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(startDate)}
          </p>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Top Summary Cards */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <SectionCards
            productsNum={productsNum}
            ordersNum={ordersNum}
            totalSales={totalMonthlySales}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart - Takes more space */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-500 rounded-full" />
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Daily Revenue
              </h3>
            </div>
            <div className="w-full">
              <Chart salesData={salesData} />
            </div>
          </div>

          {/* Inventory Distribution - Smaller Side Panel */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Inventory
              </h3>
              <span className="text-[10px] font-medium text-slate-400">
                By Category
              </span>
            </div>
            <ChartPieInteractive categories={chartPieData} />
          </div>
        </div>
      </main>
    </div>
  );
}
