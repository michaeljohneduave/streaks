"use client";

import { useGetFromAuth } from "../hooks/zustand";
import useAuth from "../stores/useAuth";

const dayjs = require("dayjs");

export default function Greeting() {
  const name = useGetFromAuth(useAuth, (state) => state.name);
  const fname = name?.split(" ").slice(0, -1).join(" ");
  const now = dayjs();
  let greeting = `Good morning, ${fname}`;

  if (now.format("A") === "PM" && now.format("HH") > 18) {
    greeting = `Good afternoon, ${fname}`;
  } else if (now.format("A") === "PM") {
    greeting = `Good evening, ${fname}`;
  }

  return (
    <div>
      <h1 className="text-4xl">{greeting}!</h1>
    </div>
  );
}
