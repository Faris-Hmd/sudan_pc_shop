"use client";

import { Heart } from "lucide-react";
import { product_wish, product_wish_remove } from "../actions/product_wish";

function WishlistBtn({ productId, isWish }) {
  if (isWish) {
    return (
      <button
        onClick={() => product_wish_remove(productId)}
        className="flex items-center gap-2 p-2 rounded shadow"
      >
        Remove
        <Heart className="text-pink-500" size={17} />
      </button>
    );
  }
  return (
    <button
      onClick={() => product_wish(productId)}
      className="flex items-center gap-2  p-2 rounded shadow"
    >
      Add
      <Heart size={17} />
    </button>
  );
}

export default WishlistBtn;
