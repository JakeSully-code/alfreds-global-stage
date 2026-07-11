import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links: { to: string; label: string }[] = [
  { to: "/story", label: "Story" },
  { to: "/#work", label: "Work" },
  { to: "/recognition", label: "Recognition" },
  { to: "/media", label: "Media" },
  { to: "/#contact", label: "Contact" },
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
          {links.map((l) =>
            l.to.startsWith("/#") ? (
              <a key={l.to} href={l.to} className="hover:text-[var(--ink)] transition-colors">
                {l.label}
              </a>
            ) : (
              <Link key={l.to} to={l.to} className="hover:text-[var(--ink)] transition-colors">
                {l.label}
              </Link>
            )
          )}
        </nav>

        <Link
          to="/hiring-alfred"
          className="hidden md:inline-flex items-center rounded-full bg-[var(--emerald)] px-4 py-2 text-sm text-white hover:opacity-90 transition-opacity"
        >
          For Recruiters →
        </Link>

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
            {links.map((l) =>
              l.to.startsWith("/#") ? (
                <a key={l.to} href={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              )
            )}
            <Link to="/product-thinking" onClick={() => setOpen(false)}>Product Thinking</Link>
            <Link to="/community-strategy" onClick={() => setOpen(false)}>Community Strategy</Link>
            <Link to="/hiring-alfred" onClick={() => setOpen(false)} className="text-[var(--emerald)]">
              For Recruiters →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
