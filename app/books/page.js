"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { CATEGORIES } from "@/lib/format";
import useTitle from "@/lib/useTitle";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import SectionHeading from "@/components/SectionHeading";

function Books() {
  useTitle("All Books");
  const initial = useSearchParams().get("category");
  const [books, setBooks] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(CATEGORIES.includes(initial) ? initial : "All");

  useEffect(() => {
    api("/books").then(setBooks).catch((e) => { toast.error(e.message); setBooks([]); });
  }, []);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (books || []).filter((b) =>
      (category === "All" || b.category === category) &&
      (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)));
  }, [books, search, category]);

  return (
    <section className="page-wrap py-14">
      <SectionHeading title="All Books" sub="Everything on the shelves right now." />
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or author" className="input input-bordered w-full sm:max-w-sm" aria-label="Search books" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full sm:w-48" aria-label="Filter by category">
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {!books ? <Spinner /> : shown.length === 0 ? (
        <p className="rounded-box border border-dashed border-base-300 p-10 text-center opacity-70">No books match. Try another search or category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((b) => <BookCard key={b._id} book={b} />)}
        </div>
      )}
    </section>
  );
}

export default function BooksPage() {
  return <Suspense fallback={<Spinner full />}><Books /></Suspense>;
}
