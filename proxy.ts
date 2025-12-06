import { NextRequest, NextResponse } from "next/server.js";
export { auth as middleware } from "@/auth";
import { auth } from "@/auth";
import { log } from "console";
const protRoute = ["/wishlist", "/Dashboard", "/Dashboard/productsSet"];
export default async function proxy(request: NextRequest) {
  const sess = await auth();
  // log(sess, "proxy");
  if (sess === null)
    return NextResponse.redirect(new URL("/products", request.url));
  else return NextResponse.next();
}
export const config = {
  matcher: ["/wishlist", "/Dashboard/:path*"],
};
