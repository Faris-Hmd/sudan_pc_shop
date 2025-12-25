import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../db/firebase";

export async function getProductsIds() {
  const productsRef = collection(db, "productsTest");
  const q = query(productsRef, limit(20));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    productId: doc.id,
  }));
  return products;
}
