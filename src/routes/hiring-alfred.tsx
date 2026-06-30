import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/hiring-alfred")({
  head: () => ({
    meta: [
      { title: "Hiring Alfred — Private Brief" },
      { name: "description", content: "Private brief for recruiters and hiring managers." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: HiringAlfred,
});

// Light client-side gate — NOT real security.
const PASS = "build2026";

function HiringAlfred() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  if (!unlocked) {
    return (
      <div className="min-h-[80vh] grid place-items-center container-x">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw.trim().toLowerCase() === PASS) setUnlocked(true);
            else setErr(true);
          }}
          className="w-full max-w-md rounded-2xl border border-border bg-background p-8"
        >
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Private
          </div>
          <h1 className="mt-3 font-serif text-3xl">Hiring Alfred</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This page is shared by invitation. Enter the passcode to continue.
          </p>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            placeholder="Passcode"
            className="mt-6 w-full rounded-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-[var(--ink)]"
          />
          {err && <p className="mt-2 text-xs text-destructive">Incorrect passcode.</p>}
          <button className="mt-4 w-full rounded-full bg-[var(--emerald)] text-white px-5 py-3 text-sm font-medium hover:opacity-90">
            Unlock
          </button>
          <p className="mt-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-center">
            Light protection · not real security
          </p>
        </form>
      </div>
    );
  }

  return (
    <div>
      <header className="container-x pt-20 pb-10">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--emerald)]">
            For hiring teams · confidential
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
            Hiring <span className="italic">Alfred.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A sharp, one-page brief built for the moment between "interesting profile"
            and "let's talk."
          </p>
        </Reveal>
      </header>

      <Block title="Why hire Alfred">
        <ul className="grid md:grid-cols-2 gap-3">
          {[
            "Operator who has shipped product, run programs, and scaled communities.",
            "Comfortable across customer, product, partnerships, and exec.",
            "Global — has built in 60+ countries.",
            "Translates strategy into systems people can actually run.",
          ].map((p) => (
            <li key={p} className="rounded-xl border border-border bg-background p-5 text-sm">
              {p}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Top competencies" surface>
        <div className="flex flex-wrap gap-2">
          {["Product Strategy", "Community Architecture", "Partnerships", "Programs", "Go-to-Market", "Research", "Cross-functional Leadership", "Storytelling"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-mono uppercase tracking-wider">
              {c}
            </span>
          ))}
        </div>
      </Block>

      <Block title="Leadership philosophy">
        <blockquote className="border-l-2 border-[var(--emerald)] pl-6 font-serif text-2xl italic leading-snug max-w-3xl">
          "Trust the team to do the work. Build the system that lets them. Hold
          the standard, not the steering wheel."
        </blockquote>
      </Block>

      <Block title="Resume" surface>
        <div className="grid md:grid-cols-3 gap-4">
          {["Programs Management", "Community", "Product Strategy"].map((r) => (
            <a key={r} href="#" className="rounded-xl border border-border bg-background p-5 lift flex items-center justify-between">
              <span className="text-sm">{r} Resume</span>
              <span className="text-muted-foreground">↓</span>
            </a>
          ))}
        </div>
      </Block>

      <Block title="References">
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          {["Shiv Gaglani", "Jorge Mendes", "Victoria Cumberbatch"].map((n) => (
            <div key={n} className="rounded-xl border border-border bg-background p-5">
              <div className="font-medium">{n}</div>
              <div className="text-xs text-muted-foreground mt-1">Available on request</div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Case studies" surface>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { slug: "osmosis", t: "Osmosis — Community as growth engine" },
            { slug: "roomz", t: "ROOMZ — 0→1 product build" },
            { slug: "ascent", t: "Ascent — AI education platform" },
            { slug: "bulb-africa", t: "Bulb Africa — Developer ecosystems" },
          ].map((c) => (
            <Link
              key={c.slug}
              to="/case-studies/$slug"
              params={{ slug: c.slug }}
              className="rounded-xl border border-border bg-background p-5 lift flex items-center justify-between text-sm"
            >
              <span>{c.t}</span>
              <span className="text-muted-foreground">→</span>
            </Link>
          ))}
        </div>
      </Block>

      <Block title="Interview availability">
        <div className="rounded-2xl bg-[var(--ink)] text-white p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">Open windows</div>
            <div className="font-serif text-2xl mt-1">Tue–Thu · 9am–1pm GMT+1</div>
          </div>
          <a
            href="https://calendly.com"
            className="rounded-full bg-[var(--emerald)] text-white px-5 py-3 text-sm font-medium hover:opacity-90"
          >
            Book a slot →
          </a>
        </div>
      </Block>
    </div>
  );
}

function Block({ title, children, surface }: { title: string; children: React.ReactNode; surface?: boolean }) {
  return (
    <section className={`py-14 ${surface ? "bg-[var(--surface)]" : ""}`}>
      <div className="container-x">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">{title}</h2>
        </Reveal>
        <Reveal delay={0.05}>{children}</Reveal>
      </div>
    </section>
  );
}
