import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="container-x py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-serif text-2xl text-[var(--ink)]">
            Alfred Collins<span className="text-[var(--emerald)]">.</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Building products, communities, and systems that scale human potential.
          </p>
        </div>
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="/#work" className="hover:text-[var(--emerald)]">Case Studies</a></li>
            <li><Link to="/product-thinking" className="hover:text-[var(--emerald)]">Product Thinking</Link></li>
            <li><Link to="/community-strategy" className="hover:text-[var(--emerald)]">Community Strategy</Link></li>
            <li><a href="/#resume" className="hover:text-[var(--emerald)]">Resume</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Connect
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:hello@alfredcollins.com" className="hover:text-[var(--emerald)]">Email</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[var(--emerald)]">LinkedIn</a></li>
            <li><a href="https://calendly.com" target="_blank" rel="noreferrer" className="hover:text-[var(--emerald)]">Calendly</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Alfred Collins. All rights reserved.</span>
          <span className="font-mono">v1.0</span>
        </div>
      </div>
    </footer>
  );
}
