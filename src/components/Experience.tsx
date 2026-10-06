import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Job {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  bullets: string[];
  websiteUrl: string;
}

const JOBS: Job[] = [
  {
    company: "[Axxes]",
    role: "[Front-end consultant]",
    startDate: new Date("may, 2026"),
    description:
      "[Axxes is a full-service IT consultancy company that supports businesses with digital transformations, software development, and IT staffing solutions.]",
    bullets: [
      "[Contributed to the frontend training day of our Software traineeship.]",
      "[Deepened my frontend expertise by learning advanced React and exploring Angular.]",
      "[Broadened my profile by attending the software traineeship, which covered architecture, AI development, cloud computing and Java development.]",
    ],
    websiteUrl: "https://www.axxes.com/",
  },
  {
    company: "[Bloomup]",
    role: "[Full-Stack Engineer]",
    startDate: new Date("september, 2023"),
    endDate: new Date("may, 2026"),
    description:
      "[BloomUp is an Antwerp-based startup offering online mental health support. I worked full-stack in a two-person engineering team reporting directly to the founder, owning everything from frontend development to GraphQL API design, infrastructure, and security remediation. My most notable project was integrating an acquired e-learning platform: merging its React frontend and auth into our stack, and migrating its MySQL data and infrastructure onto our AWS/PostgreSQL setup.]",
    bullets: [
      "[Migrated from a React Context-driven architecture to a server-side state approach powered by a GraphQL API]",
      "[Built a new end-to-end matching flow connecting users to psychologists and coaches, from UX design through to implementation.]",
      "[Integrated a customer engagement platform (customer.io)]",
      "[Reworked the video conferencing implementation]",
      "[Co-designed UX and fully implemented a new homescreen for the React Native mobile application.]",
    ],
    websiteUrl: "https://www.bloomup.org",
  },
];

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { ref, className } = useScrollReveal();

  return (
    <section id="experience" className="py-32 md:py-44 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <span className="font-mono text-xs text-muted-fg tracking-widest uppercase shrink-0">
            Experience
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div ref={ref} className={className}>
          {JOBS.map((job, i) => {
            const open = expanded === i;
            return (
              <div key={i} className="border-t border-border last:border-b">
                <button
                  className="w-full text-left py-6 md:py-7 grid grid-cols-1 md:grid-cols-[2fr_2fr_auto] gap-1.5 md:gap-8 items-baseline group hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  onClick={() => setExpanded(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="font-display font-semibold text-lg md:text-xl text-foreground group-hover:text-accent transition-colors">
                    {job.company}
                  </span>
                  <span className="font-sans text-sm text-muted-fg">
                    {job.role}
                  </span>
                  <span className="font-mono text-xs text-muted-fg md:text-right">
                    {`${job.startDate.getMonth() + 1}/${job.startDate.getFullYear()} - ${job.endDate ? job.endDate?.getMonth() + 1 + "/" + job.endDate.getFullYear() : "present"}`}
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: open ? "480px" : "0",
                    opacity: open ? 1 : 0,
                  }}
                >
                  <div className="pb-8 space-y-4">
                    <p className="font-sans text-sm text-foreground leading-relaxed">
                      {job.description}
                    </p>
                    <div className="space-y-3">
                      {job.bullets.map((b, j) => (
                        <p
                          key={j}
                          className="font-sans text-sm text-muted-fg flex gap-3 leading-relaxed"
                        >
                          <span className="text-accent shrink-0 select-none mt-px">
                            —
                          </span>
                          {b}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
