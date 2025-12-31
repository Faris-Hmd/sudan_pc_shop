"use server";
import { redirect } from "next/navigation";
import { upProduct } from "@/services/productsServices";

export async function product_update(formData: FormData) {
  // 1. Cast FormData entries to strings safely
  const id = formData.get("id") as string;
  const p_name = formData.get("p_name") as string;
  const p_cat = formData.get("p_cat") as string;
  const p_cost = formData.get("p_cost") as string;
  const p_details = formData.get("p_details") as string;
  const p_imgs_raw = formData.get("p_imgs") as string;

  // 2. Validate essential data
  if (!id) throw new Error("Product ID is required");

  try {
    await upProduct(id, {
      p_name,
      p_cat,
      p_cost: Number(p_cost),
      p_details,
      p_imgs: p_imgs_raw ? JSON.parse(p_imgs_raw) : [],
    });
  } catch (error) {
    console.error("Firestore update failed:", error);
    throw new Error("Failed to update product.");
  }

  // 3. Move redirect OUTSIDE the try/catch block
  redirect("/dashboard/productsSet");
}
