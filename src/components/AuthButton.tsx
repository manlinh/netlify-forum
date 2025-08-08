"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  if (status === "loading") return <button disabled>Loading…</button>;
  if (!session) return <button onClick={() => signIn()}>Sign in</button>;
  return (
    <div className="flex items-center gap-3">
      <span>Hello, {session.user?.email ?? session.user?.name ?? "you"}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
