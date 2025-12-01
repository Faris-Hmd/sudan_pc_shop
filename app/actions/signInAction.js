"use server";
import { signIn } from "../../auth";
export default async function signInAction() {
  console.log("logggg in");
  await signIn("google");
}
