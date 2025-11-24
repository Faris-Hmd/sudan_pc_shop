"use client";
import Link from "next/link";
import { product_add } from "../../../actions/product_add";
import { categories } from "../../../data/categories";
import { CircleX, Upload } from "lucide-react";

export default function AddProductForm() {
  // Example categories (replace with Firestore or API later)

  return (
    <>
      <div className="flex justify-between items-center mb-2 p-2 border-b shadow flex-wrap">
        <h3>Add Product</h3>
      </div>
      <form action={product_add} name="shopform" className="add_form">
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
            <Upload size={17} /> Add Product
          </button>
        </div>
      </form>
    </>
  );
}
