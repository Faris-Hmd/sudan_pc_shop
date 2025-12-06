// app/components/UserAvatar.tsx or similar file
"use client";

import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome, {session.user.name}!</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <p>You are not signed in.</p>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}
