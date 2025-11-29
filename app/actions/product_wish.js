// app/actions.ts
"use server";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../db/firebase";
// import { revalidatePath } from "next/cache";

export async function product_wish(productId) {
  // console.log("foooorm data === ", formData);

  const docRef = await setDoc(
    doc(db, "users", "faris", "whish", productId),
    {}
  );
  console.log("Document written to wish: ", docRef);
  // revalidatePath("/");
  //   redirect("/products/" + docRef.id);
}
