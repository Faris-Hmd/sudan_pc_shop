"use client";

import { Heart, Loader } from "lucide-react";
import { product_wish, product_wish_remove } from "../actions/product_wish";
import { useEffect, useState } from "react";
import getUser from "../data/getUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../app/db/firebase";

function WishlistBtn({ productId }) {
  const [user, setUser] = useState();
  const [isWish, setIsWish] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function getAuth() {
      const authRes = await getUser();
      setUser(authRes);
    }
    getAuth();
  }, []);

  useEffect(() => {
    if (user) {
      async function getIsWish() {
        const _docRef = doc(db, "users", user.email, "whish", productId);
        const _docsnapshot = await getDoc(_docRef);
        setIsWish(_docsnapshot.exists());
        setPending(false);
      }
      getIsWish();
    } else setPending(false);
  }, [user, pending]);
  if (pending) {
    return (
      <button className="opacity-75 flex items-center gap-2 p-2 rounded shadow">
        Wishlist
        <Loader className="animate-spin text-pink-500" size={17} />
      </button>
    );
  }

  if (isWish) {
    return (
      <button
        onClick={() => {
          // setIsWish(false);
          setPending(true);
          product_wish_remove(productId);
        }}
        className="flex items-center gap-2 p-2 rounded shadow"
      >
        Remove
        <Heart className="text-pink-500" size={17} />
      </button>
    );
  } else
    return (
      <button
        onClick={() => {
          setPending(true);
          product_wish(productId);
        }}
        className="flex items-center gap-2  p-2 rounded shadow"
      >
        Wishlist
        <Heart size={17} />
      </button>
    );
}

export default WishlistBtn;
