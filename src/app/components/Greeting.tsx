"use client";

import dayjs from "dayjs";
import Bedtime from "./Bedtime";

export default function Greeting({ name }: { name: string | "" }) {
  let greeting: string;
  const now = dayjs();
  const fname = name.split(" ").slice(0, -1).join(" ");
  greeting = `Good morning, ${fname}`;

  if (now.format("A") === "PM" && now.hour() < 18) {
    greeting = `Good afternoon, ${fname}`;
  } else if (now.format("A") === "PM") {
    greeting = `Good evening, ${fname}`;
  }

  return (
    <div>
      <span className="text-5xl">{greeting}!</span>
      <Bedtime />
    </div>
  );
}
