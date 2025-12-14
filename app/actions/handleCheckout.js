"use server";

import { redirect } from "next/navigation";

export default async function handleCheckout(cart) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/checkout_sessions",
      {
        method: "POST",
        // Specify the method
        headers: {
          "Content-Type": "application/json", // Declare the content type
        },
        body: JSON.stringify(cart), // Convert the body data to a JSON string
      }
    );

    if (!response.ok) {
      // Handle non-successful HTTP statuses (e.g., 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { url } = await response.json();

    // Redirect the user to the Stripe Checkout page
    console.log(url);
    if (url) {
      redirect(url, "replace");
    }
  } catch (error) {
    console.error("Error during fetch operation:", error); // Handle network errors or the error thrown above
  }
}
