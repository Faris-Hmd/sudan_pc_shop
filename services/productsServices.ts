"use server";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  orderBy,
  startAt,
  endAt,
  limit,
  QueryConstraint,
  WhereFilterOp,
} from "firebase/firestore";

import { db, productsRef } from "@/lib/firebase";
import { revalidatePath } from "next/cache";
import { ProductType, ProductFilterKey } from "@/types/productsTypes";

const COL = "products";

function mapProduct(id: string, data: any): ProductType {
  return {
    id,
    p_name: data.p_name ?? "",
    p_cat: data.p_cat ?? "",
    p_cost: data.p_cost ?? 0,
    p_details: data.p_details ?? "",
    p_imgs: data.p_imgs ?? [],
    createdAt: data.createdAt?.toMillis?.() ?? null,
    isFeatured: data.isFeatured ?? false,
  };
}

/* ----------------------------------------
   GET ONE
---------------------------------------- */
export async function getProduct(id: string): Promise<ProductType | null> {
  try {
    const snap = await getDoc(doc(productsRef, id));
    return snap.exists() ? mapProduct(snap.id, snap.data()) : null;
  } catch (err) {
    console.error("getProduct error:", err);
    return null;
  }
}

/* ----------------------------------------
   GET MANY (filter + pagination)
---------------------------------------- */
export async function getProducts(
  filterKey: ProductFilterKey = "all",
  filterValue = "",
  pageSize = 100,
): Promise<ProductType[]> {
  const constraints: QueryConstraint[] = [];

  if (filterKey === "p_name") {
    constraints.push(orderBy("p_name"));
    constraints.push(startAt(filterValue));
    constraints.push(endAt(filterValue + "\uf8ff"));
  }

  if (filterKey === "p_cat") {
    constraints.push(where("p_cat", "==", filterValue));
  }

  constraints.push(limit(pageSize));

  try {
    console.log("get products from servers");

    const snap = await getDocs(query(productsRef, ...constraints));
    return snap.docs.map((d) => mapProduct(d.id, d.data()));
  } catch (err) {
    console.error("getProducts error:", err);
    return [];
  }
}

type ProductFilter = {
  field: keyof ProductType;
  op: WhereFilterOp;
  val: any;
};

export async function getProductsIds() {
  const q = query(productsRef, limit(20));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
  return products;
}
