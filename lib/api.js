import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Small fetch wrapper. With { auth: true } it attaches the Better Auth JWT as a Bearer token.
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Please log in again to continue.");
    headers.Authorization = `Bearer ${data.token}`;
  }
  const res = await fetch(`${API}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong. Please try again.");
  return json;
}
