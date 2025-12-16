import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "./../db/firebase";
import getUser from "../data/getUser";

export default async function OrderList() {
  const user = await getUser();
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("customer_email", "==", user.email));

  const getOrders = async () => {
    const querySnapshot = await getDocs(q);

    // Map through each document in the "orders" collection
    const allOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        orderId: doc.id,
        customerEmail: data.customer_email,
        // Map the internal items array to ensure consistent keys
        productList: data.items.map((item) => ({
          p_name: item.p_name,
          p_cost: item.p_cost,
          productId: item.productId,
          p_qu: item.p_qu,
          p_cat: item.p_cat,
        })),
        // Default UI fields for your Progress Bar
        status: data.status || "Processing",
        estimatedDate: data.estimatedDate || "Dec 20, 2025",
      };
    });

    return allOrders;
  };
  const steps = ["Placed", "Processing", "Shipped", "Delivered"];
  const orders = await getOrders();
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Your PC Component Orders
      </h2>

      {orders.map((order) => {
        const currentStepIndex = steps.indexOf(order.status || "Processing");
        const progressWidth = `${
          (currentStepIndex / (steps.length - 1)) * 100
        }%`;

        // Calculate order total
        const totalOrderCost = order.productList.reduce(
          (sum, item) => sum + item.p_cost / 100,
          0
        );

        return (
          <div
            key={order.orderId}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Header: Order ID & Email */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Order ID
                </span>
                <p className="text-sm font-mono text-gray-700">
                  {order.orderId}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Customer
                </span>
                <p className="text-sm text-gray-700">{order.customerEmail}</p>
              </div>
            </div>

            <div className="p-6">
              {/* Items List */}
              <div className="space-y-4 mb-8">
                {order.productList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-50/50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {/* <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center font-bold text-xs">
                        {item.p_cat.substring(0, 3)}
                      </div> */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">
                          {item.p_name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.p_cat} • Qty: {item.p_qu}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      ${item.p_cost / 100}
                    </p>
                  </div>
                ))}
              </div>

              {/* Progress & Delivery Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t pt-6">
                {/* 1. Progress Bar */}
                <div className="md:col-span-2">
                  <div className="relative w-full h-2 bg-gray-100 rounded-full mb-3">
                    <div
                      className="absolute top-0 h-2 bg-green-500 rounded-full transition-all duration-700"
                      style={{ width: progressWidth }}
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    {steps.map((step, i) => (
                      <span
                        key={step}
                        className={`text-[10px] font-bold uppercase ${
                          i <= currentStepIndex
                            ? "text-green-600"
                            : "text-gray-300"
                        }`}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Total & Delivery Estimate */}
                <div className="bg-indigo-50 p-4 rounded-xl text-center md:text-right">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">
                    Est. Delivery
                  </span>
                  <p className="text-sm font-bold text-indigo-900 mb-1">
                    {order.estimatedDate}
                  </p>
                  <div className="border-t border-indigo-100 pt-1">
                    <span className="text-[10px] text-indigo-400 uppercase">
                      Total Paid
                    </span>
                    <p className="text-lg font-black text-indigo-600">
                      ${totalOrderCost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
