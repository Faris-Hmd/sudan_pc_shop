"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductGridProps, ProductCardProps } from "@/types/productsTypes";
import QuickAddBtn from "./quickAddBtn";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. Product Card Component ---
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.p_imgs?.[0]?.url || "/placeholder.png";

  return (
    <div className="group relative flex flex-col bg-card border border-border rounded overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50">
      {/* Visual Area */}
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-[5/3] bg-muted overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={product.p_name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-1 left-3 overflow-hidden z-10">
          <span className="px-2 py-0.5 bg-background/90 backdrop-blur-sm border border-border rounded-md text-[9px] font-black text-primary uppercase tracking-widest">
            {product.p_cat}
          </span>
        </div>
      </Link>

      {/* Info Area */}
      <div className="p-2 md:p-3 flex flex-col flex-1 gap-1.5">
        <h3 className="text-[11px] md:text-xs font-bold text-foreground leading-tight line-clamp-2 min-h-[2rem]">
          {product.p_name}
        </h3>

        <div className="mt-auto pt-2 border-t flex items-center justify-between gap-1.5">
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-black text-foreground leading-none">
              {Number(product.p_cost).toLocaleString()}
              <span className="text-[8px] ml-0.5 text-muted-foreground uppercase font-bold">
                SDG
              </span>
            </span>
          </div>

          <div className="shrink-0 scale-75 md:scale-90 origin-right">
            <QuickAddBtn product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. Main Grid Component ---
interface ExtendedGridProps extends ProductGridProps {
  showSort?: boolean;
}

const ProductGrid: React.FC<ExtendedGridProps> = ({
  products,
  showSort = false,
}) => {
  const [sortBy, setSortBy] = useState<"name" | "price_asc" | "price_desc">(
    "name",
  );

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "name")
      return list.sort((a, b) => a.p_name.localeCompare(b.p_name));
    if (sortBy === "price_asc")
      return list.sort((a, b) => Number(a.p_cost) - Number(b.p_cost));
    if (sortBy === "price_desc")
      return list.sort((a, b) => Number(b.p_cost) - Number(a.p_cost));
    return list;
  }, [products, sortBy]);

  return (
    <div className="w-full px-1 py-2 md:py-6">
      {/* --- CONDITIONAL SORTING BAR --- */}
      {showSort && products.length > 0 && (
        <div className="flex items-center justify-between mb-4 max-w-screen-2xl mx-auto px-1">
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-primary rounded text-primary-foreground">
              <ArrowUpDown size={12} />
            </div>
            <p className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">
              Sort
            </p>
          </div>

          <div className="flex items-center gap-1 bg-muted p-0.5 rounded border border-border">
            <button
              onClick={() => setSortBy("name")}
              className={cn(
                "px-2 py-1 text-[8px] font-black uppercase rounded transition-all",
                sortBy === "name"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              A-Z
            </button>
            <button
              onClick={() => setSortBy("price_asc")}
              className={cn(
                "px-2 py-1 text-[8px] font-black uppercase rounded transition-all",
                sortBy === "price_asc"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              $ Low
            </button>
            <button
              onClick={() => setSortBy("price_desc")}
              className={cn(
                "px-2 py-1 text-[8px] font-black uppercase rounded transition-all",
                sortBy === "price_desc"
                  ? "bg-background text-primary shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              $ High
            </button>
          </div>
        </div>
      )}

      {/* Grid Display */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3 max-w-screen-2xl mx-auto">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-screen-2xl mx-auto rounded border-2 border-dashed border-border bg-muted/30">
          <h3 className="text-foreground font-black text-sm uppercase">
            No items found
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
