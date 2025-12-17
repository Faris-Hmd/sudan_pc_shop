import Chart from "../comp/Chart";
import SectionCards from "../comp/Section";
import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../db/firebase";
import ChartPieInteractive from "../comp/Pie";
import { categories } from "../data/categories";
import { Suspense } from "react";
export default async function Component() {
  let productsNum = 0;
  const sliseNum = process.env.NODE_ENV === "development" ? 15 : 0;
  console.log(sliseNum);

  async function countProductsByCategory(): Promise<
    { category: string; quantity: number; fill: string }[]
  > {
    const results: { category: string; quantity: number; fill: string }[] = [];
    for (const category of categories.slice(sliseNum, 16)) {
      const q = query(
        collection(db, "products"),
        where("p_cat", "==", category)
      );
      const snapshot = await getCountFromServer(q); // v9 tree-shakable count
      const count = snapshot.data().count ?? 0;
      // console.log(count);

      productsNum = productsNum + count;

      results.push({
        category,
        quantity: count,
        fill: `var(--color-${category})`,
      });
    }
    console.log(productsNum);
    return results;
  }

  const chartData = await countProductsByCategory();
  // console.log(chartData);

  return (
    <>
      <div className="bg-white flex justify-between items-center mb-4 p-4 border-b shadow-md  flex-wrap">
        <h3 className="text-lg font-semibold text-gray-700">Overview</h3>
      </div>

      <div className="  grid gap-2 md:grid-cols-3 lg:grid-cols-4 ">
        {/* Left small column */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="bg-white p-2 mx-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <SectionCards productsNum={productsNum} />
          </div>

          <div className="bg-white p-4 mx-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
            <Chart />
          </div>
        </div>

        {/* Right big column for Pie Chart */}
        <div className="bg-white p-4 mx-2 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 md:col-span-2 lg:col-span-3">
          <ChartPieInteractive categories={chartData} />
        </div>
      </div>
    </>
  );
}
