"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  "“Every action you take is a vote for the person you wish to become.”",
  "“Habits are the compound interest of self-improvement.”",
  "“Your habits shape your identity, and your identity shapes your habits.”",
];

export default function ClearQuotes() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="flex flex-col">
      <div className="text-4xl">{quote}</div>
      <div className="text-2xl">— James Clear</div>
    </div>
  );
}
