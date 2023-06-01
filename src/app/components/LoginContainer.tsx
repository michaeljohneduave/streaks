"use client";

import Login from "./Login";
import { Toast, ToastProvider, ToastViewport } from "./ui/toast";

export default function LoginContainer() {
  return (
    <ToastProvider>
      <Toast />
      <ToastViewport />
      <Login />
    </ToastProvider>
  );
}