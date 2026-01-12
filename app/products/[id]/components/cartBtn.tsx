"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Trash2, Check, Plus } from "lucide-react";
import { ProductType } from "@/types/productsTypes";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/Loading";

type CartProduct = ProductType & { p_qu: number };
const CART_KEY = "sh";

function CartBtn({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState("1");
  const [inCart, setInCart] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getCart = (): CartProduct[] =>
    JSON.parse(localStorage.getItem(CART_KEY) || "[]");

  const saveCart = (cart: CartProduct[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    import("@/hooks/useCart").then(({ dispatchCartUpdate }) =>
      dispatchCartUpdate(),
    );
  };

  useEffect(() => {
    const item = getCart().find((p) => p.id === product.id);
    if (item) {
      setInCart(true);
      setQuantity(item.p_qu.toString());
    }
  }, [product.id]);

  const upsert = useCallback(
    (q: string) => {
      setIsUpdating(true);
      const cart = getCart().filter((p) => p.id !== product.id);
      cart.push({ ...product, p_qu: Number(q) });
      saveCart(cart);
      setInCart(true);

      // Artificial delay for tactile feedback
      setTimeout(() => setIsUpdating(false), 400);
    },
    [product],
  );

  const remove = useCallback(() => {
    saveCart(getCart().filter((p) => p.id !== product.id));
    setInCart(false);
    setQuantity("1");
  }, [product.id]);

  return (
    <div className="group flex flex-col sm:flex-row items-center gap-3 w-full">
      {/* --- QUANTITY SELECTOR --- */}
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Quantity
        </p>
        <Select
          value={quantity}
          onValueChange={(v) => {
            setQuantity(v);
            if (inCart) upsert(v);
          }}
        >
          <SelectTrigger className="w-full sm:w-24 h-12 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl font-black text-xs ring-offset-blue-600 focus:ring-blue-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-xl">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <SelectItem
                key={n}
                value={n.toString()}
                className="text-xs font-bold uppercase tracking-tighter"
              >
                {n.toString().padStart(2, "0")} Units
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* --- MAIN ACTION BUTTON --- */}
      <div className="flex flex-col gap-1 w-full flex-1">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Deployment
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => upsert(quantity)}
            className={cn(
              "relative flex-1 h-12 flex items-center justify-center gap-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.97] overflow-hidden",
              inCart
                ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl shadow-slate-900/10"
                : "bg-blue-600 text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700",
            )}
          >
            {isUpdating ? (
              <Spinner size="sm" />
            ) : inCart ? (
              <>
                <Check size={16} strokeWidth={3} className="text-blue-500" />
                Update Order
              </>
            ) : (
              <>
                <Plus size={16} strokeWidth={3} />
                Add to Cart
              </>
            )}
          </button>

          {/* --- REMOVE BUTTON --- */}
          {inCart && (
            <button
              onClick={remove}
              title="Remove from system"
              className="h-12 w-12 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all active:scale-90 border border-red-100 dark:border-red-500/20"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartBtn;
