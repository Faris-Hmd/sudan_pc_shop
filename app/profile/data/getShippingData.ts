"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ShippingInfo } from "../types/shippingAddressTypes";

// 1. Define the interface for the shipping information

// 2. Define a type for the possible return values
// This handles success, empty data, and error cases
export type ShippingDataResponse = ShippingInfo | { error: string } | null;

export async function getShippingData(
  email: string | null | undefined
): Promise<ShippingDataResponse> {
  // Check for email immediately to satisfy type safety
  if (!email) {
    return { error: "No email provided" };
  }

  try {
    const userRef = doc(db, "users", email);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Ensure we return the correct shape or a default fallback
      return (
        (data.shippingInfo as ShippingInfo) || {
          address: "",
          city: "",
          zip: "",
          phone: "",
        }
      );
    }

    // Return null if the user document doesn't exist
    return null;
  } catch (error) {
    console.error("Error fetching shipping info:", error);
    return { error: "Failed to load information" };
  }
}
