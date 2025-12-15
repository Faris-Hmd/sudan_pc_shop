"use client";
import { ShoppingCart } from "lucide-react";
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
    <div className="container mx-auto  md:p-8 bg-gray-50 min-h-screen">
      {/* Header Section (Sticky/Fixed might be better in a real app, but static here to preserve structure) */}
      <div className="bg-white flex justify-between items-center p-4 mb-6 shadow-md ">
        <h3 className="text-2xl font-bold text-gray-800">My Cart</h3>

        {/* Checkout Form & Button */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <button
            // Styled checkout button: indigo color, rounded corners, clear pricing display
            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-3 rounded-lg shadow-md transition duration-150 font-semibold"
            type="submit"
            role="link"
          >
            {/* Using an icon for better visual appeal */}
            <ShoppingCart size={20} />
            Checkout
            <span className="bg-white text-indigo-600 px-2 py-0.5 rounded-md font-bold">
              ${total}
            </span>
          </button>
        </form>
      </div>

      {/* Cart Items List Container */}
      <div className="flex flex-col gap-4 p-2">
        {cart.map((product) => {
          return (
            // Individual Cart Item Card
            <div
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 flex items-center justify-between transition duration-150 hover:shadow-md"
              key={product.productId}
            >
              <div className="flex items-center gap-4">
                {/* Product Image Link */}
                <Link
                  href={`/products/${product.productId}`}
                  // Styled image container: fixed size, rounded corners
                  className="relative w-20 h-20 shrink-0"
                >
                  <Image
                    loading="eager"
                    className="object-cover rounded-lg"
                    sizes="100"
                    fill
                    src={
                      product.p_imgs.length > 0
                        ? product.p_imgs[0].url
                        : "/placeholder.png"
                    }
                    alt="Product Image"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex flex-col">
                  <div className="text-base font-semibold text-gray-800 line-clamp-1">
                    {product.p_name}
                  </div>
                  <span className="text-sm font-bold text-green-700">
                    ${product.p_cost} SDG
                  </span>
                  <span className="text-xs text-gray-500">
                    | {product.p_cat}
                  </span>
                </div>
              </div>

              {/* Quantity Display */}
              <div
                // Styled quantity badge: indigo background, clean text
                className="bg-indigo-100 text-indigo-800 p-2 flex items-center justify-center rounded-full font-semibold w-8 h-8 flex-shrink-0"
              >
                {product.q}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
