"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import SectionHeading from "@/components/SectionHeading";

function Profile() {
  useTitle("My Profile");
  const { data: session } = authClient.useSession();
  const user = session.user;
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await authClient.updateUser({ name: f.get("name"), image: f.get("image") });
    setBusy(false);
    error ? toast.error(error.message || "We could not update your profile.") : toast.success("Profile updated.");
  };

  return (
    <section className="page-wrap max-w-xl py-14">
      <SectionHeading title="My Profile" sub="Your public details on BookNook." />
      <div className="mb-6 flex items-center gap-4">
        {user.image ? <img src={user.image} alt={user.name} referrerPolicy="no-referrer" className="h-24 w-24 rounded-full object-cover ring-2 ring-accent" /> : (
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-content">{user.name?.[0]}</span>
        )}
        <div><p className="text-xl font-bold">{user.name}</p><p className="opacity-70">{user.email}</p></div>
      </div>
      <form onSubmit={save} className="space-y-4">
        <label className="form-control w-full"><span className="label-text mb-1 block font-medium">Name</span>
          <input name="name" defaultValue={user.name} required className="input input-bordered w-full" /></label>
        <label className="form-control w-full"><span className="label-text mb-1 block font-medium">Photo URL</span>
          <input name="image" type="url" defaultValue={user.image || ""} className="input input-bordered w-full" /></label>
        <button disabled={busy} className="btn btn-primary">{busy ? <span className="loading loading-spinner" /> : "Save changes"}</button>
      </form>
    </section>
  );
}

export default function ProfilePage() {
  return <PrivateRoute><Profile /></PrivateRoute>;
}
