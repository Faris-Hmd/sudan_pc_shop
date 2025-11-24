import { doc, getDoc } from "firebase/firestore";
import { product_update } from "../../../actions/product_update";
import { db } from "../../../db/firebase";
import { categories } from "../../../data/categories";
import { CircleX, Edit, Upload } from "lucide-react";
import Link from "next/link";

export async function UpdateForm({ params }) {
  const { productId } = await params;

  const docRef = doc(db, "products", productId);
  const docsnapshot = await getDoc(docRef);
  const product = docsnapshot.exists() ? { ...docsnapshot.data() } : {};
  // console.log(product);

  return (
    <>
      <div className="flex justify-between items-center mb-2 p-2 border-b shadow flex-wrap">
        <h3>Update Product</h3>
      </div>
      <form action={product_update} name="shopform" className="add_form">
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
            alignItems: "center",
          }}
        >
          <Link
            className="bg-gray-500 text-white p-1.5 rounded shadow flex items-center gap-1"
            href="/Dashboard/productsSet"
          >
            <CircleX size={17} /> Cancel
          </Link>
          <button
            className="bg-green-600 flex justify-center text-white gap-2 items-center p-1.5 rounded shadow-2xl "
            type="submit"
            value="Add Product"
            style={{ flexGrow: 1 }}
          >
            <Edit size={17} /> Update Product
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateForm;
