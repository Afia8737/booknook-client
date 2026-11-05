"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import SectionHeading from "@/components/SectionHeading";

export default function NewArrivals() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    api("/books?limit=6")
      .then(setBooks)
      .catch((e) => { toast.error(e.message); setBooks([]); });
  }, []);

  return (
    <section className="page-wrap pt-20">
      <SectionHeading title="New Arrivals" sub="The six newest books on our shelves." />
      {!books ? <Spinner /> : books.length === 0 ? (
        <p className="rounded-box border border-dashed border-base-300 p-10 text-center opacity-70">No books yet. Be the first to add one.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => <BookCard key={b._id} book={b} />)}
        </div>
      )}
      <div className="mt-10 text-center"><Link href="/books" className="btn btn-primary">See All Books</Link></div>
    </section>
  );
}
