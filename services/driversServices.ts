"use server";

import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { Driver } from "@/types/userTypes";

const COL = "drivers";

/**
 * GET ALL DRIVERS
 */
export async function getDrivers(): Promise<Driver[]> {
  try {
    const snap = await getDocs(collection(db, COL));
    return snap.docs.map((d) => ({
      ...d.data(),
      id: d.id,
    })) as Driver[];
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
}

/**
 * GET SINGLE DRIVER
 */
export async function getDriver(id: string): Promise<Driver | null> {
  try {
    const snap = await getDoc(doc(db, COL, id));
    if (!snap.exists()) return null;
    return { ...snap.data(), id: snap.id } as Driver;
  } catch (error) {
    console.error("Error fetching driver:", error);
    return null;
  }
}

/**
 * GET DRIVER BY EMAIL
 */
export async function getDriverByEmail(email: string): Promise<Driver | null> {
  try {
    const q = query(collection(db, COL), where("email", "==", email));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { ...d.data(), id: d.id } as Driver;
  } catch (error) {
    console.error("Error fetching driver by email:", error);
    return null;
  }
}

/**
 * ADD DRIVER
 */
export async function addDriver(data: Omit<Driver, "id">): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const res = await addDoc(collection(db, COL), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    revalidatePath("/dashboard/drivers");
    return { success: true, id: res.id };
  } catch (error) {
    console.error("Error adding driver:", error);
    return { success: false, error: "Failed to add driver" };
  }
}

/**
 * UPDATE DRIVER
 */
export async function upDriver(id: string, data: Partial<Driver>): Promise<{ success: boolean; error?: string }> {
  try {
    await updateDoc(doc(db, COL, id), {
      ...data,
      updatedAt: new Date().toISOString(),
    } as any);
    revalidatePath("/dashboard/drivers");
    return { success: true };
  } catch (error) {
    console.error("Error updating driver:", error);
    return { success: false, error: "Failed to update driver" };
  }
}

/**
 * DELETE DRIVER
 */
export async function delDriver(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, COL, id));
    revalidatePath("/dashboard/drivers");
    return { success: true };
  } catch (error) {
    console.error("Error deleting driver:", error);
    return { success: false, error: "Failed to delete driver" };
  }
}
