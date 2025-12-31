"use server";

import { auth } from "@/lib/auth";

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// await wait(3000);
export default async function getUser() {
  const sess = await auth();
  console.count("Get user -----------------------------------");
  // await wait(3000);
  if (sess) return sess.user;
  else return null;
}
