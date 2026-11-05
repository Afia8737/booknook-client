export default function AuthShell({ title, sub, children }) {
  return (
    <div className="page-wrap flex justify-center py-14">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <h1 className="section-title mb-1">{title}</h1>
        <p className="mb-6 opacity-70">{sub}</p>
        {children}
      </div>
    </div>
  );
}
