import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const homeAnchors = [
  { id: "story", label: "Story" },
  { id: "timeline", label: "Timeline" },
  { id: "impact", label: "Impact" },
  { id: "work", label: "Work" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tight text-[var(--ink)]">
          Alfred Collins<span className="text-[var(--emerald)]">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {homeAnchors.map((a) => (
            <a key={a.id} href={`/#${a.id}`} className="hover:text-[var(--ink)] transition-colors">
              {a.label}
            </a>
          ))}
          <Link to="/product-thinking" className="hover:text-[var(--ink)] transition-colors">
            Product
          </Link>
          <Link to="/community-strategy" className="hover:text-[var(--ink)] transition-colors">
            Community
          </Link>
        </nav>

        <a
          href="/#contact"
          className="hidden md:inline-flex items-center rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-white hover:bg-[var(--emerald)] transition-colors"
        >
          Let's talk
        </a>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-5 h-px bg-[var(--ink)] mb-1.5" />
          <div className="w-5 h-px bg-[var(--ink)]" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container-x py-4 flex flex-col gap-3 text-sm">
            {homeAnchors.map((a) => (
              <a key={a.id} href={`/#${a.id}`} onClick={() => setOpen(false)}>
                {a.label}
              </a>
            ))}
            <Link to="/product-thinking" onClick={() => setOpen(false)}>Product Thinking</Link>
            <Link to="/community-strategy" onClick={() => setOpen(false)}>Community Strategy</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
