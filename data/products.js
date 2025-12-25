import {
  collection,
  query,
  where,
  orderBy,
  startAt,
  endAt,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../db/firebase";

/**
 * Optimized fetcher for products with dynamic filtering.
 * @param {string} filterKey - The field to filter by ('p_name', 'p_cat', 'all').
 * @param {string} filterValue - The value to match.
 * @param {number} pageSize - Max documents to return (default 100).
 */
export async function getProducts(
  filterKey = "all",
  filterValue = "",
  pageSize = 100
) {
  const productsRef = collection(db, "productsTest");

  // Use an array to store dynamic query constraints
  const constraints = [];

  // Logic mapping for different filter types
  switch (filterKey) {
    case "p_name":
      // Prefix search: requires an index on 'p_name'
      constraints.push(orderBy("p_name"));
      constraints.push(startAt(filterValue));
      constraints.push(endAt(filterValue + "\uf8ff"));
      break;

    case "p_cat":
      constraints.push(where("p_cat", "==", filterValue));
      break;

    case "all":
    default:
      // No specific filters, just add limit later
      break;
  }

  // Always apply the limit constraint
  constraints.push(limit(pageSize));

  try {
    const q = query(productsRef, ...constraints);
    const querySnapshot = await getDocs(q);

    // Map documents to plain objects with their ID
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      productId: doc.id,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow to let the UI handle the error state
  }
}
