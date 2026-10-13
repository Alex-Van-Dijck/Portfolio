import { useLayoutEffect, useState } from "react";

import "./App.css";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import About from "./components/About";
import { Experience } from "./components/Experience";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark",
  );

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero isDark={theme === "dark"} />
        <About />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}

export default App;
