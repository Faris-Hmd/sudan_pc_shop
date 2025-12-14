"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function CartBtn({ product }) {
  if (typeof window === "undefined" || !window.localStorage) {
    // console.error("localStorage is not available.");
    return;
  }
  const [isInCart, setIsInCart] = useState(false);
  const [qu, setQu] = useState(1);
  const cart =
    typeof window !== "undefined"
      ? JSON.parse(localStorage?.getItem("sh"))
        ? JSON.parse(localStorage?.getItem("sh"))
        : []
      : [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsInCart(
        cart?.find((pro) =>
          pro.productId === product.productId ? true : false
        )
      );
    }
  }, []);

  useEffect(() => {
    if (isInCart) {
      if (typeof window !== "undefined") {
        const qq = parseInt(
          cart?.find((pro) => pro.productId === product.productId).q
        );
        setQu(qq);
      }
    }
  }, [isInCart]);

  function addToCart(productDetails, quantity = 1) {
    console.log("adddd");
    setIsInCart(true);
    const quantityToAdd = Number(quantity);
    if (quantityToAdd === 0) return;
    setQu(quantityToAdd);
    const newCart = cart.filter(
      (p) => p.productId !== productDetails.productId
    );
    newCart.push({ ...productDetails, q: quantityToAdd });
    localStorage.setItem("sh", JSON.stringify(newCart));
  }

  function removeFromCart(productDetails) {
    console.log("remove");
    setIsInCart(false);
    setQu(1);
    localStorage.setItem(
      "sh",
      JSON.stringify(
        cart.filter((p) => p.productId !== productDetails.productId)
      )
    );
  }

  return !isInCart ? (
    <form className="w-full flex flex-wrap gap-2">
      <Select value={qu} onValueChange={(q) => addToCart(product, q)}>
        <SelectTrigger className="m-auto w-15">
          <SelectValue placeholder="qu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={1} value={1}>
            1
          </SelectItem>
          <SelectItem key={2} value={2}>
            2
          </SelectItem>
          <SelectItem key={3} value={3}>
            3
          </SelectItem>
          <SelectItem key={4} value={4}>
            4
          </SelectItem>
        </SelectContent>
      </Select>
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="grow text-white rounded  bg-green-600"
      >
        add to cart
      </button>
    </form>
  ) : (
    <form className="w-full flex flex-wrap gap-2">
      <Select value={qu} onValueChange={(q) => addToCart(product, q)}>
        <SelectTrigger className="m-auto w-15">
          <SelectValue placeholder="qu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={1} value={1}>
            1
          </SelectItem>
          <SelectItem key={2} value={2}>
            2
          </SelectItem>
          <SelectItem key={3} value={3}>
            3
          </SelectItem>
          <SelectItem key={4} value={4}>
            4
          </SelectItem>
        </SelectContent>
      </Select>
      <button
        type="button"
        onClick={() => removeFromCart(product)}
        className="grow text-white rounded  bg-red-400"
      >
        remove From Cart
      </button>
    </form>
  );
}

export default CartBtn;
