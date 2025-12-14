"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
function page() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState([]);
  useEffect(() => {
    if (typeof window !== "undefined" || window.localStorage) {
      const _cart =
        typeof window !== "undefined"
          ? JSON.parse(localStorage?.getItem("sh"))
            ? JSON.parse(localStorage?.getItem("sh"))
            : []
          : [];
      setCart(_cart);
    }
  }, []);

  let calculetedTotal = 0;
  useEffect(() => {
    cart.forEach((p) => {
      calculetedTotal = calculetedTotal + p.p_cost * p.q;
    });
    setTotal(calculetedTotal);
  }, [cart]);

  function convertProductsToLineItems(products) {
    return products.map((product) => {
      // Convert the string cost to a number and multiply by 100 for cents (e.g., $1.29 becomes 12900)
      const unitAmountCents = Math.round(parseFloat(product.p_cost) * 100);

      return {
        price_data: {
          product_data: {
            name: product.p_name,
          },
          currency: "USD", // Currency is hardcoded as per your example
          unit_amount: unitAmountCents,
        },
        quantity: product.q,
      };
    });
  }
  const payloadCart = convertProductsToLineItems(cart);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("use server");
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        // Specify the method
        headers: {
          "Content-Type": "application/json", // Declare the content type
        },
        body: JSON.stringify(payloadCart), // Convert the body data to a JSON string
      });

      if (!response.ok) {
        // Handle non-successful HTTP statuses (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url } = await response.json();

      // Redirect the user to the Stripe Checkout page
      console.log(url);
      if (url) {
        window.location.assign(url);
      }
    } catch (error) {
      console.error("Error during fetch operation:", error); // Handle network errors or the error thrown above
    }
  }

  if (cart.length === 0) return;
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <section>
          <button
            className="p-2 bg-black text-white flex gap-3 m-2 rounded shadow"
            type="submit"
            role="link"
          >
            Checkout <pre>{total}$</pre>
          </button>
        </section>
      </form>
      <div className="bg-white flex justify-between items-center  p-2 border-b shadow flex-wrap">
        <h3>My Cart</h3>
        <span className="flex me-3 bg-green-700 p-1 text-white rounded shadow">
          <pre>{total}$</pre>
        </span>
      </div>
      <div className="p-1 flex justify-around flex-wrap">
        {cart.map((product) => {
          return (
            <div
              className="w-full md:w-1/4 flex flex-wrap items-start justify-center "
              key={product.productId}
            >
              <div className="w-[100%] flex  items-center gap-2 bg-white m-auto my-1 shadow border rounded overflow-hidden ">
                <Link
                  href={`/products/${product.productId}`}
                  className="relative w-15 h-15 rounded-2xl"
                >
                  <Image
                    loading="eager"
                    className="object-cover"
                    sizes="100"
                    fill
                    src={product.p_imgs[0].url}
                    alt="Product Image"
                  />
                </Link>
                <div className="p-1">
                  <div className="name text-xs font-bold">{product.p_name}</div>
                  <span className="text-[11px]  text-green-600">
                    {product.p_cost} SDG
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {" "}
                    | {product.p_cat}
                  </span>
                </div>
                <div className="ms-auto me-5 bg-gray-200 p-2 flex items-center justify-center rounded-full shadow w-8 h-8 ">
                  {product.q}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default page;
