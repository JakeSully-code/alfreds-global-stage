import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/product-thinking")({
  head: () => ({
    meta: [
      { title: "Product Thinking · Alfred Collins" },
      { name: "description", content: "Artifacts and frameworks: PRDs, roadmaps, journey maps, prioritization, research." },
      { property: "og:title", content: "Product Thinking · Alfred Collins" },
      { property: "og:description", content: "From insight to artifact — how I think about building products." },
    ],
  }),
  component: ProductThinking,
});

const ARTIFACTS = [
  { t: "Product Requirement Docs", d: "Tight problem statements, success metrics, kill criteria." },
  { t: "Roadmaps", d: "Sequenced bets — communicated for execution, not theater." },
  { t: "User Stories", d: "Written from the user's mouth, not the team's." },
  { t: "Customer Journey Maps", d: "Where the product meets the person, frame by frame." },
  { t: "Feature Prioritization", d: "Frameworks tuned to the stage of the company." },
  { t: "Product Strategy", d: "Where to play, how to win, what to ignore." },
  { t: "Research", d: "Interviews, surveys, ethnography, telemetry — triangulated." },
  { t: "Problem Statements", d: "The discipline of writing the question before the answer." },
];

function ProductThinking() {
  return (
    <div>
      <header className="container-x pt-20 pb-12 md:pt-28 md:pb-16">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Product Thinking
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance max-w-4xl">
            From <span className="italic">insight</span> to <span className="italic text-[var(--emerald)]">artifact</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A working library of how I structure product work — the documents,
            the rituals, and the rules of thumb that make teams faster.
          </p>
        </Reveal>
      </header>

      <section className="container-x pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-4">
          {ARTIFACTS.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.04}>
              <article className="rounded-2xl border border-border bg-background p-7 lift">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Artifact</div>
                <h2 className="mt-2 font-serif text-2xl">{a.t}</h2>
                <p className="mt-3 text-muted-foreground">{a.d}</p>
                <div className="mt-6 aspect-[16/9] rounded-lg bg-[var(--surface)] border border-border grid place-items-center text-xs font-mono text-muted-foreground">
                  PREVIEW · placeholder
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Link to="/" className="text-sm underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
