import React from "react";
import EmptyMuted from "./empty";
import Image from "next/image";
import Link from "next/link";

function ProductsList({ products }) {
  return (
    <div className="p-1 flex justify-around flex-wrap gap-1">
      {products && products?.length > 0 ? (
        products.map((row) => (
          <div
            className="w-50 flex flex-col items-start gap-2 bg-white shadow border rounded overflow-hidden"
            key={row.id}
          >
            <Link href={`/products/${row.id}`} className="relative w-full">
              <div className="h-30 w-full ms-auto  relative">
                <Image
                  className="object-cover"
                  sizes="100"
                  fill
                  src={row.p_imgs[0].url}
                  alt="Product Image"
                  // className="ms-auto"
                />
              </div>
            </Link>
            <div className="p-1">
              <div className="name text-sm font-bold">{row.p_name}</div>
              <span className="cost text-xs  text-green-600">
                {row.p_cost} SDG
              </span>
              <span className="category text-xs text-gray-500">
                {" "}
                | {row.p_cat}
              </span>
            </div>
          </div>
        ))
      ) : (
        <EmptyMuted />
      )}
    </div>
  );
}

export default ProductsList;
