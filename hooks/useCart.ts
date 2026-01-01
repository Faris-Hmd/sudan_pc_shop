"use client";

import { useState, useEffect } from "react";
import { ProductType } from "@/types/productsTypes";

export type CartProduct = ProductType & { p_qu: number };

const CART_KEY = "sh";

export function useCart() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const getCart = (): CartProduct[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse cart", e);
      return [];
    }
  };

  useEffect(() => {
    // Initial fetch
    setCart(getCart());

    const handleStorageChange = () => {
      setCart(getCart());
    };

    // Native storage event (for cross-tab)
    window.addEventListener("storage", handleStorageChange);
    // Custom event (for same-tab)
    window.addEventListener("cart-updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cart-updated", handleStorageChange);
    };
  }, []);

  return { cart, cartCount: cart.length };
}

export const dispatchCartUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
};
