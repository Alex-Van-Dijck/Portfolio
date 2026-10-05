import { useEffect, useState } from "react";

import "./App.css";
import Hero from "./components/Hero";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* <Nav theme={theme} onToggleTheme={toggleTheme} /> */}
      <main>
        <Hero isDark={theme === "dark"} />
        {/* <About />
        <Experience />
        <Works />
        <Certificates />
        <Contact /> */}
      </main>
    </div>
  );
}

export default App;
