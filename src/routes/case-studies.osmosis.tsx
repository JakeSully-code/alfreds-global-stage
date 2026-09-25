import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Section, SubSection, P, Strong, Emphasis, Quote, Bullets, Numbered, ImpactItem, Principle } from "@/components/site/CaseStudyProse";

export const Route = createFileRoute("/case-studies/osmosis")({
  head: () => ({
    meta: [
      { title: "Osmosis from Elsevier — Case Study · Alfred Collins" },
      { name: "description", content: "How Community Became A Growth Engine and Proved ROI." },
      { property: "og:title", content: "Osmosis from Elsevier — Case Study" },
      { property: "og:description", content: "How Community Became A Growth Engine and Proved ROI." },
    ],
  }),
  component: OsmosisCaseStudy,
});

const THEMES = ["Customer Discovery", "Product Insights", "Partnerships", "Referral Growth", "Adoption", "Cross-functional Leadership"];

const METRICS = [
  { value: "50K+", label: "Referrals" },
  { value: "60+", label: "Countries" },
  { value: "2,000+", label: "Ambassadors" },
  { value: "$62K+", label: "Partnerships" },
];

function OsmosisCaseStudy() {
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
            Osmosis from Elsevier
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-xl md:text-2xl text-muted-foreground italic font-serif max-w-3xl">
            How Community Became A Growth Engine and Proved ROI.
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

      <section className="bg-[var(--panel)] text-white">
        <div className="container-x py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {METRICS.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-3xl md:text-4xl text-[var(--emerald)]">{m.value}</div>
              <div className="text-sm text-white/60 mt-2">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="container-x py-20 max-w-3xl">
        <Section index="01" title="Premise">
          <P>Communities have traditionally been evaluated through engagement metrics.</P>
          <Bullets items={["How many people joined?", "How many comments were posted?", "How many events were attended?"]} />
          <P>
            While these metrics provide useful indicators of activity, they rarely answer the question
            that executive teams care about most:
          </P>
          <Quote>How does community create measurable business value?</Quote>
          <P>This question became the foundation of my work at Osmosis from Elsevier.</P>
          <P>
            When I joined the team, the OHLI (Osmosis Health Leaders Initiative) was already an
            established global ambassador program connecting healthcare student leaders from more
            than fifty countries. My responsibility was never simply to facilitate conversations or
            moderate an online community.
          </P>
          <P>
            Instead, I became increasingly interested in understanding how community could function as
            an operational system capable of influencing recruitment, product development, customer
            success, institutional partnerships, and long-term organizational growth.
          </P>
          <P>
            Rather than treating community as an isolated function, I approached it as infrastructure.
          </P>
          <P>
            Infrastructure capable of connecting students, product teams, customer experience, sales,
            and leadership through continuous feedback, collaboration, and shared value creation. That
            perspective fundamentally changed the way I think about community.
          </P>
        </Section>

        <Section index="02" title="Strategic Approach">
          <P>Throughout my time at Osmosis, I adopted a systems-oriented approach to community operations.</P>
          <P>
            Rather than optimizing individual activities in isolation, I focused on designing
            interconnected systems that strengthened learner engagement while simultaneously
            generating measurable value for the wider organization.
          </P>

          <SubSection title="Community as Business Infrastructure">
            <P>
              One of the earliest observations I made was that community should never exist purely to
              increase engagement. When intentionally designed, communities become strategic assets.
            </P>
            <Bullets
              items={[
                "They accelerate customer education.",
                "Generate product feedback.",
                "Improve retention.",
                "Strengthen advocacy.",
                "Support institutional partnerships.",
                "Create referral pipelines.",
                "Surface emerging customer needs.",
              ]}
            />
            <P>
              This philosophy influenced every initiative I designed. Every event, challenge, survey,
              and engagement campaign was evaluated not only by participation rates, but by the
              organizational outcomes it produced.
            </P>
            <Emphasis>Community became a business capability rather than simply a communication channel.</Emphasis>
          </SubSection>

          <SubSection title="Operational Excellence Through Systems Design">
            <P>
              As the program continued to grow, operational complexity increased significantly.
              Managing hundreds of student leaders distributed across more than sixty countries
              required far more than enthusiasm. It required systems.
            </P>
            <P>
              I designed and continuously refined operational workflows that improved visibility across
              recruitment, referrals, compensation, event tracking, student progression, and regional
              leadership.
            </P>
            <P>
              Leveraging tools such as Airtable, Heartbeat, survey analytics, AI assistants (Claude,
              ChatGPT) and structured reporting frameworks, I developed processes that reduced
              operational friction while improving consistency across the program.
            </P>
            <P>
              Rather than allowing operations to become reactive, the objective was to create systems
              capable of scaling alongside the community.
            </P>
          </SubSection>

          <SubSection title="Transforming Community Data into Strategic Intelligence">
            <P>
              One of the areas I found most rewarding involved translating community insights into
              executive decision-making. Every month, hundreds of students shared qualitative and
              quantitative feedback through program surveys.
            </P>
            <P>
              Rather than presenting raw data, I developed structured analytical frameworks that
              identified trends, behavioural patterns, emerging risks, and strategic opportunities.
            </P>
            <P>
              These findings were synthesized into executive presentation decks delivered during
              monthly leadership meetings. The objective extended beyond reporting, it was about
              enabling better decisions. Whether evaluating referral performance, product adoption,
              learner satisfaction, or new program initiatives, community intelligence became an
              important input for strategic planning across multiple teams.
            </P>
            <P>
              Over time, I increasingly viewed these feedback loops not as reporting exercises, but as
              continuous organizational listening systems.
            </P>
          </SubSection>

          <SubSection title="Cross-Functional Collaboration">
            <P>
              One of the aspects I appreciated most about working within Osmosis was the opportunity to
              collaborate across multiple functions. Community rarely operates independently, its
              greatest impact occurs when aligned with the broader organization.
            </P>
            <P>
              Throughout my work, I partnered closely with Product, Engineering, Customer Experience,
              Sales, and leadership teams to ensure community insights informed broader organizational
              priorities.
            </P>
            <P>
              These collaborations contributed to initiatives including product feedback for Osmosis
              AI, support for Osmosis Spanish, institutional partnership opportunities, customer
              education efforts, and program improvements driven directly by learner feedback.
            </P>
            <P>
              Rather than acting as an intermediary between students and internal teams, I focused on
              creating feedback systems capable of continuously strengthening both the product and the
              community.
            </P>
          </SubSection>

          <SubSection title="Designing Leadership Pipelines">
            <P>
              Communities become sustainable when they create leaders rather than simply participants.
              This belief shaped many of the initiatives I introduced throughout the OHLI program.
            </P>
            <P>
              Regional Lead development, leadership mentoring, the RL Shadow initiative, professional
              development programming, and the annual Hackathon were all designed around a common
              objective:
            </P>
            <Quote small>Empower members to gradually assume greater ownership within the ecosystem.</Quote>
            <P>
              Rather than relying exclusively on staff-driven engagement, these initiatives distributed
              leadership throughout the community while creating opportunities for mentorship,
              collaboration, and long-term succession planning.
            </P>
            <Emphasis>Leadership development became another form of community design.</Emphasis>
          </SubSection>

          <SubSection title="Continuous Experimentation">
            <P>Every semester presented new opportunities to test ideas.</P>
            <Numbered
              items={[
                "Referral challenges.",
                "Country Spotlight initiatives.",
                "Professional Journey campaigns.",
                "Community competitions.",
                "Recognition systems.",
                "The Give-A-Little Challenge.",
                "Expanded in-person recruitment initiatives across key North American markets.",
                "Each initiative represented an experiment designed to better understand learner behaviour while improving community outcomes.",
              ]}
            />
            <P>
              Some generated immediate success. Others provided valuable learning opportunities.
              Collectively, they reinforced one important principle:
            </P>
            <Emphasis>Strong communities evolve through continuous experimentation rather than static programming.</Emphasis>
          </SubSection>
        </Section>

        <Section index="03" title="Outcomes & Impact">
          <P>
            Approaching community through the lens of systems design produced measurable outcomes
            across multiple dimensions. Highlights from my time with the OHLI program include:
          </P>
          <ul className="mt-6 space-y-4">
            <ImpactItem>Expanded the global student leadership community to include representation from over 60 countries.</ImpactItem>
            <ImpactItem>
              Helped drive more than <Strong>50,000 community-generated referrals</Strong>, demonstrating measurable
              business value through ambassador-led growth initiatives.
            </ImpactItem>
            <ImpactItem>
              Supported community-driven institutional opportunities with the Sales team across South
              Africa, Rwanda, and Poland, contributing to business opportunities valued at more than{" "}
              <Strong>$60,000</Strong>.
            </ImpactItem>
            <ImpactItem>Achieved the highest recorded course completion rate within the program (94%) following the migration to Heartbeat and redesigned engagement systems.</ImpactItem>
            <ImpactItem>Designed executive reporting frameworks that transformed monthly survey responses into strategic insights for Customer Experience leadership.</ImpactItem>
            <ImpactItem>Led the design and delivery of the program's annual Hackathon, creating new opportunities for innovation, collaboration, and student leadership development.</ImpactItem>
            <ImpactItem>Strengthened collaboration between Community, Product, Engineering, Customer Experience, and Sales by positioning learner feedback as a strategic organizational asset.</ImpactItem>
          </ul>
          <P className="mt-8">
            Beyond individual metrics, the experience demonstrated that thoughtfully designed
            communities can simultaneously improve learner experience, operational efficiency, product
            development, and business growth.
          </P>
        </Section>

        <Section index="04" title="Reflections">
          <P>
            Working at Osmosis fundamentally reshaped how I think about communities. Today, I no
            longer believe community exists primarily to generate engagement. Engagement is an outcome.
          </P>
          <P>
            When communities are intentionally designed, they become living systems that continuously
            generate insight, advocacy, innovation, and growth. This perspective now influences every
            product, program, and operational strategy I contribute to.
          </P>
          <P>
            Whether designing learning platforms, developer ecosystems, ambassador programs, or
            customer communities, I begin with the same question:
          </P>
          <Quote>How can this system create value for every participant while strengthening the organization as a whole?</Quote>
        </Section>

        <Section index="05" title="What This Project Reinforced">
          <P>
            Throughout my work at Osmosis, several principles became foundational to how I approach
            community strategy and organizational design.
          </P>
          <ul className="mt-8 space-y-6">
            <Principle lead="Communities are business systems.">
              Their greatest value lies not in conversation alone, but in their ability to generate
              measurable outcomes across product, customer success, recruitment, and growth.
            </Principle>
            <Principle lead="Operational excellence enables scale.">
              Sustainable communities require intentional workflows, reliable systems, and clear
              operational visibility.
            </Principle>
            <Principle lead="Data should drive community strategy.">
              Every interaction represents an opportunity to better understand users, improve
              experiences, and inform organizational decisions.
            </Principle>
            <Principle lead="Leadership should be distributed.">
              Communities become stronger when members are empowered to lead, mentor, and contribute
              meaningfully to the ecosystem.
            </Principle>
            <Principle lead="Experimentation fuels innovation.">
              The strongest communities continuously test, learn, and iterate rather than relying on
              static engagement models.
            </Principle>
          </ul>
          <P className="mt-8">
            Ultimately, my experience at Osmosis reinforced a belief that continues to guide my work
            today:
          </P>
          <Quote>
            The most impactful communities are not those with the highest engagement, they are those
            that become indispensable to the people they serve and the organizations they support.
          </Quote>
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
