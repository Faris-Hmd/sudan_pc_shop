import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/db/firebase";

export async function GET() {
  try {
    const ordersRef = collection(db, "orders");
    // Only process Delivered orders for accurate sales reporting
    const q = query(ordersRef, where("status", "==", "Delivered"));
    const querySnapshot = await getDocs(q);

    const monthlyAggregation: Record<string, number> = {};

    querySnapshot.forEach((orderDoc) => {
      const data = orderDoc.data();
      // Ensure your orders have a timestamp field (e.g., deliveredAt or createdAt)
      const date = data.deliveredAt?.toDate() || new Date();
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      // Calculate total for this specific order
      const orderTotal = (data.items || []).reduce(
        (sum: number, item: any) => sum + item.p_cost * item.p_qu,
        0
      );

      monthlyAggregation[monthKey] =
        (monthlyAggregation[monthKey] || 0) + orderTotal;
    });

    // Use a Write Batch to update the 'sales' collection efficiently
    const batch = writeBatch(db);
    const salesRef = collection(db, "sales");

    Object.entries(monthlyAggregation).forEach(([month, total]) => {
      const salesDocRef = doc(salesRef, month); // Use month (e.g., "2024-12") as Doc ID
      batch.set(
        salesDocRef,
        {
          month,
          sales: total,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: `Processed ${
        Object.keys(monthlyAggregation).length
      } months of sales data.`,
    });
  } catch (error: any) {
    console.error("Sales Generation Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
