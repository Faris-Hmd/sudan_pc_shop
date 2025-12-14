export default async function IndexPage({ searchParams }) {
  const { canceled } = await searchParams;
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

  // Example usage:
  const inputProducts = [];

  const lineItems = convertProductsToLineItems(inputProducts);
  console.log(lineItems);

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and checkout when you’re ready."
    );
  }
  async function handleSubmit() {
    "use server";
    try {
      console.log("use server");

      const response = await fetch(
        "http://localhost:3000/api/checkout_sessions",
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Declare the content type
          },
          body: JSON.stringify({
            patload: "test payload",
          }), // Convert the body data to a JSON string
        }
      );

      if (!response.ok) {
        // Handle non-successful HTTP statuses (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // Parse the JSON response
      console.log("Success:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error during fetch operation:", error); // Handle network errors or the error thrown above
    }
  }
  return (
    <form action={"http://localhost:3000/api/checkout_sessions"} method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
  );
}
