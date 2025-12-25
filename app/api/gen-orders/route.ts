import { NextResponse } from "next/server";
import { collection, writeBatch, doc, Timestamp } from "firebase/firestore";
import { db } from "@/app/db/firebase";

export async function POST() {
  try {
    const batch = writeBatch(db);
    const ordersRef = collection(db, "orders");

    // --- CONFIGURATION: CHANGE DATES HERE ---
    const year = 2025;
    const monthsToGenerate = [2, 11, 12]; // [11] for Nov, [12] for Dec
    // ----------------------------------------

    let totalOrdersCreated = 0;

    monthsToGenerate.forEach((monthNumber) => {
      // monthNumber is 1-based (11 for Nov), JS Date month is 0-based
      const monthIndex = monthNumber - 1;
      const daysInMonth = new Date(year, monthNumber, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        // Generate 1 to 3 orders for every single day
        const ordersForToday = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < ordersForToday; i++) {
          const newOrderRef = doc(ordersRef); // Generate auto-ID

          // Randomize time of delivery
          const hour = Math.floor(Math.random() * 12) + 9; // 9 AM - 9 PM
          const deliveredDate = new Date(year, monthIndex, day, hour, 0, 0);

          const mockOrder = {
            customer_email: `user_${monthNumber}_${day}_${i}@elneelen.com`,
            status: "Delivered",
            deliveredAt: Timestamp.fromDate(deliveredDate),
            items: [
              {
                p_name: "Mock Product",
                p_cost: Math.floor(Math.random() * 150) + 50, // $50 - $200
                p_qu: Math.floor(Math.random() * 2) + 1, // 1 - 2 qty
                productId: "PROD-MOCK",
              },
            ],
            createdAt: Timestamp.fromDate(deliveredDate),
          };

          batch.set(newOrderRef, mockOrder);
          totalOrdersCreated++;
        }
      }
    });

    // NOTE: Firestore batches have a limit of 500 operations.
    // If you generate more than 500 orders, you will need to split the batch.
    await batch.commit();

    console.log(`--- SEED COMPLETE ---`);
    console.log(
      `Created ${totalOrdersCreated} orders for months: ${monthsToGenerate.join(
        ", "
      )}`
    );

    return NextResponse.json({
      success: true,
      message: `Generated ${totalOrdersCreated} orders for defined dates.`,
    });
  } catch (error: any) {
    console.error("Seeding Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
