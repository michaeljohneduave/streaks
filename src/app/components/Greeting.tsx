"use client";

import { useEffect, useState } from "react";
import { useGetFromAuth } from "../hooks/zustand";
import useAuth from "../stores/useAuth";
import Bedtime from "./Bedtime";

const dayjs = require("dayjs");

export default function Greeting() {
  const name = useGetFromAuth(useAuth, (state) => state.name);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = dayjs();
    const fname = name?.split(" ").slice(0, -1).join(" ");
    let greeting = `Good morning, ${fname}`;

    if (now.format("A") === "PM" && now.format("HH") > 18) {
      greeting = `Good afternoon, ${fname}`;
    } else if (now.format("A") === "PM") {
      greeting = `Good evening, ${fname}`;
    }

    setGreeting(greeting);
  }, [name]);

  return (
    <div>
      <h1 className="text-4xl">{greeting}!</h1>
      <Bedtime />
    </div>
  );
}
