"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Trash2, Check } from "lucide-react";
import { ProductType } from "@/types/productsTypes";

type CartProduct = ProductType & { p_qu: number };

const CART_KEY = "sh";

function CartBtn({ product }: { product: ProductType }) {
  const [quantity, setQuantity] = useState("1");
  const [inCart, setInCart] = useState(false);

  /* ---------------- Helpers ---------------- */
  const getCart = (): CartProduct[] =>
    JSON.parse(localStorage.getItem(CART_KEY) || "[]");

  const saveCart = (cart: CartProduct[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch custom event for reactivity
    import("@/hooks/useCart").then(({ dispatchCartUpdate }) =>
      dispatchCartUpdate()
    );
  };

  /* ---------------- Init ---------------- */
  useEffect(() => {
    const item = getCart().find((p) => p.id === product.id);
    if (item) {
      setInCart(true);
      setQuantity(item.p_qu.toString());
    }
  }, [product.id]);

  /* ---------------- Actions ---------------- */
  const upsert = useCallback(
    (q: string) => {
      const cart = getCart().filter((p) => p.id !== product.id);
      cart.push({ ...product, p_qu: Number(q) });
      saveCart(cart);
      setInCart(true);
    },
    [product]
  );

  const remove = useCallback(() => {
    saveCart(getCart().filter((p) => p.id !== product.id));
    setInCart(false);
    setQuantity("1");
  }, [product.id]);

  /* ---------------- UI ---------------- */
  return (
    <div className="flex items-center gap-2 w-full">
      {/* Quantity */}
      <Select
        value={quantity}
        onValueChange={(v) => {
          setQuantity(v);
          if (inCart) upsert(v); // 🔥 auto-update
        }}
      >
        <SelectTrigger className="w-20 h-10 font-semibold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <SelectItem key={n} value={n.toString()}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Main Action */}
      <button
        onClick={() => upsert(quantity)}
        className="flex-1 h-10 flex items-center justify-center gap-2
                   rounded-lg bg-green-600 text-white font-semibold
                   hover:bg-green-700 active:scale-95 transition"
      >
        <ShoppingCart size={16} />
        {inCart ? "Update" : "Add"}
      </button>

      {/* Remove */}
      {inCart && (
        <button
          onClick={remove}
          title="Remove from cart"
          className="w-10 h-10 flex items-center justify-center
                     rounded-lg bg-red-50 text-red-600
                     hover:bg-red-100 active:scale-95 transition"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Status */}
      {inCart && (
        <div
          className="w-10 h-10 flex items-center justify-center
                        rounded-full border border-green-300
                        bg-green-50 text-green-600"
        >
          <Check size={18} strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export default CartBtn;
