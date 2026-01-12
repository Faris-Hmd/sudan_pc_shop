import { ArrowRight, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ProductType } from "@/types/productsTypes";
import { useCart } from "@/hooks/useCart";
import useSWR from "swr";
import { getUser } from "@/services/userServices";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/Loading";

function CheckoutBtn() {
  const { cart } = useCart();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  // Fetch user data to check shipping info
  const { data: userData, isLoading: userLoading } = useSWR(
    user?.email ? `checkout-user-${user.email}` : null,
    () => getUser(user?.email as string),
  );

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

    // Validate shipping info
    if (
      !userData?.shippingInfo ||
      !userData.shippingInfo.address ||
      !userData.shippingInfo.phone
    ) {
      toast.error("Please complete your shipping information before checkout.");
      router.push("/profile/edit" as any);
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
    <div className="mt-2 bg-card rounded border border-border shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

        {/* Breakdown */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Subtotal ({cart.length} items)</span>
            <span className="font-medium text-foreground">
              {total.toLocaleString()} SDG
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-success font-bold uppercase text-[10px] tracking-wider">
              Free
            </span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
        </div>

        <div className="border-t border-border my-4" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-base font-bold text-foreground">Total</span>
          <span className="text-2xl font-black text-primary">
            {total.toLocaleString()} <span className="text-xs">SDG</span>
          </span>
        </div>

        {/* Checkout Button */}
        <form onSubmit={handleSubmit}>
          <button
            disabled={isPending || cart.length === 0}
            className={cn(
              "group w-full py-4 px-6 flex items-center justify-center gap-3",
              "bg-primary hover:opacity-90 disabled:bg-muted disabled:cursor-not-allowed",
              "text-primary-foreground text-lg font-bold rounded-xl shadow-lg shadow-primary/20",
              "transition-all duration-200 active:scale-[0.98]",
              isPending && "opacity-80",
            )}
            type="submit"
          >
            {isPending ? <Spinner size="md" /> : <CreditCard size={24} />}
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
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4 font-bold uppercase tracking-tight">
          <ShieldCheck size={14} />
          <span>SSL Secure Payment</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutBtn;
