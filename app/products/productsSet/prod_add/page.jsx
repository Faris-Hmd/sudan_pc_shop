"use client";
import { product_add } from "../../../actions/product_add";

export default function AddProductForm() {
  // Example categories (replace with Firestore or API later)
  const categories = ["Electronics", "Accessories", "Clothing"];

  return (
    <form action={product_add} name="shopform" className="add_form">
      <h3>Add Product</h3>

      <label htmlFor="p_name">Product Name</label>
      <input type="text" name="p_name" required />

      <label htmlFor="p_details">Details</label>
      <textarea name="p_details" required rows="3"></textarea>

      <label htmlFor="p_cost">Cost</label>
      <input type="number" name="p_cost" required />

      <label htmlFor="p_cat">Categories</label>
      <select name="p_cat" id="p_cat" required>
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <option key={index} value={cat}>
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
        <a className="cancel_btn" href="/shop">
          Cancel
        </a>
        <input type="submit" value="Add Product" style={{ flexGrow: 1 }} />
      </div>
    </form>
  );
}
