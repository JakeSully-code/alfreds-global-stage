import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import portrait from "@/assets/portrait.jpg";
import { WorldMap } from "@/components/site/WorldMap";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alfred Collins — Product, Community & Systems Leader" },
      {
        name: "description",
        content:
          "Product strategist, systems thinker, entrepreneur, and global community leader. Building products, communities, and systems that scale human potential.",
      },
      { property: "og:title", content: "Alfred Collins" },
      {
        property: "og:description",
        content: "Building products, communities, and systems that scale human potential.",
      },
    ],
  }),
  component: Home,
});

const TIMELINE = [
  { year: "2014", title: "University", body: "The starting line. First taste of building things that people actually use." },
  { year: "2021", title: "Watson Institute", body: "Scholar — sharpening as an entrepreneur on a global stage." },
  { year: "2022", title: "Bulb Africa", body: "Scaling developer ecosystems across the continent." },
  { year: "2023", title: "Osmosis from Elsevier", body: "Turned community into a measurable growth engine for medical education." },
  { year: "2024", title: "Global Shapers Community", body: "Founding Curator — an initiative of the World Economic Forum." },
  { year: "2024", title: "Summer DAVOS", body: "Delegate at the Annual Meeting of the New Champions." },
  { year: "2026", title: "ROOMZ", body: "Building a creator economy platform from the ground up." },
  { year: "Future", title: "What's next…", body: "Still building. Still learning. Still curious." },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Referrals Generated" },
  { value: 60, suffix: "+", label: "Countries Supported" },
  { value: 530, suffix: "+", label: "Community Events" },
  { value: 62, prefix: "$", suffix: "K+", label: "Institutional Partnerships" },
  { value: 20, suffix: "+", label: "Strategic Partnerships" },
  { value: 1000, suffix: "+", label: "Ambassadors & Students Impacted" },
  { value: 250, suffix: "+", label: "Developers Engaged" },
  { value: 200, suffix: "+", label: "Monthly Product Requests Managed" },
];

const CASES = [
  { slug: "osmosis", name: "Osmosis", tag: "Growth · Community", line: "How community became a growth engine." },
  { slug: "roomz", name: "ROOMZ", tag: "0→1 Product", line: "Building a creator economy platform." },
  { slug: "ascent", name: "Ascent Innovation Lab", tag: "AI · Education", line: "Building an AI education platform." },
  { slug: "bulb-africa", name: "Bulb Africa", tag: "Ecosystem", line: "Scaling developer ecosystems." },
];

const RECOGNITION = [
  "World Economic Forum",
  "Summer DAVOS Delegate",
  "Watson Institute Scholar",
  "Global Shapers Founding Curator",
  "Microsoft Certified Educator",
  "McKinsey Forward",
  "Community MBA",
  "Regional Volunteer of the Year",
  "Junior Achievement Nigeria",
];

