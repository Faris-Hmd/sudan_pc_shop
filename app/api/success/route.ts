import { NextRequest, NextResponse } from "next/server";
import getUser from "../../data/getUser";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../db/firebase";
import { stripe } from "../../../lib/stripe";

export async function GET(request: NextRequest) {
  console.log("Success ============ Success");
  // console.log("mu sess = ");
  const searchParam = request.nextUrl.searchParams;
  const sessId = searchParam.get("session_id");
  // console.log(sessId);

  const session = await stripe.checkout.sessions.retrieve(sessId || "");
  const lineItems = await stripe.checkout.sessions.listLineItems(sessId || "");
  console.log(session.customer_email);

  console.log("sess from stripe = = = ", lineItems.data);
  const convertItems = (items: any) => {
    return items.map((item: any) => ({
      p_name: item.description,
      p_cost: item.amount_total,
      productId: item.metadata.productId,
      p_cat: item.metadata.p_cat,
      p_qu: item.quantity,
    }));
  };
  console.log("-=-=-=-=-=-=");

  const formattedItems = convertItems(lineItems.data);
  console.log("formattedItems = == = ", formattedItems);
  // const user = await getUser();
  // console.log(user);
  const docRef = await addDoc(collection(db, "orders"), {
    items: formattedItems,
    customer_email: session.customer_email,
  });
  return NextResponse.redirect("http://localhost:3000/orders");
}
