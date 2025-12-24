import Chart from "@/app/comp/Chart";
import SectionCards from "@/app/comp/Section";
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/app/db/firebase";
import ChartPieInteractive from "@/app/comp/Pie";
import { categories } from "@/app/data/categories";

export const revalidate = 60;

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

  // 1. Fetch Global Counts for SectionCards
  const [ordersSnapshot, productsSnapshot] = await Promise.all([
    getCountFromServer(collection(db, "orders")),
    getCountFromServer(collection(db, "products")),
  ]);

  const ordersNum = ordersSnapshot.data().count;
  const productsNum = productsSnapshot.data().count;

  // 2. Fetch Category Data for Pie Chart
  async function getCategoryData() {
    const results = await Promise.all(
      categories.slice(0, 16).map(async (category) => {
        const q = query(
          collection(db, "products"),
          where("p_cat", "==", category)
        );
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

  // 3. Updated Fetch Sales & Order Count per day for the Chart
  async function getSalesData() {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("status", "==", "Delivered"),
      where("deliveredAt", ">=", Timestamp.fromDate(startDate)),
      where("deliveredAt", "<=", Timestamp.fromDate(endDate)),
      orderBy("deliveredAt", "asc")
    );

    const querySnapshot = await getDocs(q);

    // Map to track both revenue and volume per day
    const statsMap: Record<number, { sales: number; orders: number }> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const d = data.deliveredAt.toDate();
      const day = d.getDate();

      const orderTotal = (data.items || []).reduce(
        (sum: number, item: any) =>
          sum + (Number(item.p_cost) * Number(item.p_qu) || 0),
        0
      );

      if (!statsMap[day]) {
        statsMap[day] = { sales: 0, orders: 0 };
      }

      statsMap[day].sales += orderTotal;
      statsMap[day].orders += 1; // Count this order
    });

    const daysInMonth = new Date(year, month, 0).getDate();
    const finalData = [];

    for (let i = 1; i <= daysInMonth; i++) {
      finalData.push({
        month: date,
        day: i,
        sales: statsMap[i]?.sales || 0,
        orders: statsMap[i]?.orders || 0, // Passed to client Chart
      });
    }
    return finalData;
  }

  const [chartData, salesData] = await Promise.all([
    getCategoryData(),
    getSalesData(),
  ]);

  return (
    <div className="max-w-[100vw] overflow-x-hidden pb-10">
      <div className="bg-white flex justify-between items-center m-2 p-4 border-b shadow-md rounded-2xl">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Store Overview
        </h1>
        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
          }).format(startDate)}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 px-3">
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            {/* Added ordersNum prop */}
            <SectionCards productsNum={productsNum} ordersNum={ordersNum} />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Monthly Performance
            </h3>
            {/* salesData now contains { day, sales, orders } */}
            <Chart salesData={salesData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:col-span-2 lg:col-span-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Inventory Distribution
          </h3>
          <ChartPieInteractive categories={chartData} />
        </div>
      </div>
    </div>
  );
}
