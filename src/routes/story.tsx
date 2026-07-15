import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import storyCandid from "@/assets/story-candid.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";
import storyChinaYouth from "@/assets/story-china-youth.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "My Story — Alfred Collins" },
      { name: "description", content: "The full story: from a small home in Lagos to global stages, building systems that unlock opportunities for people." },
      { property: "og:title", content: "My Story — Alfred Collins" },
      { property: "og:description", content: "Building systems that unlock opportunities for people." },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">My Story</div>
        </Reveal>
        <div className="mt-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-[var(--ink)]/80 max-w-sm">
                I build systems that{" "}
                <span className="text-[var(--emerald)]">unlock opportunities</span>{" "}
                for people.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 text-[1.0625rem] md:text-lg text-foreground/85 leading-[1.8] font-sans space-y-6 max-w-[68ch]">
            <Reveal delay={0.05}>
              <p>
                If you only looked at my LinkedIn profile today, you might assume my
                journey has always been international: global conferences, startup
                ventures, executive meetings, and collaborations across continents.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                The truth is, it started in a small home in Lagos, Nigeria, where my
                mother taught me that opportunity isn't something you wait for. It's
                something you create for others.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <img
            src={storyCandid}
            alt="Candid photo of Alfred Collins"
            loading="lazy"
            className="mt-14 w-full rounded-2xl object-cover aspect-[16/9]"
          />
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4" />
          <div className="lg:col-span-8 text-[1.0625rem] md:text-lg text-foreground/85 leading-[1.8] font-sans space-y-6 max-w-[68ch]">
            <Reveal delay={0.1}>
              <p>
                Born into a low-income family and raised by a single mother as the
                first of four children, the odds were never particularly in my favour.
                But looking back, I realize I was incredibly fortunate in one
                important way: I grew up watching someone quietly transform lives every
                single day.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                During festive periods, my mother would prepare local meals and invite
                children from neighbouring families to celebrate with us. Our home was
                never the biggest, but somehow there was always room for one more
                person at the table. She also filled our house with books. Textbooks,
                novels, comics, biographies, storybooks. If there was something worth
                reading, she found a way to bring it into our home. Long before I
                understood what lifelong learning meant, I was already living in it.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>
                After more than two decades as a primary school teacher, she made one
                of the boldest decisions of her life. She moved our family to a new
                city for a fresh start and transformed the small living room of our
                home into the very first classroom of the school she dreamed of
                building.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Looking back, I realize she wasn't just building a school. She was
                shaping the way I would approach life.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="not-prose my-10 space-y-2 font-serif text-2xl md:text-3xl leading-tight">
                {[
                  "Kindness.",
                  "Curiosity.",
                  "Resilience.",
                  "High agency.",
                  "The belief that relationships matter.",
                  "The conviction that every person deserves the opportunity to reach their potential.",
                ].map((v) => (
                  <li key={v} className="flex items-baseline gap-3">
                    <span className="text-[var(--emerald)] font-mono text-xs translate-y-[-2px]">—</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <p>
                Every certification I've earned, every fellowship I've been selected
                for, every organization I've worked with, and every opportunity I've
                been trusted with has been built on those foundations.
              </p>
            </Reveal>

            <Reveal delay={0.21}>
              <img
                src={heroPortrait}
                alt="Alfred Collins"
                loading="lazy"
                className="my-10 rounded-2xl object-cover aspect-[4/5] w-full max-w-md mx-auto"
              />
            </Reveal>

            <Reveal delay={0.22}>
              <p>
                Over the past several years, I've had the privilege of working across
                startups, global organizations, and international communities. I've
                helped scale healthcare education across more than 60 countries at
                Osmosis, built developer ecosystems, launched partnerships across
                Africa, North America, and Europe, represented the Global Shapers
                Community at the World Economic Forum's Summer DAVOS Annual Meeting in
                China, and founded ventures exploring the future of AI, education, and
                creator economies.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p>Different organizations. Different industries. The same underlying mission.</p>
            </Reveal>

            <Reveal delay={0.25}>
              <img
                src={storyChinaYouth}
                alt="Alfred Collins with young people in China"
                loading="lazy"
                className="my-10 rounded-2xl object-cover aspect-[4/5] w-full max-w-md mx-auto"
              />
            </Reveal>

            <Reveal delay={0.26}>
              <blockquote className="my-10 border-l-2 border-[var(--emerald)] pl-6 font-serif text-3xl md:text-4xl leading-[1.15] tracking-tight text-[var(--ink)]">
                How do we build systems that unlock opportunities for more people?
              </blockquote>
            </Reveal>

            <Reveal delay={0.28}>
              <p>
                Sometimes the answer has been a product. Sometimes it has been a
                community. Sometimes it has been a partnership, a learning platform,
                or a new way of connecting people across continents.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                What excites me most is working at moments of transformation, when
                organizations are evolving, industries are changing, or technology
                creates entirely new possibilities. Those are the moments where
                thoughtful strategy, strong execution, and genuine collaboration can
                have an outsized impact.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <p>
                Today, my work sits at the intersection of product strategy,
                community, artificial intelligence, education, entrepreneurship, and
                global partnerships. I enjoy translating customer insights into
                products people genuinely use, building communities that become
                strategic assets, and helping organizations navigate change with
                clarity and purpose.
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <p>
                Whether I'm designing the future of artist-fan engagement, shaping an
                AI learning platform, translating customer insights into product
                decisions, or collaborating with teams across multiple countries, I'm
                still pursuing the same mission that began in my mother's living room:
              </p>
            </Reveal>

            <Reveal delay={0.36}>
              <blockquote className="my-10 border-l-2 border-[var(--emerald)] pl-6 font-serif text-3xl md:text-4xl leading-[1.15] tracking-tight text-[var(--ink)]">
                Build systems that unlock opportunities for people.
              </blockquote>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="my-8 rounded-2xl bg-[var(--surface)] border border-border p-7 space-y-3 text-[1.0625rem] leading-relaxed">
                <p>
                  Because I believe the greatest products{" "}
                  <span className="italic text-muted-foreground">don't simply solve problems.</span>{" "}
                  The strongest communities{" "}
                  <span className="italic text-muted-foreground">don't simply connect people.</span>{" "}
                  The best organizations{" "}
                  <span className="italic text-muted-foreground">don't simply grow revenue.</span>{" "}
                  They expand what's possible for the people they serve.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <p>
                And to me, that's the most meaningful measure of success: not the
                titles we hold or the products we launch, but the number of lives that
                are different because the systems we built made opportunity more
                accessible than it was before.
              </p>
            </Reveal>

            <div className="pt-6">
              <Link to="/" className="text-sm text-[var(--ink)] underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
                ← Back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
