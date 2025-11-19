// "use client";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "../db/firebase";

export default async function Home() {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(productsRef);
  const products = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return (
    <div className="list">
      {products && products?.length > 0 ? (
        products.map((row) => (
          <div className="product_card bg-amber-900" key={row.id}>
            <Link href={`products/${row.id}`}>
              <div className="img_container">
                <img src={row.p_img} alt="Product Image" />
              </div>
            </Link>
            <div className="name">{row.p_name}</div>
            <div className="wrapper">
              <span className="cost">{row.p_cost}</span>
              <span className="category"> | {row.p_cat}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="no_product">No products available</div>
      )}
    </div>
  );
}
