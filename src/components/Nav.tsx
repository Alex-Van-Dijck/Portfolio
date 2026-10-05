import { Sun, Moon } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#works", label: "Works" },
  { href: "#contact", label: "Contact" },
];

interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const Nav = ({ theme, onToggleTheme }: Props) => {
  return (
    <nav
      className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none"
      aria-label="Main navigation"
    >
      <div className="pointer-events-auto flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-surface/90 border border-border backdrop-blur-md shadow-sm">
        <span className="font-mono text-xs text-accent font-medium px-3 py-1 select-none">
          AVD
        </span>

        {LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="px-3 py-1.5 text-xs font-mono text-muted-fg hover:text-foreground rounded-full transition-colors focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent"
          >
            {label}
          </a>
        ))}

        <button
          onClick={onToggleTheme}
          className="ml-1.5 mr-0.5 w-7 h-7 flex items-center justify-center rounded-full text-muted-fg hover:text-foreground hover:bg-border transition-colors focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
