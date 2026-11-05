"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import AuthShell from "@/components/AuthShell";

function passwordError(p) {
  if (p.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(p)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(p)) return "Password must include a lowercase letter.";
  return "";
}

// export default function RegisterPage() {
//   useTitle("Register");
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [pwError, setPwError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = f.get("password");
    const problem = passwordError(password);
    setPwError(problem);
    if (problem) return toast.error(problem);

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: f.get("name"),
      email: f.get("email"),
      image: f.get("photo"),
      password,
    });
    setLoading(false);
    if (error) return toast.error(error.message || "We could not create your account.");
    toast.success("Account created. Please log in.");
    router.push("/login");
  };

  const google = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    if (error) toast.error(error.message || "Google sign in failed.");
  };

  return (
    <AuthShell title="Create your account" sub="Join BookNook to add and borrow books.">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="form-control w-full">
          <span className="label-text mb-1 block font-medium">Name</span>
          <input name="name" required placeholder="Your full name" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <span className="label-text mb-1 block font-medium">Email</span>
          <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <span className="label-text mb-1 block font-medium">Photo URL</span>
          <input name="photo" type="url" required placeholder="https://i.ibb.co/your-photo.jpg" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full">
          <span className="label-text mb-1 block font-medium">Password</span>
          <input name="password" type="password" required placeholder="Min 6 characters, upper and lower case" className={`input input-bordered w-full ${pwError ? "input-error" : ""}`} />
          {pwError && <span role="alert" className="mt-1 block text-sm text-error">{pwError}</span>}
        </label>
        <button disabled={loading} className="btn btn-primary w-full">{loading ? <span className="loading loading-spinner" /> : "Register"}</button>
      </form>
      <div className="divider">or</div>
      <button onClick={google} className="btn btn-outline w-full"><FcGoogle size={20} /> Continue with Google</button>
      <p className="mt-6 text-center text-sm">Already have an account? <Link href="/login" className="link link-primary font-semibold">Login</Link></p>
    </AuthShell>
  );
}
