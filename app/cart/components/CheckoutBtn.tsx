import { ArrowRight, Loader2, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ProductType } from "@/types/productsTypes";

function CheckoutBtn() {
  const [total, setTotal] = useState<number>(0);
  const [cart, setCart] = useState<ProductType[]>([]);
  const [isPending, setIsPending] = useState(false);
  const user = useSession().data?.user;
  useEffect(() => {
    // In Next.js/SSR, window check is standard, but keeping it clean:
    const raw = localStorage.getItem("sh");
    if (!raw) return;

    try {
      const parsedCart = JSON.parse(raw) as ProductType[];
      setCart(parsedCart);
    } catch (err) {
      console.error("Failed to parse cart:", err);
      localStorage.removeItem("sh"); // Clean up corrupt data
    }
  }, []);
  useEffect(() => {
    // calculate total ensuring numeric arithmetic (p_cost or q may be strings)
    let calculetedTotal = 0;
    cart.forEach((p) => {
      calculetedTotal += Number(p.p_cost) * Number(p.p_qu);
    });
    setTotal(calculetedTotal);
  }, [cart]);

  function convertProductsToLineItems(products: ProductType[]) {
    return products.map((product) => {
      // Convert the string cost to a number and multiply by 100 for cents (e.g., $1.29 becomes 12900)
      const unitAmountCents = Math.round(Number(product.p_cost) * 100);

      return {
        price_data: {
          product_data: {
            name: product.p_name,
          },
          currency: "USD", // Currency is hardcoded as per your example
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
    const payloadCart = convertProductsToLineItems(cart);
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }
    if (isPending) return; // Prevent multiple submissions
    if (cart.length === 0) {
      toast.error(
        "Your cart is empty. Please add items to proceed to checkout."
      );
      return;
    }

    console.log("use server");
    setIsPending(true);
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        // Specify the method
        headers: {
          "Content-Type": "application/json", // Declare the content type
        },
        body: JSON.stringify(payloadCart), // Convert the body data to a JSON string
      });

      if (!response.ok) {
        // Handle non-successful HTTP statuses (e.g., 404, 500)
        setIsPending(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url } = await response.json();

      // Redirect the user to the Stripe Checkout page
      console.log(url);
      if (url) {
        window.location.assign(url);
      }
    } catch (error) {
      setIsPending(false);
      console.error("Error during fetch operation:", error); // Handle network errors or the error thrown above
    }
  }
  return (
    <form onSubmit={handleSubmit} className="m-2">
      <button
        disabled={isPending}
        className={cn(
          "group relative w-full sm:min-w-[240px] flex items-center justify-between gap-4 p-1.5 pl-5 pr-1.5",
          "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400",
          "text-white rounded-xl shadow-lg shadow-blue-200 transition-all duration-200",
          "active:scale-[0.98] active:shadow-inner overflow-hidden",
          isPending && "cursor-not-allowed"
        )}
        type="submit"
      >
        {/* Left Side: Label & Icon */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <ShoppingCart
              size={20}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          )}
          <span className="font-bold tracking-tight text-sm md:text-base">
            {isPending ? "Processing..." : "Checkout Now"}
          </span>
        </div>

        {/* Right Side: Price Tag (Visual Anchor) */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
          <span className="text-xs font-medium opacity-80 uppercase">
            Total
          </span>
          <span className="font-black text-white text-base md:text-lg">
            ${total.toLocaleString()}
          </span>
          {!isPending && (
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform ml-1"
            />
          )}
        </div>

        {/* Subtle Shine Effect (Animated on hover) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
      </button>

      {/* Secure Checkout Badge */}
    </form>
  );
}

export default CheckoutBtn;
