import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media — Alfred Collins" },
      { name: "description", content: "Talks, panels, podcasts, articles, and writing on community, product, AI, and education." },
      { property: "og:title", content: "Media — Alfred Collins" },
      { property: "og:description", content: "Talks, panels, podcasts, articles, and writing." },
    ],
  }),
  component: MediaPage,
});

const MEDIA = [
  { kind: "Conference Talk", title: "Placeholder title" },
  { kind: "Panel", title: "Placeholder title" },
  { kind: "Podcast", title: "Placeholder title" },
  { kind: "Article", title: "Placeholder title" },
  { kind: "LinkedIn Essay", title: "Placeholder title" },
  { kind: "Video", title: "Placeholder title" },
];

const PHOTOS = Array.from({ length: 6 }, (_, i) => i);

function MediaPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Media</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl tracking-tight text-balance max-w-3xl">
            Talks, panels, podcasts, writing.
          </h1>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MEDIA.map((m, i) => (
            <Reveal key={m.kind + i} delay={i * 0.04}>
              <div className="aspect-[4/3] rounded-xl bg-[var(--surface)] border border-border flex flex-col justify-end p-5 lift">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m.kind}</div>
                <div className="font-serif text-lg mt-1">{m.title}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PHOTOS.map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-[var(--surface)] border border-border" />
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
