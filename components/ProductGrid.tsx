// components/ProductGridCustomData.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import QuickAddBtn from "./quickAddBtn";
import { ProductCardProps, ProductGridProps } from "@/types/productsTypes";

// --- Product Card Component (Internal) ---
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.p_imgs?.[0]?.url;
  const costNumber = product.p_cost || 0;
  return (
    <div className="bg-white rounded-md border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${product.productId}`}>
        <div className="block relative h-32 md:h-36">
          {" "}
          {/* Reduced height from h-48 */}
          <Image
            src={imageUrl}
            alt={product.p_name}
            fill
            sizes="(max-width: 768px) 33vw, 20vw"
            className="transition duration-300 hover:scale-105 object-cover"
          />
        </div>
      </Link>

      <div className="p-2.5">
        {" "}
        {/* Reduced padding from p-5 */}
        <p className="text-[11px] font-bold text-blue-600 uppercase tracking-tighter mb-0.5">
          {product.p_cat}
        </p>
        <h3
          className="text-[14px] font-bold text-gray-800 leading-tight line-clamp-2 min-h-[2.4em]"
          title={product.p_name}
        >
          {product.p_name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-black text-gray-900">
            ${costNumber.toFixed(2)}
          </p>

          {/* Small icon-only or text-only button for compactness */}
          <QuickAddBtn product={product} />
        </div>
      </div>
    </div>
  );
};

// --- Main Product Grid Container Component (Dynamic) ---
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div id="shop" className="container mx-auto p-2 md:p-4  ">
      {/* 
          Increased density: 
          - 3 columns on mobile
          - 4 on tablet
          - 5-6 on desktop 
          - Reduced gaps to 3 (12px)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {products.length > 0 ? (
          products.map((product) => (
            // Use a real ID instead of Math.random() for better performance
            <ProductCard
              key={product.productId || product.productId}
              product={product}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-[10px] uppercase font-bold tracking-widest text-gray-400 py-20">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
