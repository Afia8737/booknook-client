"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiMoon, FiSun } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState("booknook");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "booknook");
  }, []);

  const toggleTheme = () => {
    const next = theme === "booknook" ? "booknook-dark" : "booknook";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("booknook-theme", next);
    setTheme(next);
  };

  const logout = async () => {
    await authClient.signOut();
    toast.success("You are logged out. See you soon!");
    router.push("/");
  };

  const links = session ? [...publicLinks, ...privateLinks] : publicLinks;
  const user = session?.user;

  const navItems = links.map((l) => (
    <li key={l.href}>
      <Link href={l.href} className={pathname === l.href ? "font-semibold text-primary border-b-2 border-accent rounded-none" : ""}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="navbar page-wrap min-h-16">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost btn-square lg:hidden" aria-label="Open menu">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <Link href="/" aria-label="BookNook home"><Logo /></Link>
        </div>

        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </nav>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle" aria-label="Toggle light or dark theme">
            {theme === "booknook" ? <FiMoon size={19} /> : <FiSun size={19} />}
          </button>

          {isPending ? (
            <span className="skeleton h-10 w-10 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Open account menu">
                <div className="w-10 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-base-100">
                  {user.image ? <img src={user.image} alt={user.name} referrerPolicy="no-referrer" /> : (
                    <span className="flex h-full w-full items-center justify-center bg-primary text-primary-content font-bold">{user.name?.[0]?.toUpperCase()}</span>
                  )}
                </div>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow">
                <li className="menu-title text-base-content">{user.name}</li>
                <li><Link href="/profile">My Profile</Link></li>
                <li><button onClick={logout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-primary btn-sm sm:btn-md">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
