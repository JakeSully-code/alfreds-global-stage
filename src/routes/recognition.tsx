import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/recognition")({
  head: () => ({
    meta: [
      { title: "Global Recognition — Alfred Collins" },
      { name: "description", content: "Fellowships, awards, and stages — from the World Economic Forum to CGTN." },
      { property: "og:title", content: "Global Recognition — Alfred Collins" },
      { property: "og:description", content: "Fellowships, awards, and stages." },
    ],
  }),
  component: RecognitionPage,
});

const FELLOWSHIPS = [
  { name: "World Economic Forum", note: "Global Shapers Community — an initiative of the WEF." },
  { name: "Summer DAVOS Delegate", note: "Annual Meeting of the New Champions, China." },
  { name: "Watson Institute Scholar", note: "Global entrepreneurship fellowship." },
  { name: "Global Shapers — Founding Curator", note: "Founded and led a hub within the WEF network." },
  { name: "Microsoft Certified Educator", note: "Recognized educator credential." },
  { name: "McKinsey Forward", note: "Leadership & problem-solving program." },
  { name: "Community MBA", note: "Selective community strategy program." },
];

const AWARDS = [
  { name: "Regional Volunteer of the Year", org: "Junior Achievement Nigeria" },
];

const SPEAKING = [
  { kind: "Speaking", title: "Royal Leadership Institute · Kigali, Rwanda" },
  { kind: "Television", title: "CGTN — \"Frontier Tech & Growth for Emerging Economies\"" },
];

export default function RecognitionPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Global Recognition</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl tracking-tight text-balance max-w-3xl">
            Selected fellowships, awards &amp; stages.
          </h1>
        </Reveal>

        <div className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">Fellowships &amp; Credentials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FELLOWSHIPS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.04}>
                <div className="h-full rounded-xl border border-border bg-background p-6 hover:border-[var(--ink)] transition-colors">
                  <div className="font-serif text-xl">{f.name}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">Awards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {AWARDS.map((a) => (
              <div key={a.name} className="rounded-xl border border-border bg-background p-6">
                <div className="font-serif text-xl">{a.name}</div>
                <p className="mt-2 text-sm text-muted-foreground">{a.org}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">Speaking &amp; Media</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SPEAKING.map((s) => (
              <div key={s.title} className="rounded-xl bg-[var(--ink)] text-white p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">{s.kind}</div>
                <div className="mt-2 font-serif text-xl">{s.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Link to="/" className="text-sm text-[var(--ink)] underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
            ← Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
