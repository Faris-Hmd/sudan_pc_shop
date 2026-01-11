"use server";

import {
  addDoc,
  getAggregateFromServer,
  getCountFromServer,
  sum,
} from "firebase/firestore";
import { ordersRef } from "@/lib/firebase";
import { revalidatePath } from "next/cache";
import {
  getDocs,
  query,
  QueryConstraint,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { OrderData } from "@/types/productsTypes";

type OrderFilter = {
  field: string;
  op: WhereFilterOp;
  val: any;
};
export async function getOrdersWh(
  filters: OrderFilter[],
): Promise<OrderData[]> {
  console.log("get where order from server");

  try {
    // 1. Map our filter objects into Firestore where() constraints
    const constraints: QueryConstraint[] = filters.map((f) =>
      where(f.field as string, f.op, f.val),
    );

    // 2. Create the query with all constraints spread into the function
    const q = query(ordersRef, ...constraints);

    // 3. Execute
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
      return {
        ...d.data(),
        id: d.id,
        deleveratstamp: "",
      } as OrderData;
    });
  } catch (error) {
    console.error("Firestore Query Error:", error);
    return [];
  }
}

export async function addOrder(data: Omit<OrderData, "id">): Promise<string> {
  const res = await addDoc(ordersRef, data);
  console.log("add order from server");

  revalidatePath("/orders");
  return res.id;
}
export async function getUserOrdersStats(
  email: string,
): Promise<{ count: number; totalSpend: number }> {
  const q = query(ordersRef, where("customer_email", "==", email));
  const countSnap = await getCountFromServer(q);
  const aggrSnap = await getAggregateFromServer(q, {
    totalSpend: sum("totalAmount"),
  });
  console.log("getUserOrdersStats", countSnap.data().count, aggrSnap.data());

  return {
    count: countSnap.data().count,
    totalSpend: aggrSnap.data().totalSpend || 0,
  };
}
