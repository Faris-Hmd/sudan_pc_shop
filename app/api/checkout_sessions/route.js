import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function POST(request) {
  console.log("post post");

  const body = await request.json();

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    console.log(origin);

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: body,
      mode: "payment",
      success_url: `${origin}/api/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    // return NextResponse.redirect(session.url, 303);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
