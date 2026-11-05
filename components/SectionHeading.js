export default function SectionHeading({ title, sub, center = false }) {
  return (
    <div className={`mb-10 space-y-2 ${center ? "mx-auto text-center" : ""}`}>
      <h2 className="section-title">{title}</h2>
      {sub && <p className={`section-sub ${center ? "mx-auto" : ""}`}>{sub}</p>}
    </div>
  );
}
