import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import getUser from "@/data/getUser";
import Stripe from "stripe";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await getUser();
  if (!body || body.length === 0) {
    return NextResponse.json(
      { error: "No items in the cart" },
      { status: 400 }
    );
  }
  if (!user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    if (!origin) {
      return NextResponse.json(
        { error: "Origin header missing" },
        { status: 400 }
      );
    }

    // Create Checkout Sessions from body params.
    const params: Stripe.Checkout.SessionCreateParams = {
      line_items: body,
      mode: "payment",
      success_url: `${origin}/api/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      customer_email: user.email || undefined,
    };
    const session = await stripe.checkout.sessions.create(params);
    // return NextResponse.redirect(session.url, 303);
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: (err as { statusCode?: number })?.statusCode || 500 }
    );
  }
}
