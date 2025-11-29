import { Heart } from "lucide-react";
import React from "react";

function WishlistBtn({productId}) {
  return (
    <button onClick={}  className="flex items-center gap-2 bg-blue-300 p-2 rounded shadow">
      wishlist <Heart size={17} />
    </button>
  );
}

export default WishlistBtn;
