"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/db/firebase";
import {
  Loader2,
  Package,
  ChevronDown,
  ChevronUp,
  Calendar,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Types ---
type ProductItem = {
  p_name: string;
  p_cost: number;
  productId: string;
  p_qu: number;
  p_cat: string;
};

type OrderData = {
  orderId: string;
  customerEmail: string;
  productList: ProductItem[];
  status: string;
  estimatedDate: string;
};

// --- Fetcher Logic ---
const fetchOrders = async () => {
  const ordersCol = collection(db, "orders");
  const q = query(
    ordersCol,
    // orderBy("customer_email", "asc"),
    where("status", "!=", "Delivered")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const d = doc.data() as any;
    return {
      orderId: doc.id,
      customerEmail: d.customer_email,
      productList: (d.items || []).map((item: any) => ({
        p_name: item.p_name,
        p_cost: item.p_cost,
        productId: item.productId,
        p_qu: item.p_qu,
        p_cat: item.p_cat,
      })),
      status: d.status || "Processing",
      estimatedDate: d.estimatedDate || "Dec 24, 2025",
    } as OrderData;
  });
};

export default function ManageOrdersPage() {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );

  // SWR Hook for data fetching and caching
  const {
    data: orders,
    error,
    isLoading,
    isValidating,
  } = useSWR("admin/orders", fetchOrders, {
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      if (newStatus === "Delivered") {
        await updateDoc(orderRef, {
          status: newStatus,
          deliveredAt: serverTimestamp(),
        });
      } else await updateDoc(orderRef, { status: newStatus });

      // Tell SWR to refresh data
      mutate("admin/orders");
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (isLoading)
    return (
      <div className="h-[70vh] w-full flex flex-col justify-center items-center gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-500 font-medium">Loading store orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        Error loading database.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-8 space-y-2 pb-24">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Order Management
          </h1>
          <p className="text-sm text-gray-500">
            Track, fulfill, and update customer shipments
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Added Link to Shipped Orders */}
          <Link
            href="/dashboard/manegeOrder/shipped/2025-12"
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-100"
          >
            <Package size={16} />
            <span>Delivered Orders</span>
          </Link>

          <button
            onClick={() => mutate("admin/orders")}
            className={cn(
              "p-2 rounded-full hover:bg-gray-100 transition",
              isValidating && "animate-spin"
            )}
          >
            <RefreshCcw size={18} className="text-gray-400" />
          </button>
          <div className="h-10 w-px bg-gray-200 mx-2 hidden md:block" />
          <div className="text-right">
            <p className="text-[10px] font-bold text-blue-600 uppercase">
              Live Count
            </p>
            <p className="text-2xl font-black text-gray-800 leading-none">
              {orders?.length || 0}
            </p>
          </div>
        </div>
      </header>

      {/* Orders List */}
      <div className="grid gap-4">
        {orders?.map((order) => {
          const isExpanded = expandedOrders[order.orderId];
          const totalItems = order.productList.reduce(
            (sum, p) => sum + p.p_qu,
            0
          );
          const totalPrice = order.productList.reduce(
            (sum, p) => sum + p.p_cost * p.p_qu,
            0
          );

          return (
            <div
              key={order.orderId}
              className={cn(
                "bg-white border rounded-3xl transition-all duration-300 overflow-hidden",
                isExpanded
                  ? "ring-2 ring-blue-500 shadow-xl scale-[1]"
                  : "border-gray-100 shadow-sm hover:border-blue-200"
              )}
            >
              {/* Summary Row */}
              <div
                onClick={() => toggleOrder(order.orderId)}
                className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center  gap-4 justify-between w-full">
                  <div
                    className={cn(
                      "p-3 rounded-2xl transition-all",
                      isExpanded
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-gray-50 text-gray-400"
                    )}
                  >
                    <Package size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {/* <span className="font-bold text-gray-900">
                        {order.customerEmail}
                      </span> */}
                      {/* <ExternalLink size={12} className="text-gray-300" /> */}
                    </div>
                    <div className="flex items-center flex-wrap gap-3 mt-1">
                      <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                        {totalItems} {totalItems === 1 ? "Item" : "Items"}
                      </span>
                      <span className="text-xs font-bold text-blue-600">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>{" "}
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Status Picker */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleChangeStatus(order.orderId, e.target.value)
                        }
                        className={cn(
                          "text-[11px] font-black uppercase tracking-wider rounded-xl px-4 py-2 border appearance-none cursor-pointer outline-none transition-all",
                          order.status === "Delivered" &&
                            "bg-emerald-50 text-emerald-700 border-emerald-200",
                          order.status === "Processing" &&
                            "bg-amber-50 text-amber-700 border-amber-200",
                          order.status === "Shipped" &&
                            "bg-blue-50 text-blue-700 border-blue-200",
                          order.status === "Cancelled" &&
                            "bg-rose-50 text-rose-700 border-rose-200"
                        )}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <button
                      className=" text-gray-300 hover:text-gray-600 transition-colors"
                      onClick={() => {
                        toggleOrder(order.orderId);
                      }}
                    >
                      {isExpanded ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details Section */}
              <div
                className={cn(
                  "transition-all duration-500 ease-in-out bg-gray-50/50",
                  isExpanded
                    ? "max-h-[2000px] border-t opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                )}
              >
                <div className="p-2 lg:p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="text-gray-400 border-b border-gray-200">
                          <th className="p-3 font-semibold px-2">Product</th>
                          <th className="p-3 font-semibold text-center">
                            Quantity
                          </th>
                          <th className="p-3 font-semibold text-right">Unit</th>
                          <th className="p-3 font-semibold text-right">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {order.productList.map((p) => (
                          <tr
                            key={p.productId}
                            className="group hover:bg-white transition-colors"
                          >
                            <td className="py-4 px-2 font-semibold text-gray-800">
                              {p.p_name}
                              <p className="text-[10px] text-gray-400 font-normal uppercase tracking-tighter">
                                {p.p_cat}
                              </p>
                            </td>
                            <td className="py-4 text-center">
                              <span className="bg-white border shadow-sm px-3 py-1 rounded-lg font-mono text-xs">
                                {p.p_qu}
                              </span>
                            </td>
                            <td className="py-4 text-right text-gray-500 font-mono">
                              ${p.p_cost.toFixed(2)}
                            </td>
                            <td className="py-4 text-right font-bold text-gray-900 font-mono">
                              ${(p.p_cost * p.p_qu).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Order Footer Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border">
                        <Calendar size={12} />
                        <span>Est: {order.estimatedDate}</span>
                      </div>
                      <span className="font-mono">
                        ID: {order.orderId.slice(0, 16).toUpperCase()}
                      </span>
                    </div>
                    <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-8 shadow-lg shadow-blue-100">
                      <span className="text-xs font-medium opacity-80 italic">
                        Total Value
                      </span>
                      <span className="text-xl font-black">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {orders?.length === 0 && (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <Package size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">
            No orders found in the database.
          </p>
        </div>
      )}
    </div>
  );
}
