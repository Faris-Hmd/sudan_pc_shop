import { NextRequest, NextResponse } from "next/server";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { stripe } from "@/lib/stripe";
import { OrderData } from "@/types/productsTypes";

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

    // 2. Format Items with Metadata
    // Note: lineItems.data contains 'Stripe.LineItem' objects
    const formattedItems = lineItems.data.map((item) => {
      // In 2025, Stripe metadata is often on the Product object or passed through.
      // If you attached metadata during checkout creation, it's accessed via item.price?.product
      return {
        p_name: item.description,
        // Calculate unit cost safely
        p_cost: item.amount_total / (item.quantity || 1) / 100,
        // Type cast metadata keys as strings
        productId: (item?.metadata?.productId as string) || "",
        p_cat: (item?.metadata?.p_cat as string) || "General",
        p_qu: item.quantity || 0,
        
      };
    });

    // 3. Save to Firestore
    // setDoc returns Promise<void>, so we don't need to assign to docRef
    await setDoc(doc(db, "orders", sessId), {
      productsList: formattedItems,
      customer_email: session.customer_email,
      orderId: sessId,
      status: "Processing",
      createdAt: new Date(Date.now()).toISOString(),
      deliveredAt: null,
      totalAmount: session.amount_total ? session.amount_total / 100 : 0,
      stripeSessionId: sessId,
      // estimatedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime(), // Estimated 7 days from now
    } as unknown as OrderData);

    // 4. Redirect to the relative /orders path
    return NextResponse.redirect(new URL("/orders", origin));
  } catch (error) {
    console.error("Stripe/Firestore Error:", error);
    return NextResponse.json(
      { error: "Order processing failed" },
      { status: 500 }
    );
  }
}
