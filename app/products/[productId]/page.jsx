import { getDoc, doc } from "firebase/firestore";
import { db } from "../../db/firebase";

export default async function ProductsDetails({ params }) {
  const { productId } = await params;
  // console.log(productId);
  const docRef = doc(db, "products", productId);
  const docsnapshot = await getDoc(docRef);
  const product = docsnapshot.exists() ? docsnapshot.data() : {};
  // console.log(product);

  return (
    <div className="product_d_card">
      <div className="product_d_img">
        <img src={`../${product.p_img}`} alt="Product Image" />
      </div>

      <div className="product_d_name">{product.p_name}</div>

      <div className="wrapper">
        <span className="cost">{product.p_cost}</span>
        <span className="category"> | {product.p_cat}</span>
      </div>

      {/* <div className="product_d_details">{p_details}</div> */}
    </div>
  );
}
