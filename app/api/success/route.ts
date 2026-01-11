import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ProductType } from "@/types/productsTypes";
import { addOrder } from "@/services/ordersServices";
import { getUser } from "@/services/userServices";

import Stripe from "stripe";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const sessId = searchParams.get("session_id");

  // Guard against missing session ID
  if (!sessId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    // 1. Retrieve data from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessId);

    // 2. Fetch user data to get shipping info
    const userData = session.customer_email
      ? await getUser(session.customer_email)
      : null;

    // 3. Format Items with Metadata
    // Note: lineItems.data contains 'Stripe.LineItem' objects
    console.log(lineItems.data[0]);

    const formattedItems: ProductType[] = lineItems.data.map((item) => {
      const itemWithMeta = item as Stripe.LineItem & {
        metadata: Record<string, string>;
      };
      return {
        p_name: item.description || "Unnamed Product",
        // Calculate unit cost safely
        p_cost: item.amount_total / (item.quantity || 1) / 100,
        // Type cast metadata keys as strings
        id: itemWithMeta.metadata?.id || Math.random().toString(),
        p_cat: itemWithMeta.metadata?.p_cat || "General",
        p_qu: item.quantity || 1,
        p_details: "",
        createdAt: "",
        p_imgs: [],
      };
    });

    await addOrder({
      productsList: formattedItems,
      customer_email: session.customer_email,
      customer_name:
        userData?.name || session.customer_details?.name || undefined,
      shippingInfo: userData?.shippingInfo,
      status: "Processing",
      createdAt: new Date(Date.now()).toISOString(),
      totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      deliveredAt: "",
    });

    // 4. Redirect to the relative /orders path
    return NextResponse.redirect(new URL("/orders", origin));
  } catch (error) {
    console.error("Stripe/Firestore Error:", error);
    return NextResponse.json(
      { error: "Order processing failed" },
      { status: 500 },
    );
  }
}
