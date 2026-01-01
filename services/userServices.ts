"use server";

import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { UserData } from "@/types/userTypes";

const COL = "users";

/**
 * GET: Returns user data including shipping info
 */
export async function getUser(email: string): Promise<UserData | null> {
  if (!email) return null;
  console.log("get user from server", email);
  
  try {
    const snap = await getDoc(doc(db, COL, email));
    if (!snap.exists()) return null;

    return {
      ...snap.data(),
      email: snap.id,
    } as UserData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

/**
 * UPDATE: Merges user data (usually shipping info)
 */
export async function upUser(
  email: string,
  data: Partial<UserData>
): Promise<{ success: boolean; error?: string }> {
  if (!email) return { success: false, error: "Email required" };
  console.log("up user from server", email);

  try {
    const userRef = doc(db, COL, email);
    await setDoc(
      userRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Error updating user data:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
