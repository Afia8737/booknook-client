import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Logo from "@/components/Logo";

const socials = [
  { icon: FaXTwitter, label: "X", href: "https://x.com" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-base-300 bg-base-200">
      <div className="page-wrap grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm opacity-75">A small online library for neighbours. Add a book, borrow a book, return a book.</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Contact</h3>
          <p className="flex items-center gap-2 opacity-80"><FiMail /> hello@booknook.example</p>
          <p className="flex items-center gap-2 opacity-80"><FiPhone /> +880 1700 000000</p>
          <p className="flex items-center gap-2 opacity-80"><FiMapPin /> 12 Reading Lane, Dhaka</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-bold">Follow us</h3>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="btn btn-circle btn-outline btn-primary btn-sm"><Icon /></a>
            ))}
          </div>
          <div className="flex gap-4 pt-2 text-sm">
            <Link href="/books" className="link link-hover">All Books</Link>
            <Link href="/login" className="link link-hover">Login</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">© {new Date().getFullYear()} BookNook. All rights reserved.</div>
    </footer>
  );
}
