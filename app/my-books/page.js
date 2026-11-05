"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { CATEGORIES, formatDate } from "@/lib/format";
import { uploadImage } from "@/lib/upload";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import SectionHeading from "@/components/SectionHeading";

function MyBooks() {
  useTitle("My Books");
  const { data: session } = authClient.useSession();
  const email = session?.user?.email;
  const [books, setBooks] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!email) return;
    api(`/books?email=${encodeURIComponent(email)}`).then(setBooks).catch((e) => { toast.error(e.message); setBooks([]); });
  }, [email]);

  const saveEdit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const file = f.get("image");
      const body = {
        title: f.get("title"), author: f.get("author"), category: f.get("category"),
        description: f.get("description"), totalCopies: Number(f.get("totalCopies")),
      };
      if (file && file.size > 0) body.image = await uploadImage(file);
      const updated = await api(`/books/${editing._id}`, { method: "PATCH", auth: true, body });
      setBooks((list) => list.map((b) => (b._id === updated._id ? updated : b)));
      toast.success("Book updated.");
      setEditing(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      setBooks((list) => list.filter((b) => b._id !== deleting._id));
      toast.success("Book deleted.");
      setDeleting(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page-wrap py-14">
      <SectionHeading title="My Books" sub="Books you have added. Edit them or take them off the shelf." />
      {!books ? <Spinner /> : books.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="mb-4 opacity-70">You have not added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary">Add Book</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead><tr><th>Book</th><th>Category</th><th>Copies</th><th>Added</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={b.image} alt="" className="h-16 w-12 rounded object-cover" />
                      <div><p className="font-semibold">{b.title}</p><p className="text-sm opacity-70">{b.author}</p></div>
                    </div>
                  </td>
                  <td>{b.category}</td>
                  <td>{b.availableCopies} / {b.totalCopies}</td>
                  <td>{formatDate(b.createdAt)}</td>
                  <td className="whitespace-nowrap text-right">
                    <button onClick={() => setEditing(b)} className="btn btn-primary btn-sm mr-2">Edit</button>
                    <button onClick={() => setDeleting(b)} className="btn btn-error btn-outline btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <dialog className="modal modal-open">
          <form onSubmit={saveEdit} className="modal-box max-h-[90vh] space-y-3 overflow-y-auto">
            <h3 className="text-xl font-bold">Edit book</h3>
            <label className="form-control w-full"><span className="label-text mb-1 block font-medium">Book Title</span>
              <input name="title" defaultValue={editing.title} required className="input input-bordered w-full" /></label>
            <label className="form-control w-full"><span className="label-text mb-1 block font-medium">Author Name</span>
              <input name="author" defaultValue={editing.author} required className="input input-bordered w-full" /></label>
            <label className="form-control w-full"><span className="label-text mb-1 block font-medium">Category</span>
              <select name="category" defaultValue={editing.category} className="select select-bordered w-full">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
            <label className="form-control w-full"><span className="label-text mb-1 block font-medium">Total Copies</span>
              <input name="totalCopies" type="number" min="1" defaultValue={editing.totalCopies} required className="input input-bordered w-full" /></label>
            <label className="form-control w-full"><span className="label-text mb-1 block font-medium">New image (optional)</span>
              <input name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full" /></label>
            <label className="form-control w-full"><span className="label-text mb-1 block font-medium">Short Description</span>
              <textarea name="description" defaultValue={editing.description} required rows={4} className="textarea textarea-bordered w-full" /></label>
            <div className="modal-action">
              <button type="button" onClick={() => setEditing(null)} className="btn">Cancel</button>
              <button disabled={busy} className="btn btn-primary">{busy ? <span className="loading loading-spinner" /> : "Save changes"}</button>
            </div>
          </form>
          <div className="modal-backdrop" onClick={() => setEditing(null)} />
        </dialog>
      )}

      {deleting && (
        <dialog className="modal modal-open" role="alertdialog">
          <div className="modal-box">
            <h3 className="text-xl font-bold">Delete this book?</h3>
            <p className="py-3">“{deleting.title}” will be removed from the shelves and from anyone’s borrow list. This cannot be undone.</p>
            <div className="modal-action">
              <button onClick={() => setDeleting(null)} className="btn">Keep book</button>
              <button onClick={confirmDelete} disabled={busy} className="btn btn-error">{busy ? <span className="loading loading-spinner" /> : "Delete book"}</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleting(null)} />
        </dialog>
      )}
    </section>
  );
}

export default function MyBooksPage() {
  return <PrivateRoute><MyBooks /></PrivateRoute>;
}
