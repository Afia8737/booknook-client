"use client";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3500, style: { background: "var(--color-base-100)", color: "var(--color-base-content)", border: "1px solid var(--color-base-300)" } }} />
    </>
  );
}
