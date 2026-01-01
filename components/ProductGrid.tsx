"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import QuickAddBtn from "./quickAddBtn";
import { ProductCardProps, ProductGridProps } from "@/types/productsTypes";

// --- Product Card Component ---
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.p_imgs?.[0]?.url;
  
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900 flex flex-col">
      <Link href={`/products/${product.id}`} className="block relative aspect-[16/11] bg-slate-50/50 dark:bg-slate-800/50 overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.p_name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <div className="p-2.5 flex flex-col flex-1 gap-1.5">
        <div className="space-y-0.5">
          <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">
            {product.p_cat}
          </p>
          <h3
            className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 min-h-[2rem] group-hover:text-blue-600 transition-colors"
            title={product.p_name}
          >
            {product.p_name}
          </h3>
        </div>

        <div className="mt-auto pt-2 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[14px] font-black text-slate-900 dark:text-white leading-none">
              {Number(product.p_cost).toLocaleString()}
              <span className="text-[8px] ml-0.5 text-slate-400 uppercase font-bold">SDG</span>
            </span>
          </div>
          <QuickAddBtn product={product} />
        </div>
      </div>
    </div>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="w-full">
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-800 transition-colors">
             <Image src="/favicon.ico" alt="Empty" width={40} height={40} className="opacity-10 grayscale dark:invert" />
          </div>
          <h3 className="text-slate-900 dark:text-white font-black text-xl tracking-tight transition-colors">No components found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto font-medium mt-2 transition-colors">
            Try adjusting your technical specifications or filters to locate the hardware.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
