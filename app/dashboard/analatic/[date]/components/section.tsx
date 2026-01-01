"use client";

import { Package, ShoppingCart, DollarSign } from "lucide-react";

interface SectionProps {
  productsNum: number;
  ordersNum: number;
  totalSales: number;
}

export default function SectionCards({
  productsNum,
  ordersNum,
  totalSales,
}: SectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Products Card */}
      <div className="flex items-center gap-4 p-2 border-b sm:border-b-0 sm:border-r border-slate-100 last:border-0">
        <div className="p-3 bg-blue-50 rounded-xl">
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

      {/* Orders Card */}
      <div className="flex items-center gap-4 p-2 border-b sm:border-b-0 sm:border-r border-slate-100 last:border-0">
        <div className="p-3 bg-emerald-50 rounded-xl">
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

      {/* Revenue Card (New) */}
      <div className="flex items-center gap-4 p-2">
        <div className="p-3 bg-indigo-50 rounded-xl">
          <DollarSign className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Total Revenue
          </p>
          <h4 className="text-xl font-black text-slate-800">
            ${totalSales.toLocaleString()}
          </h4>
        </div>
      </div>
    </div>
  );
}
