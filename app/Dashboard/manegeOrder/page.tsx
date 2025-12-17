"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./../../db/firebase";

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
  status: string; // Processing | Shipped | Delivered | Cancelled
  estimatedDate: string;
};

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const ordersCol = collection(db, "orders");
    const snapshot = await getDocs(ordersCol);
    const data = snapshot.docs.map((doc) => {
      const d = doc.data() as any;
      return {
        orderId: doc.id,
        customerEmail: d.customer_email,
        productList: d.items.map((item: any) => ({
          p_name: item.p_name,
          p_cost: item.p_cost,
          productId: item.productId,
          p_qu: item.p_qu,
          p_cat: item.p_cat,
        })),
        status: d.status || "Processing",
        estimatedDate: d.estimatedDate || "Dec 20, 2025",
      } as OrderData;
    });
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className=" space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-gray-50 p-3 shadow">
        Manage Orders
      </h2>
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="bg-white shadow-md rounded-lg p-4 m-2 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">
              {order.customerEmail}
            </span>
            <span className="text-sm text-gray-500">{order.estimatedDate}</span>
          </div>

          <div className="mb-2">
            {order.productList.map((p) => (
              <div
                key={p.productId}
                className="flex justify-between border-b border-gray-100 py-1"
              >
                <span>
                  {p.p_name} x{p.p_qu}
                </span>
                <span>${p.p_cost / 100}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">
              Total: $
              {order.productList
                .reduce((sum, p) => sum + p.p_cost * p.p_qu, 0)
                .toFixed(2)}
            </span>

            <select
              value={order.status}
              onChange={(e) =>
                handleChangeStatus(order.orderId, e.target.value)
              }
              className="border rounded px-2 py-1"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
