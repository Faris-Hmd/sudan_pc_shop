import React from "react";
import { categories } from "../../data/categories";
import Link from "next/link";
function Categories() {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {categories.map((category, index) => {
        return (
          <Link
            className="block p-2 bg-white my-1  rounded shadow transition-colors hover:bg-gray-300"
            href={"/products/categories/" + category}
            key={index}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}

export default Categories;
