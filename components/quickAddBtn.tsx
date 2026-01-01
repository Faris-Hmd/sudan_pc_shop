"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Check, Plus } from "lucide-react";
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
    e.preventDefault();
    e.stopPropagation(); // Critical for when used inside Link
    
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
    return <div className="h-8 w-8 bg-slate-50 dark:bg-slate-800 rounded-lg animate-pulse" />;

  return (
    <button
      onClick={toggleCart}
      className={`h-8 w-8 flex items-center justify-center rounded-xl transition-all duration-500 shadow-sm hover:-translate-y-0.5 active:scale-90 group/btn ${
        isInCart
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 dark:shadow-none"
          : "bg-slate-900 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-slate-200 dark:shadow-none"
      }`}
      title={isInCart ? "Remove from cart" : "Add to cart"}
    >
      {isInCart ? (
        <Check size={16} strokeWidth={3} className="animate-in zoom-in fade-in duration-500" />
      ) : (
        <Plus size={16} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform duration-300" />
      )}
    </button>
  );
};

export default QuickAddBtn;
