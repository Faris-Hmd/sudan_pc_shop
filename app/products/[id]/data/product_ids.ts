import { getDocs, limit, query } from "firebase/firestore";
import { productsRef } from "@/lib/firebase";

export async function getProductsIds() {
  const q = query(productsRef, limit(20));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
  return products;
}
