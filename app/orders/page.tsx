"use client"; // Required for SWR
import useSWR from "swr";
import OrderList from "./components/orderList";
import { useSession } from "next-auth/react";
import { ArrowRight, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { OrderData } from "@/types/productsTypes";
import { getOrdersWh } from "@/services/ordersServices";

export default function Orders() {
  const { data: session, status } = useSession();

  // 1. Define the Fetcher
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderData[]>(
    session?.user?.email ? `orders/${session.user.email}` : null,
    () =>
      getOrdersWh([
        { field: "customer_email", op: "==", val: session?.user?.email },
      ]),
    {
      revalidateOnFocus: false, // Prevents refetching when switching browser tabs
      dedupingInterval: 10000, // Considers data fresh for 10 seconds
    }
  );

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
    <div className=" max-w-5xl mx-auto md:px-0">
      <header className="mb-2 flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Orders
        </h1>
      </header>

      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="mb-3 px-3">
            <OrderList order={order} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center  p-10 md:p-20 rounded-3xl  text-center ">
          {/* Visual Element */}
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>

          {/* Engaging Copy */}
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            No orders found
          </h2>
          <p className="text-slate-500 max-w-xs mx-auto mb-8 text-sm leading-relaxed">
            Looks like you havent placed any orders yet. Start exploring our
            latest products to fill this up!
          </p>

          {/* Clear Call-to-Action */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
