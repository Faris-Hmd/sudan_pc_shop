"use client";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg shadow-lg">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading session...
        </p>
      </div>
    );
  }

  if (status === "authenticated") {
    router.push("/profile");
  }

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-xl flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-gray-700">
        You are not signed in
      </h1>
      <p className="text-gray-500 text-lg">
        Sign in to access your account and dashboard
      </p>
      <button
        onClick={() => signIn("google")}
        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition duration-200 text-lg"
      >
        Sign In
      </button>
    </div>
  );
}
