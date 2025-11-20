// app/actions.ts
"use server";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../db/firebase";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";

export async function product_dlt(formData, id) {
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // await wait(2000);
  // console.log(formData, "-----", id);
  // console.log("from server");

  await deleteDoc(doc(db, "products", id));
  // refresh();
  // redirect("/products/" + docRef.id);
}
