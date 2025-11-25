import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../db/firebase";

export async function getProducts(search_word, limitCount = 100) {
  const productsRef = collection(db, "productsTest");
  const limitQ = query(productsRef, limit(limitCount));
  const q = query(
    productsRef,
    where("p_name", ">=", search_word || ""),
    where("p_name", "<=", (search_word || "") + "\uf8ff"),
    limit(limitCount)
  );
  const querySnapshot = await getDocs(search_word != "" ? q : limitQ);
  const products = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return products;
}
