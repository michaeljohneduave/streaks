"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Bedtime from "./Bedtime";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

export default function Greeting() {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = dayjs();
    const name = session?.user?.name || "";
    const fname = name?.split(" ").slice(0, -1).join(" ");
    let greeting = `Good morning, ${fname}`;

    if (now.format("A") === "PM" && now.hour() < 18) {
      greeting = `Good afternoon, ${fname}`;
    } else if (now.format("A") === "PM") {
      greeting = `Good evening, ${fname}`;
    }

    setGreeting(greeting);
  }, [session?.user?.name]);

  return (
    <div>
      {session?.user?.name ? (
        <span className="text-5xl">{greeting}!</span>
      ) : (
        <Skeleton className="w-full h-14" />
      )}
      <Bedtime />
    </div>
  );
}
