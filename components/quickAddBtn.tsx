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
    e.preventDefault();
    e.stopPropagation(); 
    
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
    return <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800/50 rounded-xl animate-pulse" />;

  return (
    <button
      onClick={toggleCart}
      className={`group/btn relative h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-300 border ${
        isInCart
          ? "bg-slate-900 border-slate-900 dark:bg-white dark:border-white text-white dark:text-slate-900 shadow-lg shadow-slate-200 dark:shadow-none"
          : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-500"
      }`}
      title={isInCart ? "Remove from cart" : "Add to cart"}
    >
      <div className="relative flex items-center justify-center">
        {isInCart ? (
          <Check 
            size={18} 
            strokeWidth={3} 
            className="animate-in zoom-in fade-in duration-300" 
          />
        ) : (
          <ShoppingCart 
            size={18} 
            strokeWidth={2} 
            className="transition-transform duration-300 group-hover/btn:scale-110" 
          />
        )}
      </div>
    </button>
  );
};

export default QuickAddBtn;