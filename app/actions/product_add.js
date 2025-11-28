// app/actions.ts
"use server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

export async function product_add(formData) {
  // console.log("foooorm data === ", formData);

  const docRef = await addDoc(collection(db, "productsTest"), {
    p_name: formData.get("p_name"),
    p_cat: formData.get("p_cat"),
    p_cost: formData.get("p_cost"),
    p_details: formData.get("p_details"),
    p_imgs: JSON.parse(formData.get("p_imgs")),
  });
  console.log("Document written with ID: ", docRef.id);
  // revalidatePath("/");
  redirect("/products/" + docRef.id);
}
