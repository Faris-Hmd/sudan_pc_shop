"use server";

import { db } from "@/db/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ShippingInfo } from "../types/shippingAddressTypes";

export async function updateShippingData(
  email: string,
  shippingData: ShippingInfo
) {
  if (!email) return { success: false, error: "Authentication required" };

  try {
    const userRef = doc(db, "users", email);

    await setDoc(
      userRef,
      {
        shippingInfo: shippingData,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return { success: true };
  } catch (error) {
    console.error("Error updating shipping info:", error);
    return { success: false, error: "Database update failed" };
  }
}
