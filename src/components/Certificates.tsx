const CERTS = [
  "[Certified Senior React Developer]",
  "[Certified Mid-Level Angular Developer]",
  "[Graph Developer - Associate]",
  "[Building with the Claude API]",
];

const Certificates = () => {
  return (
    <section
      id="certificates"
      className="py-14 md:py-16 px-8 md:px-16 lg:px-24 border-t border-border"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-center gap-5">
        <span className="font-mono text-xs text-muted-fg tracking-widest uppercase shrink-0">
          Certificates
        </span>
        <div className="flex flex-wrap gap-2">
          {CERTS.map((c) => (
            <span
              key={c}
              className="px-3 py-1 rounded-full bg-surface border border-border font-mono text-[11px] text-muted-fg"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Certificates;
