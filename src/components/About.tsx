import { useScrollReveal } from "../hooks/useScrollReveal";

const STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "GraphQL / REST",
  "PostgreSQL",
  "Claude",
  "AWS",
  "Docker",
  "Next.js",
  "Prisma",
];

const About = () => {
  const { ref: bioRef, className: bioClassName } = useScrollReveal(0);
  const { ref: tagsRef, className: tagsClassName } = useScrollReveal(80);

  return (
    <section id="about" className="py-32 md:py-44 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-12 lg:gap-20">
        <div className="pt-1">
          <span className="font-mono text-xs text-muted-fg tracking-widest uppercase">
            About
          </span>
        </div>

        <div className="space-y-10">
          <p
            ref={bioRef}
            className={`${bioClassName} font-display font-medium text-foreground leading-[1.45]`}
            style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)" }}
          >
            [I'm a full-stack engineer who leans into React and frontend craft,
            with solid experience building REST and GraphQL APIs in Node.js. I
            thrive working closely with business, owning my work end-to-end, and
            sweating the UX details that make an interface feel great. ]
          </p>

          <div ref={tagsRef} className={tagsClassName}>
            <div className="flex flex-wrap gap-2">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full border border-border font-mono text-xs text-muted-fg hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
