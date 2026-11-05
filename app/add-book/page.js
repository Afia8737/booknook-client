"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { CATEGORIES } from "@/lib/format";
import { uploadImage } from "@/lib/upload";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import SectionHeading from "@/components/SectionHeading";

function AddBook() {
  useTitle("Add Book");
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    try {
      const image = await uploadImage(f.get("image"));
      await api("/books", {
        method: "POST",
        auth: true,
        body: {
          title: f.get("title"), author: f.get("author"), category: f.get("category"), image,
          description: f.get("description"), totalCopies: Number(f.get("totalCopies")),
        },
      });
      toast.success("Book added to the shelf!");
      form.reset();
      router.push("/my-books");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page-wrap max-w-3xl py-14">
      <SectionHeading title="Add a Book" sub="Share a book you can lend to other readers." />
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="form-control">
          <span className="label-text mb-1 block font-medium">Book Title</span>
          <input name="title" required placeholder="e.g. The Left Hand of Darkness" className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 block font-medium">Author Name</span>
          <input name="author" required placeholder="e.g. Ursula K. Le Guin" className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 block font-medium">Category</span>
          <select name="category" required defaultValue="" className="select select-bordered w-full">
            <option value="" disabled>Choose a category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="form-control">
          <span className="label-text mb-1 block font-medium">Total Copies</span>
          <input name="totalCopies" type="number" min="1" step="1" defaultValue="1" required className="input input-bordered w-full" />
        </label>
        <label className="form-control sm:col-span-2">
          <span className="label-text mb-1 block font-medium">Book Image</span>
          <input name="image" type="file" accept="image/*" required className="file-input file-input-bordered w-full" />
        </label>
        <label className="form-control sm:col-span-2">
          <span className="label-text mb-1 block font-medium">Short Description</span>
          <textarea name="description" required rows={4} placeholder="What is this book about?" className="textarea textarea-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 block font-medium">Your Name</span>
          <input readOnly value={session?.user?.name || ""} className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1 block font-medium">Your Email</span>
          <input readOnly value={session?.user?.email || ""} className="input input-bordered w-full" />
        </label>
        <button disabled={busy} className="btn btn-primary sm:col-span-2">{busy ? <span className="loading loading-spinner" /> : "Add Book"}</button>
      </form>
    </section>
  );
}

export default function AddBookPage() {
  return <PrivateRoute><AddBook /></PrivateRoute>;
}
