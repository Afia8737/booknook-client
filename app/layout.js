import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const body = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

// export const metadata = {
//   title: "BookNook | A Small Online Library",
//   description: "Add a book, borrow a book, return a book.",
// };

// Sets the saved theme before paint to avoid a flash
const themeScript = `try{var t=localStorage.getItem('booknook-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'booknook-dark':'booknook'}document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="booknook" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-base-100 text-base-content">
        <Providers>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
