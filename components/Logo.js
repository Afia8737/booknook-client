export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xl font-extrabold text-primary ${className}`} style={{ fontFamily: "var(--font-bricolage)" }}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="3" y="4" width="7" height="24" rx="1.5" fill="currentColor" />
        <rect x="12" y="4" width="7" height="24" rx="1.5" fill="var(--color-secondary)" />
        <rect x="21.2" y="6" width="7" height="22" rx="1.5" transform="rotate(14 24.7 17)" fill="var(--color-accent)" />
      </svg>
      BookNook
    </span>
  );
}
