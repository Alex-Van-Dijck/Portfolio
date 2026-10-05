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
    </section>
  );
};

export default Hero;
