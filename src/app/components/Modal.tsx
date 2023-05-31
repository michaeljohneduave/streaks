"use client";

import { useEffect, useRef, EffectCallback } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);

  if (!ref.current) {
    const div = document.createElement("div");
    ref.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot?.appendChild(ref.current as HTMLElement);

    return () => {
      modalRoot?.removeChild(ref.current as HTMLElement);
    };
  }, []);

  return createPortal(<div>{children}</div>, ref.current);
}
