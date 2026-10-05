import Hero3D from "./Hero3D";

interface HeroProps {
  isDark: boolean;
}

const Hero = ({ isDark }: HeroProps) => {
  return (
    <section
      id="Hero"
      className="relative overflow-hidden"
      style={{ height: "100svh" }}
    >
      <div className="absolute inset-0 z-0">
        <Hero3D isDark={isDark} />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, var(--background) 20%, color-mix(in oklch, var(--background) 55%, transparent) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 px-8 md:px-16 lg:px-24 pointer-events-none">
        <div className="max-w-[640px] space-y-5 pointer-events-auto">
          <h1
            className="font-display font-bold leading-[0.92] tracking-tight text-foreground whitespace-nowrap"
            style={{ fontSize: "clamp(2.8rem, 6vw, 7rem)" }}
          >
            [Alex Van Dijck]
          </h1>

          <p className="font-mono text-sm text-muted-fg tracking-wide">
            Full-stack consultant · Wuustwezel
            <span className="cursor-blink ml-0.5 text-accent" aria-hidden>
              ▮
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-accent text-[#0A0A0C] text-sm font-display font-semibold hover:scale-[1.03] active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent"
            >
              Let's talk →
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 right-8 lg:right-16 z-10 hidden md:flex items-center gap-2 text-muted-fg font-mono text-[10px] tracking-widest select-none pointer-events-none"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        aria-hidden
      >
        scroll
        <span className="w-px h-8 bg-border" />
      </div>
    </section>
  );
};

export default Hero;
