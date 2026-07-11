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
      { property: "og:title", content: "Alfred Collins — Product, Community & Systems Leader" },
      {
        property: "og:description",
        content: "Product strategist, systems thinker, entrepreneur, and global community leader. Building products, communities, and systems that scale human potential.",
      },
    ],
  }),
  component: Home,
});

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

const RECOGNITION_STRIP = [
  "World Economic Forum",
  "Summer DAVOS",
  "Watson Institute",
  "Global Shapers",
  "Microsoft Certified Educator",
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
              <p className="mt-7 font-serif italic text-xl md:text-2xl text-[var(--ink)] leading-snug">
                Community &amp; Ecosystem Builder | Global Program Leader | Product Strategist
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
                <Link
                  to="/hiring-alfred"
                  className="inline-flex items-center rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
                >
                  For Recruiters →
                </Link>
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

      {/* STORY TEASER */}
      <Section id="story" eyebrow="01 — My Story">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-[var(--ink)]/80 max-w-sm">
                I build systems that{" "}
                <span className="text-[var(--emerald)]">unlock opportunities</span>{" "}
                for people.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 max-w-[62ch] space-y-6">
            <Reveal delay={0.05}>
              <p className="text-lg text-foreground/85 leading-[1.75]">
                It started in a small home in Lagos, where my mother taught me that
                opportunity isn't something you wait for — it's something you create
                for others. That single idea has shaped every product I've shipped,
                every community I've built, and every partnership I've forged since.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="border-l-2 border-[var(--emerald)] pl-6 font-serif text-2xl md:text-3xl leading-[1.15] tracking-tight text-[var(--ink)]">
                How do we build systems that unlock opportunities for more people?
              </blockquote>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                to="/story"
                className="inline-block text-sm text-[var(--ink)] underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]"
              >
                Read my story →
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* IMPACT */}
      <Section id="impact" eyebrow="02 — Impact" title="The shape of the work." surface>
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
      <Section id="work" eyebrow="03 — Featured Case Studies" title="Selected work.">
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

      {/* RECOGNITION STRIP */}
      <Section id="recognition-strip" eyebrow="04 — Global Recognition" title="Selected stages & fellowships." surface>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {RECOGNITION_STRIP.map((r) => (
            <div
              key={r}
              className="rounded-xl border border-border p-5 bg-background hover:border-[var(--ink)] transition-colors text-sm text-center"
            >
              {r}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/recognition" className="text-sm text-[var(--ink)] underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
            See all recognition →
          </Link>
        </div>
      </Section>

      {/* CURRENT FOCUS */}
      <Section id="focus" eyebrow="05 — Current Focus">
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
      <Section id="contact" eyebrow="06 — Contact" title="Let's build something." surface>
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
