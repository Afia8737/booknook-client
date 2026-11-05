"use client";
import Link from "next/link";
import useTitle from "@/lib/useTitle";

export default function NotFound() {
  useTitle("Page Not Found");
  return (
    <div className="page-wrap flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-8xl font-extrabold text-primary" style={{ fontFamily: "var(--font-bricolage)" }}>404</p>
      <h1 className="section-title">This page is not on our shelves</h1>
      <p className="section-sub">The link may be broken or the page may have moved.</p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
