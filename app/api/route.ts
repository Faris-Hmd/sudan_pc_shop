import { NextResponse } from "next/server";
import {
  collection,
  writeBatch,
  doc,
  Timestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../db/firebase";

export async function GET() {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("status", "==", "Delivered"));
    const querySnapshot = await getDocs(q);

    const monthlyTotals: Record<string, number> = {};

    // Process orders to calculate monthly totals
    querySnapshot.forEach((orderDoc) => {
      const data = orderDoc.data();
      // Ensure orders have a deliveredAt timestamp
      const date = data.deliveredAt?.toDate() || new Date();
      const monthLabel = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      // Calculate total for this specific order
      const orderTotal = (data.items || []).reduce(
        (sum: number, item: any) => sum + item.p_cost * item.p_qu,
        0
      );

      monthlyTotals[monthLabel] = (monthlyTotals[monthLabel] || 0) + orderTotal;
    });

    // Log the totals for each month to the console
    console.log("--- Monthly Sales Totals (2025) ---");
    Object.entries(monthlyTotals).forEach(([month, total]) => {
      console.log(`${month}: $${total.toLocaleString()}`);
    });

    // Optional: Write aggregated results to a 'sales' collection using batch
    const batch = writeBatch(db);
    const salesRef = collection(db, "sales");

    Object.entries(monthlyTotals).forEach(([month, total]) => {
      const salesDocRef = doc(salesRef, month);
      batch.set(
        salesDocRef,
        {
          month,
          sales: total,
          updatedAt: Timestamp.now(),
        },
        { merge: true }
      );
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Monthly sales calculated, logged, and updated in Firestore.",
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
