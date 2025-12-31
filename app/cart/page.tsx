"use client";
import { ArrowRight, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckoutBtn from "./components/CheckoutBtn";
import { ProductType } from "@/types/productsTypes";
function page() {
  const [cart, setCart] = useState<ProductType[]>([]);
  useEffect(() => {
    // Ensure we're in a browser environment and localStorage is available
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      const stored = localStorage.getItem("sh");
      const _cart = stored ? JSON.parse(stored) : [];
      setCart(_cart);
    }
  }, []);
  // Remove an item from the cart and persist to localStorage
  function removeFromCart(id: string) {
    const updated = cart.filter((p) => p.id !== id);
    setCart(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("sh", JSON.stringify(updated));
    }
  }
  function CartList() {
    return (
      <div className="p-2">
        {cart.map(
          (
            product // Individual Cart Item Card
          ) => (
            <div
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 flex items-center justify-between transition duration-150 hover:shadow-md"
              key={product.id}
            >
              <div className="flex items-center gap-4">
                <Link
                  href={`/products/${product.id}`}
                  className="relative w-20 h-20 shrink-0"
                >
                  <Image
                    loading="eager"
                    className="object-cover rounded-lg"
                    sizes="100px"
                    fill
                    src={
                      product.p_imgs.length > 0
                        ? product.p_imgs[0].url
                        : "/placeholder.png"
                    }
                    alt={product.p_name}
                  />
                </Link>

                <div className="flex flex-col">
                  <div className="text-base font-semibold text-gray-800 line-clamp-1">
                    {product.p_name}
                  </div>
                  <span className="text-sm font-bold text-green-700">
                    ${product.p_cost} SDG
                  </span>
                  <span className="text-xs text-gray-500">
                    | {product.p_cat}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-800 p-2 flex items-center justify-center rounded-full font-semibold w-8 h-8 shrink-0">
                  {product.p_qu}
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-sm text-red-600 bg-red-50 p-2 rounded hover:bg-red-100 transition"
                  aria-label="Remove item"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
  return (
    <div className="container mx-auto md:p-8 ">
      {/* Header Section - Only show checkout button if cart has items */}
      <header className="mb-2 flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Cart
        </h1>
      </header>

      {/* Cart Items List Container */}
      {cart.length > 0 ? (
        <>
          <CartList />
          <CheckoutBtn />
        </>
      ) : (
        // Empty Cart Message
        <div className="flex flex-col items-center justify-center  p-10 md:p-20 rounded-3xl  text-center ">
          {/* Visual Element */}
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>

          {/* Engaging Copy */}
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            No products found
          </h2>
          <p className="text-slate-500 max-w-xs mx-auto mb-8 text-sm leading-relaxed">
            Looks like you haven't add any products to cart yet. Exploring our
            latest products to fill this up!
          </p>

          {/* Clear Call-to-Action */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default page;
