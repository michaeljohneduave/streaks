"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
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

  return createPortal(
    <div
      x-show="open"
      className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, .5)" }}
    >
      {children}
    </div>,
    ref.current
  );
}

export function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-b text-2xl font-semibold">{children}</header>
  );
}

export function ModalBody({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <footer className="border-t text-lg font-semibold">{children}</footer>;
}
