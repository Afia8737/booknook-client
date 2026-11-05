"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";

function Details() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const [book, setBook] = useState(null);
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  useTitle(book ? book.title : "Book Details");

  useEffect(() => {
    api(`/books/${id}`, { auth: true }).then(setBook).catch((e) => { toast.error(e.message); setMissing(true); });
  }, [id]);

  const borrow = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const days = Number(new FormData(e.currentTarget).get("days"));
      await api("/borrows", { method: "POST", auth: true, body: { bookId: id, days } });
      setBook((b) => ({ ...b, availableCopies: b.availableCopies - 1 }));
      toast.success("Borrowed! Find it in My Borrows.");
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (missing) return <p className="page-wrap py-20 text-center opacity-70">We could not load this book.</p>;
  if (!book) return <Spinner full />;
  const available = book.availableCopies > 0;

  return (
    <section className="page-wrap grid gap-10 py-14 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <img src={book.image} alt={`Cover of ${book.title}`} className="aspect-[3/4] w-full rounded-box border border-base-300 object-cover" />
      <div className="space-y-4">
        <span className="badge badge-secondary badge-outline">{book.category}</span>
        <h1 className="section-title">{book.title}</h1>
        <p className="text-lg opacity-80">by {book.author}</p>
        <p className="max-w-prose whitespace-pre-line">{book.description}</p>
        <div className="rounded-box border border-base-300 bg-base-200/60 p-4 text-sm">
          <p>Added by <span className="font-semibold">{book.addedBy.name}</span> ({book.addedBy.email})</p>
          <p className="opacity-70">on {formatDate(book.createdAt)}</p>
          <p className="mt-2">{book.availableCopies} of {book.totalCopies} copies available</p>
        </div>
        <button onClick={() => setOpen(true)} disabled={!available} className="btn btn-primary btn-lg">
          {available ? "Borrow This Book" : "Not Available"}
        </button>
      </div>

      {open && (
        <dialog className="modal modal-open" aria-labelledby="borrow-title">
          <form onSubmit={borrow} className="modal-box space-y-4">
            <h3 id="borrow-title" className="text-xl font-bold">Borrow “{book.title}”</h3>
            <label className="form-control w-full">
              <span className="label-text mb-1 block font-medium">Name</span>
              <input readOnly value={session?.user?.name || ""} className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text mb-1 block font-medium">Email</span>
              <input readOnly value={session?.user?.email || ""} className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text mb-1 block font-medium">Keep it for</span>
              <select name="days" defaultValue="7" className="select select-bordered w-full">
                <option value="3">3 days</option><option value="7">7 days</option><option value="14">14 days</option>
              </select>
            </label>
            <div className="modal-action">
              <button type="button" onClick={() => setOpen(false)} className="btn">Cancel</button>
              <button disabled={busy} className="btn btn-primary">{busy ? <span className="loading loading-spinner" /> : "Confirm Borrow"}</button>
            </div>
          </form>
          <div className="modal-backdrop" onClick={() => setOpen(false)} />
        </dialog>
      )}
    </section>
  );
}

export default function BookDetailsPage() {
  return <PrivateRoute><Details /></PrivateRoute>;
}
