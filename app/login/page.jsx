"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();

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
    return (
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User Avatar"}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
        )}

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {session.user.name}!
          </h1>
          <p className="text-lg text-gray-600 mb-1">{session.user.email}</p>
          {session.user.username && (
            <p className="text-md text-gray-500 mb-2">
              Username: {session.user.username}
            </p>
          )}
          {/* Additional info placeholder */}
          <p className="text-sm text-gray-500 mb-4">
            Last login: {new Date().toLocaleDateString()}
          </p>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition duration-200"
            >
              Sign Out
            </button>

            <button
              onClick={() => alert("Profile settings clicked")}
              className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg shadow-md transition duration-200"
            >
              Profile Settings
            </button>
          </div>
        </div>
      </div>
    );
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
        onClick={() => signIn()}
        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg transition duration-200 text-lg"
      >
        Sign In
      </button>
    </div>
  );
}