const TESTIMONIALS = [
  { name: "Shiv Gaglani", org: "Co-founder & CEO, Osmosis (Elsevier)" },
  { name: "Jorge Mendes", org: "Global Partnerships Leader" },
  { name: "Victoria Cumberbatch", org: "Community Strategy" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.55] pointer-events-none">
          <WorldMap />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
        <div className="container-x relative py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)] animate-pulse" />
                Lagos · New York · Davos
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
                Building Products, Communities &amp; Systems That{" "}
                <span className="italic">Scale Human Potential.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 font-serif italic text-xl md:text-2xl text-[var(--ink)]/80 leading-snug">
                Product Strategist | Community &amp; Ecosystem Builder | Global Program Leader
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                I help organizations translate customer insights into products,
                partnerships, and communities that create measurable business impact.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center rounded-full bg-[var(--emerald)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition lift"
                >
                  View My Work
                </a>
                <a
                  href="#resume"
                  className="inline-flex items-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-border bg-background/60 backdrop-blur px-6 py-3 text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] transition"
                >
                  Let's Build Together →
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-3xl bg-[var(--surface)]" />
              <motion.img
                src={portrait}
                alt="Alfred Collins"
                width={1024}
                height={1280}
                className="relative rounded-2xl object-cover aspect-[4/5] w-full shadow-[0_30px_80px_-30px_rgba(16,20,24,0.35)]"
                initial={{ scale: 1.02 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <Section id="story" eyebrow="01 — My Story">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-balance">
                I build systems that{" "}
                <span className="italic text-[var(--emerald)]">unlock opportunities</span>{" "}
                for people.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg text-foreground/85 leading-relaxed">
            <Reveal delay={0.05}>
              <p className="italic text-muted-foreground">
                [Placeholder — paste 4–6 paragraphs of long-form narrative here.
                This block is intentionally styled for editorial reading: long
                line lengths, generous leading, and serif pull quotes between
                paragraphs.]
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                I started by asking small questions — why some products feel
                inevitable and others feel like work. The answer, again and
                again, lived inside the people who used them.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <blockquote className="border-l-2 border-[var(--emerald)] pl-6 font-serif text-2xl italic leading-snug">
                "Products are the artifact. Communities are the engine. Systems
                are how both compound."
              </blockquote>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground">
                [More placeholder copy. Replace with the founder's narrative.]
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* TIMELINE */}
      <Section id="timeline" eyebrow="02 — Career Timeline" title="A non-linear path, on purpose.">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <Reveal key={`${t.year}-${t.title}`} delay={i * 0.04}>
                <div className={`relative grid md:grid-cols-2 md:gap-12 items-start ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="pl-12 md:pl-0 md:text-right md:pr-12">
                    <div className="font-mono text-xs uppercase tracking-widest text-[var(--emerald)]">{t.year}</div>
                    <div className="font-serif text-2xl mt-1">{t.title}</div>
                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{t.body}</p>
                  </div>
                  <div className="hidden md:block" />
                  <span className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--ink)] ring-4 ring-background" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* IMPACT */}
      <Section id="impact" eyebrow="03 — Impact" title="The shape of the work." surface>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background p-6 md:p-8">
              <div className="text-3xl md:text-4xl font-mono">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-xs md:text-sm text-muted-foreground leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* WORK */}
      <Section id="work" eyebrow="04 — Featured Case Studies" title="Selected work.">
        <div className="grid md:grid-cols-2 gap-6">
          {CASES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <Link
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="group block rounded-2xl border border-border bg-background p-8 lift"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {c.tag}
                  </div>
                  <span className="text-muted-foreground group-hover:text-[var(--emerald)] transition-colors">→</span>
                </div>
                <div className="mt-10 font-serif text-3xl">{c.name}</div>
                <p className="mt-2 text-muted-foreground">{c.line}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PRODUCT THINKING TEASER */}
      <Section id="product-thinking" eyebrow="05 — Product Thinking" title="From insight to artifact.">
        <div className="grid md:grid-cols-3 gap-4">
          {["PRDs", "Roadmaps", "User Stories", "Journey Maps", "Prioritization", "Strategy Docs", "Research", "Problem Statements"].map((t) => (
            <div key={t} className="rounded-xl border border-border p-5 bg-background lift">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Artifact</div>
              <div className="mt-2 font-serif text-xl">{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/product-thinking" className="text-sm text-[var(--ink)] underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
            Explore the full library →
          </Link>
        </div>
      </Section>

      {/* COMMUNITY TEASER */}
      <Section id="community" eyebrow="06 — Community Strategy" title="Community is not an audience." surface>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {[
            { h: "Ecosystems > Funnels", p: "Designing for compounding value, not single transactions." },
            { h: "Advocacy as Distribution", p: "Ambassadors carry the product further than ads ever will." },
            { h: "Feedback as Roadmap", p: "Structured listening that turns members into co-builders." },
          ].map((b) => (
            <div key={b.h} className="border-l-2 border-[var(--emerald)] pl-5">
              <div className="font-serif text-xl">{b.h}</div>
              <p className="mt-2 text-muted-foreground">{b.p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/community-strategy" className="text-sm underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
            Read the framework →
          </Link>
        </div>
      </Section>

      {/* RECOGNITION */}
      <Section id="recognition" eyebrow="07 — Global Recognition" title="Selected fellowships, awards & stages.">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {RECOGNITION.map((r) => (
            <div
              key={r}
              className="rounded-xl border border-border p-5 bg-background hover:border-[var(--ink)] transition-colors text-sm"
            >
              {r}
            </div>
          ))}
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[var(--ink)] text-white p-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">Speaking</div>
            <div className="mt-2 font-serif text-xl">Royal Leadership Institute · Kigali, Rwanda</div>
          </div>
          <div className="rounded-xl bg-[var(--ink)] text-white p-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">Television</div>
            <div className="mt-2 font-serif text-xl">CGTN — "Frontier Tech &amp; Growth for Emerging Economies"</div>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="recommendations" eyebrow="08 — Recommendations" title="In the words of collaborators." surface>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.name}>
              <figure className="h-full rounded-2xl border border-border bg-background p-7 flex flex-col">
                <blockquote className="font-serif text-xl leading-snug text-foreground/90 italic">
                  "[Quote placeholder — replace with the actual recommendation from {t.name}.]"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-[var(--surface)] grid place-items-center font-mono text-xs">
                    {t.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.org}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* MEDIA */}
      <Section id="media" eyebrow="09 — Media" title="Talks, panels, podcasts, writing.">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Conference Talk", "Podcast", "Panel", "Article", "LinkedIn Essay", "Video"].map((m) => (
            <div key={m} className="aspect-[4/3] rounded-xl bg-[var(--surface)] border border-border flex flex-col justify-end p-5 lift">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m}</div>
              <div className="font-serif text-lg mt-1">Placeholder title</div>
            </div>
          ))}
        </div>
      </Section>

      {/* RESUME */}
      <Section id="resume" eyebrow="10 — Resume" title="Three lenses on the same operator." surface>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              label: "Programs Management Resume",
              descriptor: "For roles in program & operations leadership across global teams.",
            },
            {
              label: "Community Resume",
              descriptor: "For community, developer relations, and ecosystem-building roles.",
            },
            {
              label: "Product Strategy Resume",
              descriptor: "For product management and product strategy roles.",
            },
          ].map((r) => (
            <a
              key={r.label}
              href="#"
              className="group rounded-2xl border border-border bg-background p-6 lift block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">PDF</div>
                  <div className="font-serif text-xl mt-1">{r.label}</div>
                </div>
                <span className="text-2xl text-muted-foreground group-hover:text-[var(--emerald)] transition-colors">↓</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed">
                {r.descriptor}
              </p>
            </a>
          ))}
        </div>
      </Section>

      {/* CURRENT FOCUS */}
      <Section id="focus" eyebrow="11 — Current Focus">
        <Reveal>
          <p className="font-serif text-3xl md:text-4xl leading-tight max-w-3xl">
            Currently speaking on{" "}
            <span className="italic text-[var(--emerald)]">Community, AI, Product</span>{" "}
            and <span className="italic text-[var(--emerald)]">Education</span> — and
            building ROOMZ.
          </p>
        </Reveal>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="12 — Contact" title="Let's build something." surface>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <a href="https://calendly.com/alfredcollinsc/consultingwithalfred" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-border bg-background p-5 lift">
              <span>Book a 30-min call</span>
              <span className="font-mono text-xs text-muted-foreground">CALENDLY →</span>
            </a>
            <a href="https://www.linkedin.com/in/alfred-collins/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-border bg-background p-5 lift">
              <span>Connect on LinkedIn</span>
              <span className="font-mono text-xs text-muted-foreground">LINKEDIN →</span>
            </a>
            <a href="mailto:hello@alfredcollins.com" className="flex items-center justify-between rounded-xl border border-border bg-background p-5 lift">
              <span>hello@alfredcollins.com</span>
              <span className="font-mono text-xs text-muted-foreground">EMAIL →</span>
            </a>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl bg-[var(--ink)] text-white p-7"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">Newsletter</div>
            <div className="font-serif text-2xl mt-1">Notes on products, communities &amp; systems.</div>
            <p className="text-sm text-white/70 mt-2">One thoughtful email, occasionally.</p>
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="you@domain.com"
                className="flex-1 rounded-full bg-white/10 border border-white/15 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-[var(--emerald)]"
              />
              <button className="rounded-full bg-[var(--emerald)] text-white px-5 py-3 text-sm font-medium hover:opacity-90">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
  surface,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  surface?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 scroll-mt-20 ${surface ? "bg-[var(--surface)]" : ""}`}
    >
      <div className="container-x">
        {(eyebrow || title) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && (
              <Reveal>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {eyebrow}
                </div>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight text-balance max-w-3xl">
                  {title}
                </h2>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
