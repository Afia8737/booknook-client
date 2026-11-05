"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import useTitle from "@/lib/useTitle";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import SectionHeading from "@/components/SectionHeading";

function MyBorrows() {
  useTitle("My Borrows");
  const [borrows, setBorrows] = useState(null);
  const [returning, setReturning] = useState(null);

  useEffect(() => {
    api("/borrows", { auth: true }).then(setBorrows).catch((e) => { toast.error(e.message); setBorrows([]); });
  }, []);

  const giveBack = async (b) => {
    setReturning(b._id);
    try {
      await api(`/borrows/${b._id}`, { method: "DELETE", auth: true });
      setBorrows((list) => list.filter((x) => x._id !== b._id));
      toast.success(`“${b.bookTitle}” returned. Thank you!`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReturning(null);
    }
  };

  return (
    <section className="page-wrap py-14">
      <SectionHeading title="My Borrows" sub="Books you have on loan right now." />
      {!borrows ? <Spinner /> : borrows.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="mb-4 opacity-70">You have no borrowed books.</p>
          <Link href="/books" className="btn btn-primary">Browse Books</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead><tr><th>Image</th><th>Title</th><th>Borrow Date</th><th>Return Date</th><th className="text-right">Action</th></tr></thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id}>
                  <td><img src={b.bookImage} alt="" className="h-16 w-12 rounded object-cover" /></td>
                  <td className="font-semibold">{b.bookTitle}</td>
                  <td>{formatDate(b.borrowDate)}</td>
                  <td>{formatDate(b.returnDate)}</td>
                  <td className="text-right">
                    <button onClick={() => giveBack(b)} disabled={returning === b._id} className="btn btn-primary btn-sm">
                      {returning === b._id ? <span className="loading loading-spinner loading-xs" /> : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function MyBorrowsPage() {
  return <PrivateRoute><MyBorrows /></PrivateRoute>;
}
