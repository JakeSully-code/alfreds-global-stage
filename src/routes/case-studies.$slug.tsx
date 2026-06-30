import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

const CASE_STUDIES: Record<string, {
  name: string;
  tagline: string;
  themes: string[];
  metrics: { value: string; label: string }[];
  sections: { h: string; p: string }[];
}> = {
  osmosis: {
    name: "Osmosis from Elsevier",
    tagline: "How community became a growth engine.",
    themes: ["Customer Discovery", "Product Insights", "Partnerships", "Referral Growth", "Adoption", "Cross-functional Leadership"],
    metrics: [
      { value: "50K+", label: "Referrals" },
      { value: "60+", label: "Countries" },
      { value: "1,000+", label: "Ambassadors" },
      { value: "$62K+", label: "Partnerships" },
    ],
    sections: [
      { h: "The Opportunity", p: "[Placeholder] Osmosis served learners in medicine and the health professions globally. The growth question was simple to ask and hard to answer: how do we turn delighted students into the primary growth channel?" },
      { h: "Discovery", p: "[Placeholder] Hundreds of conversations across regions surfaced a clear pattern — students wanted leadership, not perks." },
      { h: "The System", p: "[Placeholder] Designed an ambassador architecture with clear tiers, feedback loops, and product hooks." },
      { h: "Outcome", p: "[Placeholder] Referral, retention, and partnership outcomes followed — captured in the metric strip above." },
      { h: "Lessons", p: "[Placeholder] Community is operational, not magical. Build it like a product." },
    ],
  },
  roomz: {
    name: "ROOMZ",
    tagline: "Building a creator economy platform.",
    themes: ["0→1 Product", "Strategy", "Architecture", "Go-to-market"],
    metrics: [
      { value: "0→1", label: "Stage" },
      { value: "MVP", label: "Shipping" },
      { value: "2026", label: "Launch" },
    ],
    sections: [
      { h: "Problem", p: "[Placeholder] The creator economy is overserved with tools and underserved with infrastructure." },
      { h: "Research", p: "[Placeholder] Interviews, ethnography, and competitive teardowns to map the landscape." },
      { h: "PRDs", p: "[Placeholder] Tight problem statements before any design or engineering investment." },
      { h: "Roadmap", p: "[Placeholder] Sequenced bets, with kill criteria for each." },
      { h: "Architecture", p: "[Placeholder] Composable systems chosen to optimize iteration speed." },
      { h: "Product Strategy", p: "[Placeholder] Wedge → expansion → platform." },
      { h: "Go-to-market", p: "[Placeholder] Community-led, creator-anchored, content-distributed." },
      { h: "Lessons Learned", p: "[Placeholder] Notes from the build, updated as we ship." },
    ],
  },
  ascent: {
    name: "Ascent Innovation Lab",
    tagline: "Building an AI education platform.",
    themes: ["Curriculum Design", "AI-Generated Learning", "Personalized Education", "Scaling Vision"],
    metrics: [
      { value: "250+", label: "Learners" },
      { value: "AI", label: "Generated Curricula" },
      { value: "1:1", label: "Personalization" },
    ],
    sections: [
      { h: "Premise", p: "[Placeholder] What if every learner had a tutor calibrated to them?" },
      { h: "Approach", p: "[Placeholder] Curriculum graphs, AI-generated learning paths, evaluation rubrics." },
      { h: "Impact", p: "[Placeholder] Early outcomes from cohort pilots." },
    ],
  },
  "bulb-africa": {
    name: "Bulb Africa",
    tagline: "Scaling developer ecosystems.",
    themes: ["Ecosystem Building", "Developer Relations", "Programs"],
    metrics: [
      { value: "250+", label: "Developers Engaged" },
      { value: "20+", label: "Strategic Partners" },
      { value: "530+", label: "Events" },
    ],
    sections: [
      { h: "Context", p: "[Placeholder] Africa's developer talent vastly outpaces the infrastructure that supports it." },
      { h: "Programs", p: "[Placeholder] Built and scaled programs that turned individual talent into ecosystems." },
      { h: "Outcomes", p: "[Placeholder] Communities, hires, products." },
    ],
  },
};

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const cs = CASE_STUDIES[params.slug];
    if (!cs) throw notFound();
    return cs;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Case Study · Alfred Collins` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.name} — Case Study` },
          { property: "og:description", content: loaderData.tagline },
        ]
      : [],
  }),
  component: CaseStudy,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-serif text-5xl">Case study not found</h1>
      <Link to="/" className="mt-6 inline-block text-[var(--emerald)] underline">Back home</Link>
    </div>
  ),
});

function CaseStudy() {
  const cs = Route.useLoaderData();
  return (
    <article>
      <header className="container-x pt-16 pb-12 md:pt-24 md:pb-16">
        <Reveal>
          <Link to="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-[var(--emerald)]">
            ← Back to home
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
            {cs.name}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground italic font-serif max-w-3xl">
            {cs.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {cs.themes.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </header>

      <section className="bg-[var(--ink)] text-white">
        <div className="container-x py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {cs.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-3xl md:text-4xl text-[var(--emerald)]">{m.value}</div>
              <div className="text-sm text-white/60 mt-2">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="container-x py-20 max-w-3xl">
        {cs.sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.04}>
            <section className="mb-14">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--emerald)]">
                0{i + 1}
              </div>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">{s.h}</h2>
              <p className="mt-4 text-lg text-foreground/85 leading-relaxed">{s.p}</p>
            </section>
          </Reveal>
        ))}

        <div className="border-t border-border pt-10">
          <Link to="/" className="text-sm underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
            ← Back to all work
          </Link>
        </div>
      </div>
    </article>
  );
}
