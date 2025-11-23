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
export default async function Component() {
  const categories = [
    "MONITORS",
    "SSD",
    "LAPTOP",
    "WEBCAMS",
    "HEADSETS",
    "KEYBOARDS",
    "SPEAKERS",
    "MICROPHONES",
    "TABLETS",
    "PROJECTORS",
    "SCANNERS",
    "HARD_DRIVES",
    "PRINTERS",
    "MOUSES",
    "PC",
    "DESKTOP",
  ];
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
      console.log(count);

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
      <div className="mt-1"></div>
      <ChartPieInteractive categories={chartData} />
      <Chart data={chartData} />
      <SectionCards productsNum={productsNum} />
    </>
  );
}
