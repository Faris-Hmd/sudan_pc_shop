import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebase";

export async function getProductsIds() {
  const productsRef = collection(db, "productsTest");

  const querySnapshot = await getDocs(productsRef);
  const products = querySnapshot.docs.map((doc) => ({
    productId: doc.id,
  }));
  return products;
}
