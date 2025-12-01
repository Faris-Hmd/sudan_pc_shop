"use server";

import { auth } from "@/auth";

export async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// await wait(3000);
export default async function getUser() {
  const sess = await auth();
  // console.log(sess);
  // await wait(3000);

  if (sess) return sess.user;
  else return null;
}
