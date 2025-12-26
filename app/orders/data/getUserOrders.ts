"use server";

import { db } from "@/db/firebase";
import { OrderData, ProductType } from "@/types/productsTypes";
import { collection, query, where, getDocs } from "firebase/firestore";

// Define Types for serializable return values

export async function getUserOrders(email: string): Promise<OrderData[]> {
  if (!email) return [];

  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("customer_email", "==", email));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as OrderData;
      return {
        orderId: doc.id,
        customer_email: data.customer_email,
        productsList: data.productsList as ProductType[],
        status: data.status,
        estimatedDate: data.estimatedDate,
        deliveredAt: data.deliveredAt,
        shippedAt: data.shippedAt,
        createdAt: data.createdAt,
      };
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
