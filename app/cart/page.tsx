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
      p.id === id ? { ...p, p_qu: newQuantity } : p,
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
            className="group bg-card border border-border rounded p-4 sm:p-6 flex sm:flex-row items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
            key={product.id}
          >
            {/* Product Image */}
            <Link
              href={`/products/${product.id}`}
              className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/50"
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
                    className="text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
                  >
                    {product.p_name}
                  </Link>
                  <p className="text-sm text-muted-foreground font-medium">
                    {product.p_cat}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-muted-foreground hover:text-error hover:bg-error/10 p-2 rounded-xl transition-all"
                  aria-label="Remove item"
                >
                  <Trash size={18} />
                </button>
              </div>

              <div className="flex items-end justify-between pt-2">
                <span className="text-lg font-black text-foreground">
                  {Number(product.p_cost).toLocaleString()}
                  <span className="text-[10px] ml-1 text-muted-foreground font-bold uppercase">
                    SDG
                  </span>
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-1 border border-border">
                  <button
                    onClick={() => updateQuantity(product.id, product.p_qu - 1)}
                    disabled={product.p_qu <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={14} strokeWidth={3} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-foreground">
                    {product.p_qu}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, product.p_qu + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-card text-primary shadow-sm border border-border hover:bg-primary/10 transition-colors"
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
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-foreground">
              Shopping Cart
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium m-0">
              {cart.length > 0
                ? `You have ${cart.length} items in your cart`
                : "Your cart is currently empty"}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-8">
        {cart.length > 0 ? (
          <div className="lg:grid lg:grid-cols-3 lg:gap-10 items-start">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <CartList />
            </div>

            {/* Right Column: Checkout Summary */}
            <div className="mt-8 lg:mt-0 lg:sticky lg:top-24">
              <CheckoutBtn />
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-card rounded-[2.5rem] border border-dashed border-border px-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground max-w-sm text-center mb-8">
              Looks like you haven't added anything to your cart yet. Browse our
              categories to find cool gadgets!
            </p>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 active:scale-95"
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
