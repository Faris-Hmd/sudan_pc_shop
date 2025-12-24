"use client"; // Required for SWR

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../db/firebase";
import useSWR from "swr";
import OrderList from "../comp/orders";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function Orders() {
  const { data: session, status } = useSession();

  // 1. Define the Fetcher
  const fetchOrders = async (email: string) => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("customer_email", "==", email));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        orderId: doc.id,
        customerEmail: data.customer_email,
        productList: data.items.map((item: any) => ({
          p_name: item.p_name,
          p_cost: item.p_cost,
          productId: item.productId,
          p_qu: item.p_qu,
          p_cat: item.p_cat,
        })),
        status: data.status || "Processing",
        estimatedDate: data.estimatedDate || "Dec 20, 2025",
      };
    });
  };

  // 2. Use SWR
  // The key is dynamic: if session.user.email is null, SWR won't fetch.
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR(
    session?.user?.email ? `orders/${session.user.email}` : null,
    () => fetchOrders(session?.user?.email!),
    {
      revalidateOnFocus: false, // Prevents refetching every time you switch tabs
      dedupingInterval: 10000, // Cache stays "fresh" for 10 seconds
    }
  );

  const steps = ["Placed", "Processing", "Shipped", "Delivered"];

  // 3. Handle States
  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-gray-500 font-medium">Fetching your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        Please sign in to view your orders.
      </div>
    );
  }

  return (
    <div className="pb-24 max-w-5xl mx-0 ">
      <h1 className="text-2xl font-bold text-gray-800  bg-white p-4  shadow">
        My Orders
      </h1>
      {orders && orders.length > 0 ? (
        <OrderList orders={orders} steps={steps} />
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
          <p className="text-gray-400">You haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  );
}
