"use client";

import ClearQuotes from "./components/ClearQuotes";
import useAuth from "@/app/stores/useAuth";
import { useGetFromAuth } from "./hooks/zustand";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useGetFromAuth(useAuth, (state) => state.isLoggedIn);

  if (isLoggedIn) {
    router.push("/dashboard");
  }

  return (
    <>
      <main className="container mt-10">
        <div className="flex flex-col space-y-10 text-center">
          <div className="text-5xl">Yet Another Habit Tracker</div>
          <ClearQuotes />
        </div>
      </main>
    </>
  );
}
