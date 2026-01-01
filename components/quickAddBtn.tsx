"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { ProductType } from "@/types/productsTypes";
import { useCart, dispatchCartUpdate } from "@/hooks/useCart";

interface QuickAddBtnProps {
  product: ProductType;
}

const QuickAddBtn: React.FC<QuickAddBtnProps> = ({ product }) => {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isInCart = cart.some((p) => p.id === product.id);

  const toggleCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop Link navigation if nested
    let newCart;

    if (isInCart) {
      newCart = cart.filter((p) => p.id !== product.id);
    } else {
      newCart = [...cart, { ...product, p_qu: 1 }];
    }

    localStorage.setItem("sh", JSON.stringify(newCart));
    dispatchCartUpdate();
  };

  if (!mounted)
    return <div className="h-6 w-12 bg-gray-100 animate-pulse rounded" />;

  return (
    <button
      onClick={toggleCart}
      className={`transition-all duration-300 flex items-center justify-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${
        isInCart
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isInCart ? (
        <>
          <Check size={12} strokeWidth={3} /> In
        </>
      ) : (
        <>
          <ShoppingCart size={12} /> Add
        </>
      )}
    </button>
  );
};

export default QuickAddBtn;
