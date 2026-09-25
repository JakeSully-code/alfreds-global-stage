import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Section, P, Emphasis, Quote, Bullets } from "@/components/site/CaseStudyProse";

export const Route = createFileRoute("/case-studies/roomz")({
  head: () => ({
    meta: [
      { title: "ROOMZ — Case Study · Alfred Collins" },
      { name: "description", content: "Led Product Adoption & Market Penetration for a Creator Economy Platform." },
      { property: "og:title", content: "ROOMZ — Case Study" },
      { property: "og:description", content: "Led Product Adoption & Market Penetration for a Creator Economy Platform." },
    ],
  }),
  component: RoomzCaseStudy,
});

const THEMES = ["Product Strategy", "Business Development", "Go-to-Market", "Partnerships", "Community-Led Growth"];

const METRICS = [
  { value: "2,000+", label: "Early Users" },
  { value: "3", label: "Artists Onboarded" },
  { value: "$4K", label: "Solana Grant" },
  { value: "0→1", label: "Product Stage" },
];

function RoomzCaseStudy() {
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
            ROOMZ
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground italic font-serif max-w-3xl">
            Led Product Adoption & Market Penetration for a Creator Economy Platform.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </header>

      <section className="bg-[var(--panel)] text-[var(--panel-foreground)] border-y border-border">
        <div className="container-x py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {METRICS.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-3xl md:text-4xl text-[var(--emerald)]">{m.value}</div>
              <div className="text-sm text-muted-foreground mt-2">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="container-x py-20 max-w-3xl">
        <Section index="01" title="Premise">
          <P>
            The creator economy has dramatically changed how artists distribute music, grow audiences,
            and build careers. Streaming platforms, social media, and short-form content have made
            creators more accessible than at any other point in history. Yet despite this abundance of
            digital touchpoints, one challenge continues to persist: meaningful relationships between
            artists and their communities remain surprisingly difficult to build.
          </P>
          <P>
            For artists, audience engagement is increasingly measured through metrics such as streams,
            likes, views, and followers. These indicators demonstrate visibility but rarely reflect the
            depth of a creator's relationship with the people supporting their work. Valuable audience
            feedback exists across Spotify, YouTube, TikTok, Instagram, X, and countless other
            platforms, but it is fragmented and difficult to translate into meaningful action.
          </P>
          <Emphasis>Fans face an equally significant problem.</Emphasis>
          <P>
            They may spend years supporting an artist by streaming music, attending events, purchasing
            merchandise, or promoting songs online, yet meaningful interaction with that artist is
            often limited to comments, likes, or expensive VIP packages available to only a small
            percentage of supporters.
          </P>
          <Emphasis>This disconnect presented an opportunity.</Emphasis>
          <P>
            Rather than building another social platform competing for attention, ROOMZ was positioned
            to become an engagement layer sitting between artists and fans, creating opportunities for
            genuine interaction while simultaneously introducing new monetization pathways for
            creators.
          </P>
          <P>
            My responsibility as Product Strategy & Business Development Lead was to help answer
            several critical questions.
          </P>
          <Bullets
            items={[
              "Could this value proposition resonate with both artists and fans?",
              "Could meaningful artist-fan engagement become a repeatable business model?",
              "And perhaps most importantly, how could we validate these assumptions quickly without overbuilding the product?",
            ]}
          />
          <P>
            The challenge therefore extended beyond product development. It became an exercise in
            market validation, customer discovery, business model design, partnership development, and
            strategic execution.
          </P>
        </Section>

        <Section index="02" title="Approach">
          <P>Our strategy centred around one guiding principle:</P>
          <Quote small>Validate before scaling.</Quote>
          <P>
            Instead of attempting to build a comprehensive creator ecosystem from day one, we
            intentionally narrowed our focus to validating one core hypothesis:
          </P>
          <Quote>Would fans pay for meaningful access to artists?</Quote>
          <P>
            Everything else became secondary. This philosophy influenced product prioritization,
            marketing, partnerships, and roadmap decisions throughout the project.
          </P>
          <P>
            Rather than relying on traditional advertising for user acquisition, we designed the
            MicDrop Challenge, a community-driven campaign that simultaneously functioned as a
            marketing initiative, artist discovery programme, and product validation experiment.
          </P>
          <P>
            The campaign attracted more than two thousand early users while identifying three artists
            who would become the first creators to launch on the platform. Importantly, the campaign
            demonstrated that user acquisition could be driven through community participation rather
            than paid advertising alone.
          </P>
          <P>
            With an initial user base established, the focus shifted from acquisition to validation of
            commercial demand.
          </P>
          <P>
            To achieve this, we introduced ROOMZ Moments, a product experience enabling artists to host
            exclusive one-on-one digital interactions with fans through raffle-based participation.
            Each artist received dedicated onboarding, promotional assets, landing pages, referral
            links, and coordinated marketing support. Fans entered raffles through the platform, with
            selected winners participating in live conversations hosted directly within ROOMZ.
          </P>
          <P>This represented a critical transition for the product. The primary question changed from:</P>
          <Quote small>Can we attract users?</Quote>
          <p className="text-center text-sm font-mono uppercase tracking-widest text-muted-foreground">to</p>
          <Quote small>Will users pay for meaningful experiences?</Quote>
          <P>
            Successfully validating monetization provided substantially stronger evidence of
            product-market fit than user growth alone. Equally important was the continuous feedback
            process established around every activation.
          </P>
          <P>
            Structured surveys were introduced for both artists and fans immediately following each
            ROOMZ Moment, allowing insights gathered from real experiences to influence future product
            improvements.
          </P>
          <P>Beyond the product itself, partnership development became a central component of the strategy.</P>
          <P>
            Relationships were cultivated across independent artists, ecosystem organisations,
            accelerators, grant programmes, and strategic collaborators. These efforts contributed to
            securing ecosystem recognition, including a $4,000 grant funding from the Solana blockchain
            ecosystem supporting future exploration of AI-powered creator tooling.
          </P>
          <P>
            Throughout this period, product discipline remained essential. Numerous opportunities
            emerged to expand the platform into adjacent areas including creator analytics,
            AI-powered insights, community tools, and enhanced marketplace functionality.
          </P>
          <P>However, every potential addition was evaluated against a single question:</P>
          <Quote small>Does this help validate our core value proposition, or does it distract from it?</Quote>
          <P>
            Maintaining that focus ensured development resources remained concentrated on achieving
            product-market fit before broadening the platform's capabilities.
          </P>
        </Section>

        <Section index="03" title="Impact">
          <P>
            The work undertaken across product strategy, business development, and market execution
            produced measurable progress across multiple dimensions. The platform successfully
            acquired more than 2,000 early users through community-led growth initiatives.
          </P>
          <P>
            The MicDrop Challenge established an effective acquisition framework while simultaneously
            onboarding artists and generating meaningful social engagement. Three consecutive ROOMZ
            Moments successfully demonstrated the viability of exclusive artist-fan experiences as a
            monetizable product offering.
          </P>
          <P>
            These activations validated not only customer willingness to participate but also artists'
            willingness to integrate the platform into their engagement strategy. Perhaps more
            importantly, these experiences transformed ROOMZ from a theoretical concept into a product
            supported by genuine customer behaviour.
          </P>
          <P>
            Alongside product validation, a repeatable operational framework was developed covering
            artist onboarding, promotional planning, user communication, experience facilitation,
            post-event content creation, and customer feedback collection.
          </P>
          <P>
            Rather than treating each activation as an isolated campaign, the business established a
            scalable playbook capable of supporting future growth. Strategic partnership development
            further strengthened the platform's position.
          </P>
          <P>
            Looking beyond digital acquisition, planning commenced for ROOMZ LIVE TOUR, an offline
            growth model designed to convert large-scale physical gatherings into structured user
            acquisition channels through immersive artist-fan experiences.
          </P>
          <Emphasis>Taken together, these initiatives extended beyond launching a product.</Emphasis>
          <P>
            They demonstrated how disciplined experimentation, customer-centred strategy, and iterative
            validation could transform an early-stage concept into a platform with measurable traction,
            commercial validation, and a clear roadmap for future scale.
          </P>
        </Section>

        <Section index="04" title="Reflection">
          <P>
            Working on ROOMZ fundamentally reshaped my perspective on product strategy. The experience
            reinforced that successful products are rarely built by pursuing more features. Instead,
            they emerge through disciplined prioritization, thoughtful experimentation, and continuous
            learning from real users.
          </P>
          <P>
            By documenting acquisition strategies, operational processes, partnership frameworks,
            feedback loops, and market experiments alongside product development, ROOMZ evolved beyond
            a collection of features into an organisation capable of learning and improving with every
            iteration.
          </P>
          <P>It also reinforced another belief that continues to influence how I approach product work today.</P>
          <Quote>
            Technology alone rarely creates lasting value. Technology becomes meaningful when it
            enables stronger human relationships.
          </Quote>
          <P>Every strategic decision throughout the project ultimately returned to one simple question:</P>
          <Quote small>Does this help artists build deeper relationships with the people who believe in their work?</Quote>
          <P>
            Maintaining that clarity allowed product decisions, business priorities, and growth
            initiatives to remain aligned despite the many opportunities to pursue adjacent ideas.
          </P>
          <P>
            Looking back, I see this project not simply as the development of a creator platform, but
            as a comprehensive exercise in product strategy, from identifying a market opportunity and
            validating customer demand to designing growth systems, establishing commercial traction,
            and creating the foundations for long-term scale.
          </P>
          <P>
            It remains one of the most formative experiences of my career and continues to shape how I
            think about building products that people genuinely value.
          </P>
        </Section>

        <div className="border-t border-border pt-10">
          <Link to="/" className="text-sm underline underline-offset-4 decoration-[var(--emerald)] hover:text-[var(--emerald)]">
            ← Back to all work
          </Link>
        </div>
      </div>
    </article>
  );
}
