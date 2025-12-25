"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Package, Clock } from "lucide-react";

const OrderList = ({ orders, steps }) => {
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p- space-y-4  h-full pb-24">
      {orders.map((order) => {
        const isExpanded = expandedOrders[order.orderId];
        const currentStepIndex = steps.indexOf(order.status || "Processing");
        const progressWidth = `${
          (currentStepIndex / (steps.length - 1)) * 100
        }%`;
        const totalOrderCost = order.productList.reduce(
          (sum, item) => sum + item.p_cost,
          0
        );

        return (
          <div
            key={order.orderId}
            className=" bg-white rounded-2xl shadow-sm border m-2 border-gray-100 overflow-hidden transition-all duration-300"
          >
            {/* Header: Clickable to toggle */}
            <div
              onClick={() => toggleOrder(order.orderId)}
              className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors gap-4"
            >
              {/* Summary Info */}
              <div className="flex items-center gap-4 min-w-fit">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    ${totalOrderCost.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.productList.length} Items
                  </p>
                </div>
              </div>

              {/* Steps visible in collapsed state */}
              <div className="flex-1 px-2 md:px-8">
                <div className="relative w-full h-1.5 bg-gray-200 rounded-full mb-2">
                  <div
                    className="absolute top-0 h-1.5 bg-green-500 rounded-full transition-all duration-700"
                    style={{ width: progressWidth }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  {steps.map((step, i) => (
                    <span
                      key={step}
                      className={`text-[9px] font-black uppercase tracking-tighter ${
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

              {/* Toggle & Date */}
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-2 md:pt-0">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase">
                      Est. Delivery
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-700">
                    {order.estimatedDate}
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </div>
            </div>

            {/* Expandable Product Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6 bg-white">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Itemized Receipt
                </h3>
                <div className="space-y-3">
                  {order.productList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">
                          {item.p_name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {item.p_cat} • Qty: {item.p_qu}
                        </p>
                      </div>
                      <p className="text-sm font-mono font-semibold text-gray-600">
                        ${(item.p_cost / 100).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    Order Ref:{" "}
                    <span className="font-mono">
                      {order.orderId.slice(0, 16).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    Sent to: {order.customerEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
