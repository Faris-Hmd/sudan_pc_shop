"use client";

import { Package, ShoppingCart } from "lucide-react";

interface SectionProps {
  productsNum: number;
  ordersNum: number;
}

export default function SectionCards({ productsNum, ordersNum }: SectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Products Card */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total Products
            </p>
            <h4 className="text-xl font-black text-slate-800">
              {productsNum.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-slate-100" />

      {/* Orders Card */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total Orders
            </p>
            <h4 className="text-xl font-black text-slate-800">
              {ordersNum.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
