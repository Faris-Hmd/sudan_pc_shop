import EmptyMuted from "./empty";
import Image from "next/image";
import Link from "next/link";

function ProductsList({ products }) {
  return (
    <div className="p-1 flex justify-around flex-wrap ">
      {products && products?.length > 0 ? (
        products.map((row, index) => (
          <div
            className="w-1/2 md:w-1/4 flex flex-col items-start justify-center"
            key={index}
          >
            <div className="w-[95%] flex flex-col items-start gap-2 bg-white m-auto my-1 shadow border rounded overflow-hidden ">
              <Link
                href={`/products/${row.productId}`}
                className="relative w-full"
              >
                <div className="h-40 w-full ms-auto  relative">
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
                <div className="name text-xs font-bold">{row.p_name}</div>
                <span className="text-[11px]  text-green-600">
                  {row.p_cost} SDG
                </span>
                <span className="text-[11px] text-gray-500">
                  {" "}
                  | {row.p_cat}
                </span>
              </div>
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
