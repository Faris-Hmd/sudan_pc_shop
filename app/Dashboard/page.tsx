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
  async function countProductsByCategory(): Promise<
    { category: string; quantity: number; fill: string }[]
  > {
    const results: { category: string; quantity: number; fill: string }[] = [];
    for (const category of categories.slice(0, 16)) {
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
      <div className="m-2  grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {" "}
        <div className="grid gap-2">
          {/* <ChartRadialStacked /> */}
          <SectionCards productsNum={productsNum} />
          <Chart data={chartData} />
        </div>
        <div className="">
          <Suspense fallback={<div>Loading...</div>}>
            <ChartPieInteractive categories={chartData} />
          </Suspense>
        </div>
        <div className=""></div>
      </div>
    </>
  );
}
