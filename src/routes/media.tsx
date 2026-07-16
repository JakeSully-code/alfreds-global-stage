import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import podcast from "@/assets/podcast.jpg";
import cgtn from "@/assets/cgtn.jpg";
import linkedinEssay from "@/assets/linkedin-essay.jpg";
import favSuit from "@/assets/fav-suit.jpg";
import favSunset from "@/assets/fav-sunset.jpg";
import favTerrace from "@/assets/fav-terrace.jpg";
import chinaUmbrellas from "@/assets/china-umbrellas.jpg";
import greatwallFriends from "@/assets/greatwall-friends.jpg";
import genevaStatue from "@/assets/geneva-statue.jpg";
import qatarAirport from "@/assets/qatar-airport.jpg";
import storyGreatwall from "@/assets/story-greatwall.jpg";

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
  { kind: "Podcast", title: "Solana Pitch Clinic", img: podcast, imgPosition: "object-top" },
  {
    kind: "LinkedIn Essay",
    title: "Designing Hackathons for Global Collaboration",
    img: linkedinEssay,
    imgPosition: "object-center",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7333280313344700419/",
  },
  {
    kind: "Broadcast",
    title: "CGTN — \"Frontier Tech & Growth for Emerging Economies\"",
    img: cgtn,
    imgPosition: "object-center",
    href: "https://www.youtube.com/watch?v=_33jgAvXAZ4&t=637s",
  },
];

const PHOTOS = [
  { src: favSuit, alt: "Alfred Collins in a suit", imgPosition: "object-top" },
  { src: favSunset, alt: "Alfred Collins at sunset" },
  { src: favTerrace, alt: "Alfred Collins on a terrace" },
  { src: chinaUmbrellas, alt: "Alfred Collins in China with umbrellas" },
  { src: greatwallFriends, alt: "Alfred Collins with friends at the Great Wall of China" },
  { src: genevaStatue, alt: "Alfred Collins by a statue in Geneva" },
  { src: qatarAirport, alt: "Alfred Collins at the airport in Doha, Qatar" },
  { src: storyGreatwall, alt: "Alfred Collins at the Great Wall of China" },
];

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
          {MEDIA.map((m, i) => {
            const content = (
              <>
                <img
                  src={m.img}
                  alt={m.title}
                  loading="lazy"
                  className={`aspect-video w-full object-cover ${m.imgPosition}`}
                />
                <div className="p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{m.kind}</div>
                  <div className="font-serif text-lg mt-1">{m.title}</div>
                </div>
              </>
            );
            const className = "block rounded-xl bg-[var(--surface)] border border-border overflow-hidden lift";
            return (
              <Reveal key={m.kind + i} delay={i * 0.04}>
                {m.href ? (
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {content}
                  </a>
                ) : (
                  <div className={className}>{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PHOTOS.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.04}>
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className={`aspect-square rounded-xl border border-border object-cover w-full ${p.imgPosition ?? ""}`}
                />
              </Reveal>
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
