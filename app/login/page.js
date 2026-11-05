"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/format";
import useTitle from "@/lib/useTitle";
import AuthShell from "@/components/AuthShell";

// function LoginForm() {
//   useTitle("Login");
//   const router = useRouter();
//   const redirect = safeRedirect(useSearchParams().get("redirect"));
//   const { data: session } = authClient.useSession();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

  useEffect(() => { if (session) router.replace(redirect); }, [session, redirect, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const f = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    setLoading(false);
    if (error) {
      const msg = error.message || "Email or password is wrong.";
      setError(msg);
      return toast.error(msg);
    }
    toast.success("Welcome back to BookNook!");
    router.push(redirect);
  };

  const google = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    if (error) toast.error(error.message || "Google sign in failed.");
  };

  return (
    <AuthShell title="Login to BookNook" sub="Welcome back. Pick up where you left off.">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="form-control w-full">
          <span className="label-text mb-1 block font-medium">Email</span>
          <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <span className="label-text mb-1 block font-medium">Password</span>
          <input name="password" type="password" required placeholder="Your password" className="input input-bordered w-full" />
        </label>
        <div className="text-right">
          <button type="button" onClick={() => toast("Password reset is not available yet.", { icon: "ℹ️" })} className="link link-primary text-sm">Forgot password?</button>
        </div>
        {error && <p role="alert" className="rounded-field bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
        <button disabled={loading} className="btn btn-primary w-full">{loading ? <span className="loading loading-spinner" /> : "Login"}</button>
      </form>
      <div className="divider">or</div>
      <button onClick={google} className="btn btn-outline w-full"><FcGoogle size={20} /> Continue with Google</button>
      <p className="mt-6 text-center text-sm">New to BookNook? <Link href="/register" className="link link-primary font-semibold">Register</Link></p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
