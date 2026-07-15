import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

const CASE_STUDIES: Record<string, {
  name: string;
  tagline: string;
  themes: string[];
  metrics: { value: string; label: string }[];
  sections: { h: string; p: string }[];
}> = {
  ascent: {
    name: "Ascent Innovation Lab",
    tagline: "Developed an education platform to empower GenZs across the Global South with AI & VR skills.",
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
  "global-collaboration-village": {
    name: "Global Collaboration Village",
    tagline: "Leverage immersive tech to provide feedback on stakeholder collaboration in the Metaverse.",
    themes: ["Immersive Tech", "AI", "Sustainability", "Stakeholder Collaboration"],
    metrics: [
      { value: "VR/AI", label: "Platform" },
      { value: "Global", label: "Stakeholders" },
      { value: "Climate", label: "Focus Area" },
    ],
    sections: [
      { h: "Context", p: "[Placeholder] Climate collaboration across governments, companies, and civil society needed a new kind of room." },
      { h: "Approach", p: "[Placeholder] Used immersive and AI-powered tools to gather structured feedback from stakeholders inside the Metaverse." },
      { h: "Outcomes", p: "[Placeholder] Insights that informed sustainability panel sessions and cross-stakeholder alignment." },
    ],
  },
  "bulb-africa": {
    name: "The Bulb Africa",
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

type CaseStudyData = (typeof CASE_STUDIES)[keyof typeof CASE_STUDIES];

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }): CaseStudyData => {
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
  const cs = Route.useLoaderData() as CaseStudyData;
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
