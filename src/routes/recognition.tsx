import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import wefSummit1 from "@/assets/wef-summit-1.jpg";
import wefSummit2 from "@/assets/wef-summit-2.jpg";
import wefShapers1 from "@/assets/wef-shapers-1.jpg";
import wefShapers2 from "@/assets/wef-shapers-2.jpg";
import wefConference from "@/assets/wef-conference.jpg";
import wefWall from "@/assets/wef-wall.jpg";
import unHq from "@/assets/un-hq.jpg";
import cgtn from "@/assets/cgtn.jpg";
import kigali from "@/assets/kigali.jpg";

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
  { name: "Global Collaboration Village", note: "AI & Immersive tech for Sustainability (climate panel sessions)." },
];

const AWARDS = [
  { name: "Regional Volunteer of the Year", org: "Junior Achievement Nigeria" },
];

const SPEAKING = [
  { kind: "Speaking", title: "Royal Leadership Institute · Kigali, Rwanda", img: kigali },
  { kind: "Television", title: "CGTN — \"Frontier Tech & Growth for Emerging Economies\"", img: cgtn, href: "https://www.youtube.com/watch?v=_33jgAvXAZ4&t=637s" },
];

const GALLERY = [
  { src: wefSummit1, alt: "Alfred Collins at the World Economic Forum summit", caption: "Photo: World Economic Forum" },
  { src: wefSummit2, alt: "Alfred Collins at the World Economic Forum summit", caption: "Photo: World Economic Forum" },
  { src: wefShapers1, alt: "Alfred Collins with the Global Shapers Community", caption: "Photo: World Economic Forum" },
  { src: wefShapers2, alt: "Alfred Collins with the Global Shapers Community", caption: "Photo: World Economic Forum" },
  { src: wefConference, alt: "Alfred Collins at a World Economic Forum conference" },
  { src: wefWall, alt: "Alfred Collins at the World Economic Forum recognition wall" },
  { src: unHq, alt: "Alfred Collins at the United Nations headquarters" },
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
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">Moments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.04}>
                <div>
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="rounded-xl object-cover aspect-square w-full"
                  />
                  {g.caption && (
                    <div className="mt-1.5 text-[11px] text-muted-foreground">{g.caption}</div>
                  )}
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
            {SPEAKING.map((s) => {
              const content = (
                <>
                  {s.img && (
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">{s.kind}</div>
                    <div className="mt-2 font-serif text-xl">{s.title}</div>
                  </div>
                </>
              );
              const className = "rounded-xl bg-[var(--ink)] text-white overflow-hidden block";
              return s.href ? (
                <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className={`${className} lift`}>
                  {content}
                </a>
              ) : (
                <div key={s.title} className={className}>
                  {content}
                </div>
              );
            })}
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
