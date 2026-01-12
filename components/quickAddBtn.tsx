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
    return <div className="h-9 w-9 bg-muted rounded-xl animate-pulse" />;

  return (
    <button
      onClick={toggleCart}
      className={`group/btn relative h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-300 border ${
        isInCart
          ? "bg-foreground border-foreground text-background shadow-lg shadow-foreground/5"
          : "bg-transparent border-border text-muted-foreground hover:border-primary hover:text-primary"
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
