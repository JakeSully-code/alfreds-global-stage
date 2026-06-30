import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/site/Reveal";
import { getRecruiterBrief, type RecruiterBrief } from "@/lib/recruiter.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/hiring-alfred")({
  head: () => ({
    meta: [
      { title: "Hiring Alfred — Private Brief" },
      { name: "description", content: "Private brief for recruiters and hiring managers." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: HiringAlfred,
});

function HiringAlfred() {
  const fetchBrief = useServerFn(getRecruiterBrief);
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["recruiter-brief"],
    queryFn: () => fetchBrief(),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Verifying access…
        </div>
      </div>
    );
  }

  if (error || !data) {
    const msg = String(error instanceof Error ? error.message : error ?? "");
    const forbidden = msg.includes("FORBIDDEN");
    return (
      <div className="min-h-[70vh] grid place-items-center container-x">
        <div className="max-w-md w-full rounded-2xl border border-border bg-background p-8 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--emerald)]">
            Private
          </div>
          <h1 className="mt-3 font-serif text-3xl">Access not granted</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {forbidden
              ? "You're signed in, but this email isn't on Alfred's recruiter allowlist. Reach out to hello@alfredcollins.com to request access."
              : "Something went wrong loading the brief. Try again in a moment."}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="rounded-full bg-[var(--ink)] text-white px-5 py-3 text-sm font-medium hover:opacity-90"
            >
              Sign out & try another email
            </button>
            <Link
              to="/"
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-[var(--ink)]"
            >
              ← Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Brief brief={data} />;
}

function Brief({ brief }: { brief: RecruiterBrief }) {
  return (
    <div>
      <header className="container-x pt-20 pb-10">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--emerald)]">
            For hiring teams · confidential · {brief.email}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
            Hiring <span className="italic">Alfred.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A sharp, one-page brief built for the moment between "interesting profile"
            and "let's talk."
          </p>
        </Reveal>
      </header>

      <Block title="Why hire Alfred">
        <ul className="grid md:grid-cols-2 gap-3">
          {brief.whyHire.map((p) => (
            <li key={p} className="rounded-xl border border-border bg-background p-5 text-sm">
              {p}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Top competencies" surface>
        <div className="flex flex-wrap gap-2">
          {brief.competencies.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-mono uppercase tracking-wider"
            >
              {c}
            </span>
          ))}
        </div>
      </Block>

      <Block title="Leadership philosophy">
        <blockquote className="border-l-2 border-[var(--emerald)] pl-6 font-serif text-2xl italic leading-snug max-w-3xl">
          "{brief.philosophy}"
        </blockquote>
      </Block>

      <Block title="Resume" surface>
        <div className="grid md:grid-cols-3 gap-4">
          {brief.resumes.map((r) => (
            <a
              key={r.label}
              href={r.href}
              className="rounded-xl border border-border bg-background p-5 lift block"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{r.label}</span>
                <span className="text-muted-foreground">↓</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {r.descriptor}
              </p>
            </a>
          ))}
        </div>
      </Block>

      <Block title="References">
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          {brief.references.map((n) => (
            <div key={n.name} className="rounded-xl border border-border bg-background p-5">
              <div className="font-medium">{n.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{n.note}</div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Case studies" surface>
        <div className="grid md:grid-cols-2 gap-4">
          {brief.cases.map((c) => (
            <Link
              key={c.slug}
              to="/case-studies/$slug"
              params={{ slug: c.slug }}
              className="rounded-xl border border-border bg-background p-5 lift flex items-center justify-between text-sm"
            >
              <span>{c.title}</span>
              <span className="text-muted-foreground">→</span>
            </Link>
          ))}
        </div>
      </Block>

      <Block title="Interview availability">
        <div className="rounded-2xl bg-[var(--ink)] text-white p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">
              Open windows
            </div>
            <div className="font-serif text-2xl mt-1">{brief.availability.window}</div>
          </div>
          <a
            href={brief.availability.bookingUrl}
            className="rounded-full bg-[var(--emerald)] text-white px-5 py-3 text-sm font-medium hover:opacity-90"
          >
            Book a slot →
          </a>
        </div>
      </Block>

      <div className="container-x pb-20">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/";
          }}
          className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-[var(--ink)]"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Block({
  title,
  children,
  surface,
}: {
  title: string;
  children: React.ReactNode;
  surface?: boolean;
}) {
  return (
    <section className={`py-14 ${surface ? "bg-[var(--surface)]" : ""}`}>
      <div className="container-x">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">{title}</h2>
        </Reveal>
        <Reveal delay={0.05}>{children}</Reveal>
      </div>
    </section>
  );
}
