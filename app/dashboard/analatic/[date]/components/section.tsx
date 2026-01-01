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
      <div className="flex items-center gap-4 p-2 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Digital Assets
          </p>
          <h4 className="text-xl font-black text-slate-800 dark:text-white">
            {productsNum.toLocaleString()}
          </h4>
        </div>
      </div>

      {/* Orders Card */}
      <div className="flex items-center gap-4 p-2 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
          <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Total Orders
          </p>
          <h4 className="text-xl font-black text-slate-800 dark:text-white">
            {ordersNum.toLocaleString()}
          </h4>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="flex items-center gap-4 p-2 transition-colors">
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
          <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Gross Revenue
          </p>
          <div className="flex items-baseline gap-1">
            <h4 className="text-xl font-black text-slate-800 dark:text-white">
              {totalSales.toLocaleString()}
            </h4>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">SDG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
