import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../db/firebase";
import ProductsList from "../comp/productsList";
import { log } from "console";

async function Wishlist() {
  const wishlistRef = collection(db, "users", "faris", "whish");
  const querySnapshot = await getDocs(wishlistRef);
  const wishlistIds = querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
  let products = [];
  log(wishlistIds);
  for (const wishProductsId of wishlistIds) {
    log(wishProductsId.id.toString());
    const productRef = doc(db, "productsTest", wishProductsId.id.toString());
    const _querySnapshot = await getDoc(productRef);
    if (_querySnapshot.exists()) {
      products.push({ ..._querySnapshot.data(), id: _querySnapshot.id });
    }
  }

  //   console.log(products);
  return (
    <div>
      <ProductsList products={products} />
    </div>
  );
}

export default Wishlist;
