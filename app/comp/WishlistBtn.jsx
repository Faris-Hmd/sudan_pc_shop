"use client";

import { Heart } from "lucide-react";
import { product_wish } from "../actions/product_wish";

function WishlistBtn({ productId }) {
  return (
    <button
      onClick={() => product_wish(productId)}
      className="flex items-center gap-2 bg-blue-300 p-2 rounded shadow"
    >
      wishlist <Heart size={17} />
    </button>
  );
}

export default WishlistBtn;
