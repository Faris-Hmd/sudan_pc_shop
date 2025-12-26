"use server";

import { productsRef } from "@/db/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

/**
 * Deletes a product from Firestore and revalidates the cache.
 * @param id - The Firestore document ID of the product.
 */
export async function product_dlt(id: string): Promise<void> {
  // Helper to simulate delay
  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  try {
    // 1. Optional delay
    await wait(3000);

    // 2. Reference the specific document
    const docRef = doc(productsRef, id);

    // 3. Execute deletion
    await deleteDoc(docRef);

    // 4. Revalidate the cache to reflect changes in the UI
    // Adjust the path to match your specific products route
    revalidatePath("/dashboard/productsSet");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
}
