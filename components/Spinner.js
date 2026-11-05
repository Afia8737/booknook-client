export default function Spinner({ full = false }) {
  return (
    <div className={`flex items-center justify-center ${full ? "min-h-[60vh]" : "py-16"}`} role="status" aria-label="Loading">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
