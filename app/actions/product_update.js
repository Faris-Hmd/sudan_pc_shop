// app/actions.ts
"use server";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../db/firebase";
import { redirect } from "next/navigation";

export async function product_update(formData) {
  // Add a new document with a generated id.
  const docRef = doc(db, "productsTest", formData.get("id"));
  await updateDoc(docRef, {
    p_name: formData.get("p_name"),
    p_cat: formData.get("p_cat"),
    p_cost: formData.get("p_cost"),
    p_details: formData.get("p_details"),
    p_imgs: JSON.parse(formData.get("p_imgs")),
  });
  // console.log("Document written with ID: ", docRef.id);

  redirect("/Dashboard/productsSet");
  // Process data (e.g., save to database)
}
