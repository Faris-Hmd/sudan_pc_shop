import { doc, getDoc } from "firebase/firestore";
import { product_update } from "../../../actions/product_update";
import { db } from "../../../db/firebase";
import Link from "next/link";
import Dlt_btn from "../../../comp/dlt_btn";
export async function page({ params }) {
  const { productId } = await params;

  const docRef = doc(db, "products", productId);
  const docsnapshot = await getDoc(docRef);
  const product = docsnapshot.exists() ? { ...docsnapshot.data() } : {};
  const categories = ["Electronics", "Accessories", "Clothing"];
  // console.log(product);

  return (
    <form action={product_update} name="shopform" className="add_form">
      <h3>Add Product</h3>
      <input type="hidden" value={productId} name="id" />
      <label htmlFor="p_name">Product Name</label>
      <input
        type="text"
        name="p_name"
        required
        defaultValue={product.p_name ? product.p_name : ""}
      />

      <label htmlFor="p_details">Details</label>
      <textarea
        name="p_details"
        required
        defaultValue={product.p_details}
        rows="3"
      ></textarea>

      <label htmlFor="p_cost">Cost</label>
      <input
        type="number"
        name="p_cost"
        required
        defaultValue={product.p_cost}
      />

      <label htmlFor="p_cat">Categories</label>
      <select name="p_cat" id="p_cat" required defaultValue={product.p_cat}>
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <option key={index} defaultValue={cat}>
              {cat}
            </option>
          ))
        ) : (
          <option disabled>No categories found</option>
        )}
      </select>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          gap: "2px",
        }}
      >
        <Dlt_btn id={productId} />
        <input type="submit" value="Update Product" style={{ flexGrow: 1 }} />
      </div>
    </form>
  );
}

export default page;
