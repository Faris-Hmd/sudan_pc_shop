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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              My Orders
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {orders && orders.length > 0
                ? `You have placed ${orders.length} orders`
                : "Track your past and current orders"}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

      {orders && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id}>
              <OrderList order={order} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10 md:p-20 rounded-3xl text-center">
          {/* Visual Element */}
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 transition-colors">
            <ShoppingBag className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          </div>

          {/* Engaging Copy */}
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2 transition-colors">
            No orders found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-8 text-sm leading-relaxed font-bold uppercase tracking-tight">
            Looks like you haven't placed any orders yet. Start exploring our
            latest products to fill this up!
          </p>

          {/* Clear Call-to-Action */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
      </div>
      </div>
  );
}
