import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/community-strategy")({
  head: () => ({
    meta: [
      { title: "Community Strategy · Alfred Collins" },
      { name: "description", content: "A framework for building communities that compound — not audiences that churn." },
      { property: "og:title", content: "Community Strategy · Alfred Collins" },
      { property: "og:description", content: "Community ≠ audience. A working framework." },
    ],
  }),
  component: CommunityStrategy,
});

const PILLARS = [
  { t: "Community ≠ Audience", p: "An audience consumes. A community contributes. The shift in verb is the whole game." },
  { t: "Building Ecosystems", p: "Design for compounding value across many actors — not single transactions." },
  { t: "Advocacy", p: "Permission to speak on behalf of the brand is earned, not granted. Systems matter." },
  { t: "Events", p: "Rituals create belonging. Belonging creates retention." },
  { t: "Ambassador Programs", p: "Tiered structures with leadership pathways — not perk programs in disguise." },
  { t: "Growth Loops", p: "Members create artifacts that recruit other members. Find them, then fund them." },
  { t: "Product Feedback Systems", p: "Structured listening pipelines that turn members into co-builders." },
  { t: "Metrics", p: "NPS. Retention. Activation. Plus a handful of leading indicators few people measure." },
];

function CommunityStrategy() {
  return (
    <div>
      <header className="container-x pt-20 pb-12 md:pt-28 md:pb-16">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Community Strategy
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance max-w-4xl">
            Community is not an <span className="italic">audience</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A working framework — eight pillars I return to whenever I help
            organizations turn members into momentum.
          </p>
        </Reveal>
      </header>

      <section className="bg-[var(--surface)] py-20 md:py-28">
        <div className="container-x grid md:grid-cols-2 gap-x-12 gap-y-14">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.04}>
              <div>
                <div className="font-mono text-xs text-[var(--emerald)]">0{i + 1}</div>
                <h2 className="mt-2 font-serif text-3xl">{p.t}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container-x py-16">
        <Link to="/" className="text-sm underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
