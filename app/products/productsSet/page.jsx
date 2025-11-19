"use client";
import React, { useState } from "react";

export default function AddProductForm() {
  // Example categories (replace with Firestore or API later)
  const [categories] = useState(["Electronics", "Accessories", "Clothing"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const product = {
      p_name: formData.get("p_name"),
      p_details: formData.get("p_details"),
      p_cost: formData.get("p_cost"),
      p_cat: formData.get("p_cat"),
    };

    console.log("Product submitted:", product);
    // TODO: send to Firestore or API
  };

  return (
    <form onSubmit={handleSubmit} name="shopform" className="add_form">
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
