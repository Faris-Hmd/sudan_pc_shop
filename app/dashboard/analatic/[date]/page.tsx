import Chart from "./components/chart";
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
  Timestamp,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db, ordersRef, productsRef } from "@/db/firebase";
import ChartPieInteractive from "./components/pie";
import { categories } from "@/data/categories";
import SectionCards from "./components/section";
import {
  CategoryDistribution,
  DailySalesData,
  OrderData,
} from "@/types/productsTypes";
export const revalidate = 60;

// generateStaticParams is correctly typed for Next.js 15
export async function generateStaticParams() {
  return [{ date: "2025-12" }, { date: "2025-11" }];
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
    const q = query(
      collection(db, "orders"),
      where("status", "==", "Delivered"),
      where("deleveratstamp", ">=", Timestamp.fromDate(startDate)),
      where("deleveratstamp", "<=", Timestamp.fromDate(endDate)),
      orderBy("deleveratstamp", "asc")
    );

    const querySnapshot = await getDocs(q);

    // Explicitly type the accumulator map
    const statsMap: Record<number, { sales: number; orders: number }> = {};

    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data() as OrderData;

      // Safety check for timestamps in 2025
      if (!data.deleveratstamp) return;

      const d = data.deleveratstamp.toDate();
      const day = d.getDate();

      const orderTotal = (data.productsList || []).reduce(
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

      <main className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 px-3">
        <aside className="flex flex-col gap-4 md:col-span-1">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <SectionCards productsNum={productsNum} ordersNum={ordersNum} />
          </div>

          <div className="bg-white p-4 px-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full" />
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Daily Revenue
              </h3>
            </div>
            <Chart salesData={salesData} />
          </div>
        </aside>

        <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 md:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Inventory Distribution
            </h3>
            <span className="text-[10px] font-medium text-slate-400">
              By Category
            </span>
          </div>
          <ChartPieInteractive categories={chartPieData} />
        </section>
      </main>
    </div>
  );
}
