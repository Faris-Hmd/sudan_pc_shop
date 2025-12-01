"use server";
import { signOut } from "../../auth";
export default async function signOutAction() {
  console.log("logggg out");
  await signOut();
}
