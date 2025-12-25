import { NextRequest, NextResponse } from "next/server";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/db/firebase";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  console.log("Success ============ Success");
  const searchParam = request.nextUrl.searchParams;
  const sessId = searchParam.get("session_id");

  const session = await stripe.checkout.sessions.retrieve(sessId || "");
  const lineItems = await stripe.checkout.sessions.listLineItems(sessId || "");
  console.log(session.customer_email);
  // console.log("sess from stripe = = = ", lineItems.data);
  const convertItems = (items: any) => {
    return items.map((item: any) => ({
      p_name: item.description,
      p_cost: item.amount_total.valueOf() / 100 / item.quantity,
      productId: item.metadata.productId,
      p_cat: item.metadata.p_cat,
      p_qu: item.quantity,
    }));
  };
  // console.log("-=-=-=-=-=-=");

  const formattedItems = convertItems(lineItems.data);
  // console.log("formattedItems = == = ", formattedItems);
  // const user = await getUser();
  // console.log(user);
  const docRef = await setDoc(doc(db, "orders", sessId || ""), {
    items: formattedItems,
    customer_email: session.customer_email,
    status: "Processing",
    createdAt: serverTimestamp(),
    deliveredAt: null,
    totalAmount: session.amount_total ? session.amount_total / 100 : 0,
    stripeSessionId: sessId,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/orders`);
}
