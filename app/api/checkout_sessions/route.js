import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import getUser from "@/data/getUser";
export async function POST(request) {
  const body = await request.json();
  const user = await getUser();

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: body,
      mode: "payment",
      success_url: `${origin}/api/success?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: user.email,
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
