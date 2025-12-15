// components/ProductGridCustomData.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

// --- Types ---
interface ProductImage {
  url: string;
}

// Updated interface to match the user's data structure
export interface ProductType {
  productId: string;
  p_name: string;
  p_cost: string; // Storing as string as provided in the input data
  p_cat: string;
  p_details: string;
  p_imgs: ProductImage[];
  q: number; // Quantity
}

interface ProductCardProps {
  product: ProductType;
}

interface ProductGridProps {
  products: ProductType[]; // The prop you will pass in
}

// --- Product Card Component (Internal) ---
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Use the first image URL if available, otherwise a placeholder
  const imageUrl = product.p_imgs?.[0]?.url || "/images/placeholder.jpg";
  // Safely parse the cost string into a number for display formatting
  const costNumber = parseFloat(product.p_cost) || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl ">
      <Link href={`/products/${product.productId}`}>
        <div className="block relative h-48">
          {/* Use Next.js Image component for performance */}
          <Image
            src={imageUrl}
            alt={product.p_name}
            fill
            // quality={75}
            className="transition duration-300 hover:opacity-90 object-cover"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm font-semibold text-blue-600 mb-1">
          {product.p_cat}
        </p>
        <h3
          className="text-lg font-bold text-gray-800 mb-2 truncate"
          title={product.p_name}
        >
          {product.p_name}
        </h3>
        <p className="text-2xl font-bold text-gray-900">
          ${costNumber.toFixed(2)}
        </p>

        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// --- Main Product Grid Container Component (Dynamic) ---
const ProductGridCustomData: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div
      id="shop"
      className="container mx-auto p-4 md:p-8 bg-gray-100 min-h-screen"
    >
      {/* Responsive grid layout using CSS Grid and Tailwind utilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            // Key uses the unique productId
            <ProductCard key={Math.random()} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGridCustomData;
