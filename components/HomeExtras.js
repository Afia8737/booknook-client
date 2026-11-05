"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiBookOpen, FiCheckCircle, FiPlusCircle, FiSearch } from "react-icons/fi";
import SectionHeading from "@/components/SectionHeading";
import { CATEGORIES } from "@/lib/format";

const steps = [
  { icon: FiSearch, title: "Find a book", text: "Browse the shelves or search by title and author." },
  { icon: FiBookOpen, title: "Borrow it", text: "Confirm the borrow. You get it for 3, 7 or 14 days." },
  { icon: FiCheckCircle, title: "Return it", text: "Open My Borrows and press Return Book when you finish." },
  { icon: FiPlusCircle, title: "Share your own", text: "Add books you own so others can borrow them." },
];

const blurbs = {
  Fiction: "Novels and short stories",
  Science: "Curious minds, big ideas",
  History: "People and places of the past",
  Kids: "Picture books and early readers",
  Others: "Everything else on the shelf",
};

export function HowItWorks() {
  return (
    <section className="page-wrap pt-24">
      <SectionHeading title="How Borrowing Works" sub="Four small steps from shelf to reader." />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <motion.li key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="h-full rounded-box border border-base-300 bg-base-200/60 p-6">
            <Icon className="mb-4 text-secondary" size={30} />
            <h3 className="mb-1 text-xl font-bold">{title}</h3>
            <p className="opacity-75">{text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export function TopCategories() {
  return (
    <section className="page-wrap pt-24">
      <SectionHeading title="Top Categories" sub="Jump straight to the shelf you like." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((c) => (
          <Link key={c} href={`/books?category=${c}`} className="group flex h-full flex-col rounded-box border border-base-300 border-l-4 border-l-accent bg-base-100 p-5 transition hover:border-primary hover:border-l-accent">
            <h3 className="text-xl font-bold group-hover:text-primary">{c}</h3>
            <p className="mt-1 text-sm opacity-70">{blurbs[c]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
