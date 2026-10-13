import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

const SECTION_IDS = LINKS.map(({ href }) => href.slice(1));

interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const Nav = ({ theme, onToggleTheme }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { activeId, goTo } = useActiveSection(SECTION_IDS, "hero");

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!pillRef.current?.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none"
      aria-label="Main navigation"
    >
      <div
        ref={pillRef}
        className="pointer-events-auto flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-surface/90 border border-border backdrop-blur-md shadow-sm md:rounded-full"
      >
        <a
          href="#hero"
          onClick={() => goTo("hero")}
          aria-label="Back to top"
          className="font-mono text-xs text-accent font-medium px-3 py-1 rounded-full select-none focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent"
        >
          AVD
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => goTo(href.slice(1))}
              aria-current={activeId === href.slice(1) ? "location" : undefined}
              className={`px-3 py-1.5 text-xs font-mono hover:text-foreground rounded-full transition-colors focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent ${
                activeId === href.slice(1) ? "text-foreground" : "text-muted-fg"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <button
          onClick={onToggleTheme}
          className="ml-1.5 mr-0.5 w-7 h-7 flex items-center justify-center rounded-full text-muted-fg hover:text-foreground hover:bg-border transition-colors focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        <button
          ref={menuButtonRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden ml-1.5 w-7 h-7 items-center justify-center rounded-full text-muted-fg hover:text-foreground hover:bg-border transition-colors focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-16 right-0 w-48 bg-surface border border-border rounded-lg shadow-lg backdrop-blur-md md:hidden">
            <div className="flex flex-col p-2">
              {LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => {
                    goTo(href.slice(1));
                    setMobileMenuOpen(false);
                  }}
                  aria-current={
                    activeId === href.slice(1) ? "location" : undefined
                  }
                  className={`px-3 py-2 text-sm font-mono hover:text-foreground hover:bg-border rounded transition-colors focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent ${
                    activeId === href.slice(1)
                      ? "text-foreground"
                      : "text-muted-fg"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
