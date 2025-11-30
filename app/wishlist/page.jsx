import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../db/firebase";
import ProductsList from "../comp/productsList";
import { log } from "console";
import { auth } from "@/auth";

async function Wishlist() {
  const sess = await auth();
  const wishlistRef = collection(db, "users", sess.user.email, "whish");
  const querySnapshot = await getDocs(wishlistRef);
  const wishlistIds = querySnapshot.docs.map((doc) => doc.id);

  const productsSnapShop = await getDocs(
    query(collection(db, "productsTest"), where("__name__", "in", wishlistIds))
  );
  const products = productsSnapShop.docs.map((product) => ({
    ...product.data(),
    id: product.id,
  }));

  return (
    <div>
      <ProductsList products={products} />
    </div>
  );
}

export default Wishlist;
