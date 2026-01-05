"use server";

import {
  addDoc,
  collection,
  deleteDoc,
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
  serverTimestamp,
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
  pageSize = 100
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

/* ----------------------------------------
   ADD
---------------------------------------- */
export async function addProduct(
  data: Omit<ProductType, "id">
): Promise<string> {
  console.log("add product to servers", data);
  
  const res = await addDoc(collection(db, COL), data);
  revalidatePath("/products");
  return res.id;
}

/* ----------------------------------------
   UPDATE
---------------------------------------- */
export async function upProduct(
  id: string,
  data: Partial<ProductType>
): Promise<void> {
  console.log("update product to servers", data);
  
  await updateDoc(doc(db, COL, id), data as any);
  revalidatePath("/products");
}

/* ----------------------------------------
   DELETE
---------------------------------------- */
export async function delProduct(id: string): Promise<void> {
  console.log("delete product to servers", id);
  
  await deleteDoc(doc(db, COL, id));
  revalidatePath("/products");
}

/* ----------------------------------------
   ADVANCED WHERE (Admin / Analytics)
---------------------------------------- */
type ProductFilter = {
  field: keyof ProductType;
  op: WhereFilterOp;
  val: any;
};

export async function getProductsWh(
  filters: ProductFilter[]
): Promise<ProductType[]> {
  try {
    const constraints = filters.map((f) =>
      where(f.field as string, f.op, f.val)
    );

    const snap = await getDocs(query(collection(db, COL), ...constraints));

    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as ProductType[];
  } catch (err) {
    console.error("getProductsWh error:", err);
    return [];
  }
}

export async function getProductsIds() {
  const q = query(productsRef, limit(20));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
  return products;
}



const IMG_URLS = [
  "https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/blue1.jpeg",
  "https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/green1.jpeg",
  "https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/green2.jpeg"
];

const CATEGORIES = ["PC", "LAPTOP", "WEBCAMS", "HARD_DRIVES", "HEADSETS", "KEYBOARDS", "SPEAKERS", "PRINTERS", "MICROPHONES", "MONITORS", "SSD", "MOUSES"];

// Real-world PC component brands
const BRANDS = ["ASUS", "MSI", "Gigabyte", "Corsair", "Samsung", "Western Digital", "Logitech", "Razer", "Intel", "AMD", "Crucial", "Kingston"];
const ADJECTIVES = ["Pro", "Ultra", "Gaming", "Elite", "Series X", "Wireless", "NextGen"];

/**
 * Generates and uploads random products with brand names to Firestore.
 */

export async function product_feature_toggle(id: string, currentStatus: boolean) {
  console.log("product_feature_toggle", id, currentStatus);
  
  try {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      isFeatured: !currentStatus,
    });
    revalidatePath("/dashboard/productsSet");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function product_dlt(id: string): Promise<void> {
  try {
    const docRef = doc(productsRef, id);
    await deleteDoc(docRef);
    revalidatePath("/dashboard/productsSet");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
}