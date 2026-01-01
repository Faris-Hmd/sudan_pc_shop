import { ArrowRight, Loader2, ShieldCheck, CreditCard } from "lucide-react";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ProductType } from "@/types/productsTypes";
import { useCart } from "@/hooks/useCart";

function CheckoutBtn() {
  const { cart } = useCart();
  const [isPending, setIsPending] = useState(false);
  const user = useSession().data?.user;

  const total = useMemo(() => {
    return cart.reduce((acc, p) => acc + Number(p.p_cost) * Number(p.p_qu), 0);
  }, [cart]);

  function convertProductsToLineItems(products: ProductType[]) {
    return products.map((product) => {
      // Convert the string cost to a number and multiply by 100 for cents
      const unitAmountCents = Math.round(Number(product.p_cost) * 100);

      return {
        price_data: {
          product_data: {
            name: product.p_name,
          },
          currency: "USD",
          unit_amount: unitAmountCents,
        },
        quantity: product.p_qu,
        metadata: {
          id: product.id,
          p_cat: product.p_cat,
        },
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }
    if (isPending) return;
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsPending(true);
    try {
      const payloadCart = convertProductsToLineItems(cart);
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadCart),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url } = await response.json();

      if (url) {
        window.location.assign(url);
      }
    } catch (error) {
      setIsPending(false);
      console.error("Error during fetch operation:", error);
      toast.error("Something went wrong with checkout.");
    }
  }

  return (
    <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Order Summary</h2>

        {/* Breakdown */}
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex justify-between">
            <span>Subtotal ({cart.length} items)</span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{total.toLocaleString()} SDG</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600 dark:text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 my-4" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-base font-bold text-slate-800 dark:text-slate-100">Total</span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {total.toLocaleString()} <span className="text-xs">SDG</span>
          </span>
        </div>

        {/* Checkout Button */}
        <form onSubmit={handleSubmit}>
          <button
            disabled={isPending || cart.length === 0}
            className={cn(
              "group w-full py-4 px-6 flex items-center justify-center gap-3",
              "bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed",
              "text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-200/50 dark:shadow-none",
              "transition-all duration-200 active:scale-[0.98]",
              isPending && "opacity-80"
            )}
            type="submit"
          >
            {isPending ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <CreditCard size={24} />
            )}
            {isPending ? "Processing..." : "Checkout Securely"}
            {!isPending && (
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-600 mt-4 font-bold uppercase tracking-tight">
          <ShieldCheck size={14} />
          <span>SSL Secure Payment</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutBtn;
