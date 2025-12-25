"use client";
import { ShoppingCart, Trash } from "lucide-react";
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
        metadata: {
          productId: product.productId,
          p_cat: product.p_cat,
        },
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

  // Remove an item from the cart and persist to localStorage
  function removeFromCart(productId) {
    const updated = cart.filter((p) => p.productId !== productId);
    setCart(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("sh", JSON.stringify(updated));
    }
  }

  return (
    <div className="container mx-auto md:p-8 pb-24 ">
      {/* Header Section - Only show checkout button if cart has items */}
      <div className="bg-white flex justify-between items-center p-3 px-3 mb-1 shadow-md ">
        <h1 className="text-2xl font-bold text-gray-800 bg-white ">My Cart</h1>

        {cart.length > 0 && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <button
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-3 rounded-lg shadow-md transition duration-150 font-semibold"
              type="submit"
            >
              <ShoppingCart size={20} />
              Checkout
              <span className="bg-white text-indigo-600 px-2 py-0.5 rounded-md font-bold">
                ${total}
              </span>
            </button>
          </form>
        )}
      </div>

      {/* Cart Items List Container */}
      <div className="flex flex-col gap-2 p-2">
        {cart.length > 0 ? (
          cart.map((product) => (
            // Individual Cart Item Card
            <div
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 flex items-center justify-between transition duration-150 hover:shadow-md"
              key={product.productId}
            >
              <div className="flex items-center gap-4">
                <Link
                  href={`/products/${product.productId}`}
                  className="relative w-20 h-20 shrink-0"
                >
                  <Image
                    loading="eager"
                    className="object-cover rounded-lg"
                    sizes="100px"
                    fill
                    src={
                      product.p_imgs.length > 0
                        ? product.p_imgs[0].url
                        : "/placeholder.png"
                    }
                    alt={product.p_name}
                  />
                </Link>

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

              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 text-indigo-800 p-2 flex items-center justify-center rounded-full font-semibold w-8 h-8 flex-shrink-0">
                  {product.q}
                </div>
                <button
                  onClick={() => removeFromCart(product.productId)}
                  className="text-sm text-red-600 bg-red-50 p-2 rounded hover:bg-red-100 transition"
                  aria-label="Remove item"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          // Empty Cart Message
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-gray-200 p-6 rounded-full mb-4">
              <ShoppingCart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href="/products"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
