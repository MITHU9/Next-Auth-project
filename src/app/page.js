"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return !session ? (
    <div className="w-full min-h-screen flex flex-col items-center justify-between p-24">
      <Link
        href="/login"
        className="text-3xl font-bold border p-4 rounded shadow-md"
      >
        Please login to see the content..
      </Link>
    </div>
  ) : (
    <div className="w-full min-h-screen flex flex-col items-center justify-between p-24">
      <p className="text-3xl font-bold text-green-500 border p-4 rounded shadow-md">
        Welcome back, {session.user?.email}
      </p>
    </div>
  );
}
