// app/actions.ts
"use server";

import { addDoc, serverTimestamp } from "firebase/firestore";
import { redirect } from "next/navigation";
import { productsRef } from "@/db/firebase";
import { ProductImage } from "@/types/productsTypes";

// 1. Define the Image structure

export async function product_add(formData: FormData) {
  let newId: string;

  try {
    // 3. Extract and cast types from FormData
    const p_name = formData.get("p_name") as string;
    const p_cat = formData.get("p_cat") as string;
    const p_cost = Number(formData.get("p_cost"));
    const p_details = formData.get("p_details") as string;
    const p_imgs_raw = formData.get("p_imgs") as string;

    // 4. Basic Validation
    if (!p_name || !p_cat || isNaN(p_cost)) {
      throw new Error("Missing required fields or invalid cost");
    }

    const p_imgs: ProductImage[] = p_imgs_raw ? JSON.parse(p_imgs_raw) : [];

    // 5. Add to Firestore with serverTimestamp
    const docRef = await addDoc(productsRef, {
      p_name,
      p_cat,
      p_cost,
      p_details,
      p_imgs,
      createdAt: serverTimestamp(), // Recommended for 2025 sorting
    });

    newId = docRef.id;
    console.log("Document written with ID: ", newId);

    // 6. Revalidate the product list so the new item shows up immediately
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to create product");
  }

  // 7. Redirect must be outside the try/catch block
  // (Next.js uses an internal error throw to handle redirects)
  redirect(`/products/${newId}`);
}
