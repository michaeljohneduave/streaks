"use client";

import { useGetFromAuth } from "./hooks/zustand";
import useAuth from "./stores/useAuth";

export default function Home() {
  const name = useGetFromAuth(useAuth, (state) => state.name);

  return (
    <>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome, {name}!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a
          faucibus odio.
        </p>
      </main>
    </>
  );
}
