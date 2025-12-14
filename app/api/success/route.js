import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function GET(request) {
  console.log("Success ============ Success");

  return NextResponse.redirect("http://localhost:3000");
}
