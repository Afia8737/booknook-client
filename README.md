# BookNook

**A small online library. Add a book, borrow a book, return a book.**

🔗 Live site: https://YOUR-CLIENT-URL.vercel.app
🔗 Server repo: https://github.com/YOUR-NAME/booknook-server

## Features
- Email/password and Google login with Better Auth and the MongoDB adapter, with redirect back to the page you wanted
- Home page with a Swiper.js slider and the six newest books loaded from MongoDB
- Add, edit and delete your own books (images uploaded to imgbb, custom confirm modal)
- Borrow system: pick 3, 7 or 14 days, see your loans in My Borrows and return them
- Copy tracking: Total Copies field, `$inc` on borrow and return, “Not Available” at zero, no double borrow
- JWT-protected API, light and dark theme toggle, Framer Motion animation, fully responsive
- Toast messages everywhere (no browser alerts), loading spinners, custom 404, per-route page titles

## Tech
Next.js (App Router) · Tailwind CSS · daisyUI · Better Auth · Swiper · Framer Motion · Express · MongoDB

## Run locally
```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev
```
Start `booknook-server` too (default `http://localhost:5000`).
