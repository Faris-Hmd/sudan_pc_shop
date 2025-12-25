"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { ProductType } from "./ProductGridOneFile";

interface QuickAddBtnProps {
  product: ProductType;
}

const QuickAddBtn: React.FC<QuickAddBtnProps> = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cart: ProductType[] = JSON.parse(localStorage.getItem("sh") || "[]");
    setIsInCart(cart.some((p) => p.productId === product.productId));
  }, [product.productId]);

  const toggleCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop Link navigation if nested
    const cart: ProductType[] = JSON.parse(localStorage.getItem("sh") || "[]");
    let newCart;

    if (isInCart) {
      newCart = cart.filter((p) => p.productId !== product.productId);
      setIsInCart(false);
    } else {
      newCart = cart.filter((p) => p.productId !== product.productId);
      newCart.push({ ...product, q: 1 });
      setIsInCart(true);
    }

    localStorage.setItem("sh", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
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
