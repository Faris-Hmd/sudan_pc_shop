"use client";
import { ArrowRight, ShoppingBag, Trash, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart, dispatchCartUpdate } from "@/hooks/useCart";
import CheckoutBtn from "./components/CheckoutBtn";

function page() {
  const { cart } = useCart();

  // Remove an item from the cart
  function removeFromCart(id: string) {
    const updated = cart.filter((p) => p.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("sh", JSON.stringify(updated));
      dispatchCartUpdate();
    }
  }

  // Update item quantity
  function updateQuantity(id: string, newQuantity: number) {
    if (newQuantity < 1) return;
    const updated = cart.map((p) =>
      p.id === id ? { ...p, p_qu: newQuantity } : p
    );

    if (typeof window !== "undefined") {
      localStorage.setItem("sh", JSON.stringify(updated));
      dispatchCartUpdate();
    }
  }

  function CartList() {
    return (
      <div className="space-y-4">
        {cart.map((product) => (
          <div
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 sm:p-6 flex flex sm:flex-row items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900"
            key={product.id}
          >
            {/* Product Image */}
            <Link
              href={`/products/${product.id}`}
              className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50"
            >
              <Image
                loading="eager"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100px, 120px"
                fill
                src={
                  product.p_imgs?.length > 0
                    ? product.p_imgs[0].url
                    : "/placeholder.png"
                }
                alt={product.p_name}
              />
            </Link>

            {/* Product Details */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-lg font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {product.p_name}
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {product.p_cat}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-slate-400 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-xl transition-all"
                  aria-label="Remove item"
                >
                  <Trash size={18} />
                </button>
              </div>

              <div className="flex items-end justify-between pt-2">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {Number(product.p_cost).toLocaleString()}
                  <span className="text-[10px] ml-1 text-slate-400 font-bold uppercase">SDG</span>
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => updateQuantity(product.id, product.p_qu - 1)}
                    disabled={product.p_qu <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={14} strokeWidth={3} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-slate-700 dark:text-slate-300">
                    {product.p_qu}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, product.p_qu + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <Plus size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {cart.length > 0
              ? `You have ${cart.length} items in your cart`
              : "Your cart is currently empty"}
          </p>
        </header>

        {cart.length > 0 ? (
          <div className="lg:grid lg:grid-cols-3 lg:gap-10 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <CartList />
            </div>

            {/* Right Column: Checkout Summary */}
            <div className="mt-8 lg:mt-0 lg:sticky lg:top-24">
              <CheckoutBtn />
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <ShoppingBag className="w-10 h-10 text-blue-500 dark:text-blue-400" />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center mb-8">
              Looks like you haven't added anything to your cart yet. Browse our
              categories to find cool gadgets!
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-95"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
