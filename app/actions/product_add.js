// app/actions.ts
"use server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import { redirect } from "next/navigation";
import { randomInt } from "crypto";

export async function product_add(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  function displayedImg() {
    return "pc" + randomInt(1, 4) + ".png";
  }

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "products"), {
    p_name: formData.get("p_name"),
    p_cat: formData.get("p_cat"),
    p_cost: formData.get("p_cost"),
    p_details: formData.get("p_details"),
    p_img: displayedImg(),
  });
  // console.log("Document written with ID: ", docRef.id);

  redirect("/products/" + docRef.id);
  // Process data (e.g., save to database)
  console.log(formData);
}
