import { NextRequest, NextResponse } from "next/server.js";
export { auth as middleware } from "@/lib/auth";
import { auth } from "@/lib/auth";
// const protRoute = ["/wishlist", "/Dashboard", "/Dashboard/productsSet"];
export default async function proxy(request: NextRequest) {
  const sess = await auth();
  if (sess === null)
    return NextResponse.redirect(new URL("/login", request.url));
  else return NextResponse.next();
}
export const config = {
  matcher: [
    "/wishlist",
    "/dashboard/:path*",
    "/orders",
    "/checkout/:path*",
    "/profile/:path*",
    "/driver/:path*",
  ],
};
