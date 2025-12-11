import React from "react";
import { categories } from "../data/categories";
import Image from "next/image";
import Link from "next/link";

function Categories() {
  return (
    <>
      <div className="text-2xl ps-2 py-4">Browes By Category</div>
      <div className="flex justify-center items-center flex-wrap">
        {categories.slice(0, 9).map((cat) => {
          return (
            <div
              key={cat}
              className="rounded flex flex-col justify-center flex-wrap text-center w-1/3"
            >
              <div className="w-[95%] flex flex-col items-center gap-2 bg-white m-auto my-1 shadow border rounded overflow-hidden ">
                <Link href={"/products/categories/" + cat}>
                  <div className="h-12 w-12  relative m-4">
                    <Image
                      sizes="100%"
                      alt="category"
                      fill
                      src={
                        "https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/icons/" +
                        cat +
                        ".png"
                      }
                    />
                  </div>
                </Link>
                <div>{cat}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Categories;
