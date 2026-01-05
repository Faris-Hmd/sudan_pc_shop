"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductGridProps, ProductCardProps } from "@/types/productsTypes";
import QuickAddBtn from "./quickAddBtn";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

// --- 1. Product Card Component ---
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.p_imgs?.[0]?.url || "/placeholder.png";

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900">
      
      {/* Visual Area */}
      <Link 
        href={`/products/${product.id}`} 
        className="block relative aspect-[16/9] bg-slate-50 dark:bg-slate-800/50 overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={product.p_name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 shadow-sm">
          <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">
            {product.p_cat}
          </p>
        </div>
      </Link>

      {/* Info Area */}
      <div className="p-3 md:p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-[13px] md:text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.p_name}
        </h3>

        <div className="mt-auto pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[15px] md:text-lg font-black text-slate-900 dark:text-white leading-none">
              {Number(product.p_cost).toLocaleString()}
              <span className="text-[9px] ml-1 text-slate-400 dark:text-slate-500 uppercase font-bold">SDG</span>
            </span>
          </div>
          
          <div className="shrink-0 scale-90 md:scale-100 origin-right">
            <QuickAddBtn product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. Main Grid Component ---
interface ExtendedGridProps extends ProductGridProps {
  showSort?: boolean; // Conditional argument
}

const ProductGrid: React.FC<ExtendedGridProps> = ({ products, showSort = false }) => {
  const [sortBy, setSortBy] = useState<"name" | "price_asc" | "price_desc">("name");

  // Performant Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "name") return list.sort((a, b) => a.p_name.localeCompare(b.p_name));
    if (sortBy === "price_asc") return list.sort((a, b) => Number(a.p_cost) - Number(b.p_cost));
    if (sortBy === "price_desc") return list.sort((a, b) => Number(b.p_cost) - Number(a.p_cost));
    return list;
  }, [products, sortBy]);

  return (
    <div className="w-full px-4 py-4 md:py-8">
      
      {/* --- CONDITIONAL SORTING BAR --- */}
      {showSort && products.length > 0 && (
        <div className="flex items-center justify-between mb-6 max-w-screen-2xl mx-auto px-1">
          <div className="flex items-center gap-2">
             <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                <ArrowUpDown size={14} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sort by</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
            <button 
              onClick={() => setSortBy("name")}
              className={cn(
                "px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all",
                sortBy === "name" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" : "text-slate-400"
              )}
            >
              A-Z
            </button>
            <button 
              onClick={() => setSortBy("price_asc")}
              className={cn(
                "px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all",
                sortBy === "price_asc" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" : "text-slate-400"
              )}
            >
              $ Low
            </button>
            <button 
              onClick={() => setSortBy("price_desc")}
              className={cn(
                "px-3 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all",
                sortBy === "price_desc" ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm" : "text-slate-400"
              )}
            >
              $ High
            </button>
          </div>
        </div>
      )}

      {/* Grid Display */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5 max-w-screen-2xl mx-auto">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-screen-2xl mx-auto rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
             <Image src="/favicon.ico" alt="Empty" width={24} height={24} className="opacity-20 grayscale" />
          </div>
          <h3 className="text-slate-900 dark:text-white font-black text-lg uppercase tracking-tight">Zero Components</h3>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
            Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;