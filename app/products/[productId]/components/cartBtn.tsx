"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Trash2, Check } from "lucide-react";
import { ProductType } from "@/types/productsTypes";

function CartBtn({ product }: { product: ProductType }) {
  const [isInCart, setIsInCart] = useState(false);
  const [qu, setQu] = useState("1"); // Use string to match Select value type
  const [mounted, setMounted] = useState(false);

  // 1. Handle Hydration: Only run on client
  useEffect(() => {
    setMounted(true);
    const savedCart = JSON.parse(localStorage.getItem("sh") || "[]");
    const item = savedCart.find(
      (p: ProductType) => p.productId === product.productId
    );
    if (item) {
      setIsInCart(true);
      setQu(item.p_qu.toString());
    }
  }, [product.productId]);

  const getCart = () => JSON.parse(localStorage.getItem("sh") || "[]");

  const updateCart = (quantity: string, isRemoving = false) => {
    const currentCart = getCart();
    let newCart: ProductType[] = [];

    if (isRemoving) {
      newCart = currentCart.filter(
        (p: ProductType) => p.productId !== product.productId
      );
      setIsInCart(false);
      setQu("1");
    } else {
      // Remove old version and add new version with updated quantity
      newCart = currentCart.filter(
        (p: ProductType) => p.productId !== product.productId
      );
      newCart.push({ ...product, p_qu: parseInt(quantity) });
      setIsInCart(true);
      setQu(quantity.toString());
    }

    localStorage.setItem("sh", JSON.stringify(newCart));
    // Optional: Dispatch custom event to update Navbar cart counter
    window.dispatchEvent(new Event("storage"));
  };

  // Prevent hydration error (server renders nothing, client renders button)
  if (!mounted)
    return <div className="h-10 w-full bg-gray-100 animate-pulse rounded" />;

  return (
    <div className="w-full flex items-center gap-2">
      {/* Quantity Selector - Always Visible */}
      <Select value={qu} onValueChange={(value) => updateCart(value)}>
        <SelectTrigger className="w-20 h-10 font-bold border-gray-200">
          <SelectValue placeholder="Qty" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Primary Action Button */}
      {!isInCart ? (
        <button
          type="button"
          onClick={() => updateCart(qu)}
          className="grow flex items-center justify-center gap-2 h-10 text-white font-bold rounded bg-green-600 hover:bg-green-700 active:scale-95 transition-all"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      ) : (
        <button
          type="button"
          onClick={() => updateCart(qu, true)}
          className="grow flex items-center justify-center gap-2 h-10 text-white font-bold rounded bg-red-500 hover:bg-red-600 active:scale-95 transition-all"
        >
          <Trash2 size={16} />
          Remove
        </button>
      )}

      {/* Visual Feedback for "In Cart" state */}
      {isInCart && (
        <div className="flex items-center justify-center w-10 h-10 text-green-600 bg-green-50 rounded-full border border-green-200">
          <Check size={20} strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export default CartBtn;
