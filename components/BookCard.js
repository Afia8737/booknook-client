import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <article className="card h-full border border-base-300 bg-base-100 transition hover:border-primary">
      <figure className="h-64 w-full bg-base-200">
        <img src={book.image} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body gap-1 p-5">
        <span className="badge badge-secondary badge-outline">{book.category}</span>
        <h3 className="card-title mt-1 line-clamp-1 text-xl">{book.title}</h3>
        <p className="line-clamp-1 text-sm opacity-70">by {book.author}</p>
        <div className="card-actions mt-auto pt-4">
          <Link href={`/books/${book._id}`} className="btn btn-primary w-full">View Details</Link>
        </div>
      </div>
    </article>
  );
}
