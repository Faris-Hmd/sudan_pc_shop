"use server";
import {
  query,
  where,
  orderBy,
  startAt,
  endAt,
  limit,
  getDocs,
  getDoc,
  doc,
  QueryConstraint,
} from "firebase/firestore";
import { productsRef } from "@/db/firebase";
import { ProductFilterKey, ProductType } from "@/types/productsTypes";

/**
 * Optimized fetcher for products with dynamic filtering.
 */
export async function getProducts(
  filterKey: ProductFilterKey = "all",
  filterValue: string = "",
  pageSize: number = 100
): Promise<ProductType[]> {
  const constraints: QueryConstraint[] = [];

  switch (filterKey) {
    case "p_name":
      // Note: Prefix search requires Firestore composite index
      constraints.push(orderBy("p_name"));
      constraints.push(startAt(filterValue));
      constraints.push(endAt(filterValue + "\uf8ff"));
      break;

    case "p_cat":
      constraints.push(where("p_cat", "==", filterValue));
      break;

    case "all":
    default:
      break;
  }

  constraints.push(limit(pageSize));

  try {
    const q = query(productsRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        // Explicitly map properties for type safety and serialization
        productId: docSnap.id,
        p_name: data.p_name || "",
        p_cat: data.p_cat || "",
        p_cost: data.p_cost || 0,
        p_details: data.p_details || "",
        p_imgs: data.p_imgs || [],
        createdAt: data.createdAt?.toMillis() || null,
      } as ProductType;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Returning empty array instead of throwing to prevent Next.js Error Boundary flicker
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProduct(
  productId: string
): Promise<ProductType | null> {
  try {
    const docRef = doc(productsRef, productId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) return null;

    const data = docSnapshot.data();

    return {
      productId: docSnapshot.id,
      p_name: data.p_name || "",
      p_cat: data.p_cat || "",
      p_cost: data.p_cost || 0,
      p_details: data.p_details || "",
      p_imgs: data.p_imgs || [],
      createdAt: data.createdAt?.toMillis() || null,
    } as ProductType;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
