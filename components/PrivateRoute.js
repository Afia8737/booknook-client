"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Spinner from "@/components/Spinner";

// Waits for the session to load (so reloads never bounce a logged in user to /login),
// then sends guests to /login with a redirect back to this page.
export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isPending, session, pathname, router]);

  if (isPending || !session) return <Spinner full />;
  return children;
}
