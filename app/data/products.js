import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../db/firebase";

export async function getProducts(key = "", value = "", limitCount = 100) {
  const productsRef = collection(db, "productsTest");
  const limitQ = query(productsRef, limit(limitCount));
  console.log(key, value);
  let q;
  switch (key) {
    case "p_name":
      q = query(
        productsRef,
        orderBy(key),
        startAt(value),
        endAt(value + "\uf8ff")
      );
      console.log(key);
      break;
    case "p_cat":
      q = query(productsRef, where("p_cat", "==", value));
      console.log(key);

      break;
    case "all":
      q = query(productsRef);
      console.log(key);

      break;
    default:
      q = query(productsRef, limit(limitCount));
      break;
  }

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return products;
}
