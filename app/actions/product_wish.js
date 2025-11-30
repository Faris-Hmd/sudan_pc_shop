// app/actions.ts
"use server";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import { auth } from "@/auth";
import { log } from "console";
import { redirect } from "next/navigation";

export async function product_wish(productId) {
  const sess = await auth();
  log(sess, "sess = from wish func");
  if (sess === null) {
    redirect("/products");
  }
  await setDoc(doc(db, "users", sess.user.email, "whish", productId), {});
  console.log("Document written to wish ");
}
export async function product_wish_remove(productId) {
  const sess = await auth();

  log(sess?.user, "from delete  wish func");
  const docRef = await deleteDoc(
    doc(db, "users", sess.user.email, "whish", productId)
  );
  console.log("Document written remove from wish: ");
}
