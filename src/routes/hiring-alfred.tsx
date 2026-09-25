import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { getBriefByToken, requestBrief, type RecruiterBrief } from "@/lib/recruiter.functions";
import { sendBriefEmails } from "@/lib/emailjs";

const SearchSchema = z.object({ key: z.string().optional() });

export const Route = createFileRoute("/hiring-alfred")({
  ssr: false,
  validateSearch: (s) => SearchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Hiring Alfred — Private Brief" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: HiringAlfredPage,
});

function HiringAlfredPage() {
  const { key } = Route.useSearch();
  if (key) return <ShareLinkView shareToken={key} />;
  return <RequestForm />;
}

function ShareLinkView({ shareToken }: { shareToken: string }) {
  const fetchBrief = useServerFn(getBriefByToken);
  const { data, isLoading, error } = useQuery({
    queryKey: ["brief-by-token", shareToken],
    queryFn: () => fetchBrief({ data: { shareToken } }),
    retry: false,
  });
  if (isLoading) return <Loading label="Validating link…" />;
  if (error || !data) {
    return (
      <Centered>
        <Card>
          <Eyebrow>Private</Eyebrow>
          <H1>Link not valid</H1>
          <P>This share link is invalid, revoked, or expired. Ask Alfred for a new one.</P>
          <Link to="/" className="mt-6 inline-block text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-[var(--ink)]">← Back home</Link>
        </Card>
      </Centered>
    );
  }
  return <Brief brief={data} />;
}

function RequestForm() {
  const submit = useServerFn(requestBrief);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyRole, setCompanyRole] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await submit({ data: { name, email, companyRole } });
      await sendBriefEmails({ name, email, companyRole, briefUrl: result.briefUrl });
      return result;
    },
  });

  if (mutation.isSuccess) {
    return (
      <Centered>
        <Card>
          <Eyebrow>Sent</Eyebrow>
          <H1>Check your inbox.</H1>
          <P>
            The private brief is on its way to <span className="text-foreground font-medium">{email}</span>.
          </P>
        </Card>
      </Centered>
    );
  }

  return (
    <Centered>
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-sm">
        <Eyebrow>Private · Recruiters</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">Request the brief</h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Tell me who you are and I'll send the private brief straight to your inbox.
        </p>
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim() && email.trim()) mutation.mutate();
          }}
        >
          <Field label="Full name">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-[var(--ink)]"
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-[var(--ink)]"
            />
          </Field>
          <Field label="Company">
            <input
              value={companyRole}
              onChange={(e) => setCompanyRole(e.target.value)}
              placeholder="e.g. Stripe — Recruiting"
              className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-[var(--ink)]"
            />
          </Field>
          {mutation.error && <p className="text-xs text-destructive">{(mutation.error as Error).message}</p>}
          <button
            type="submit"
            disabled={mutation.isPending || !name.trim() || !email.trim()}
            className="w-full rounded-full bg-[var(--emerald)] text-white px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-60"
          >
            {mutation.isPending ? "Sending…" : "Send me the brief"}
          </button>
        </form>
      </div>
    </Centered>
  );
}

function Brief({ brief }: { brief: RecruiterBrief }) {
  return (
    <div>
      <header className="container-x pt-20 pb-10">
        <Reveal><div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--emerald)]">For hiring teams · confidential</div></Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
            Hiring <span className="italic">Alfred.</span>
          </h1>
        </Reveal>
      </header>

      <Block title="Why hire Alfred">
        <ul className="grid md:grid-cols-2 gap-3">
          {brief.whyHire.map((p) => <li key={p} className="rounded-xl border border-border bg-background p-5 text-sm">{p}</li>)}
        </ul>
      </Block>

      <Block title="Top competencies" surface>
        <div className="flex flex-wrap gap-2">
          {brief.competencies.map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-mono uppercase tracking-wider">{c}</span>
          ))}
        </div>
      </Block>

      <Block title="Resume" surface>
        <div className="grid md:grid-cols-3 gap-4">
          {brief.resumes.map((r) => (
            <a key={r.label} href={r.href} download={r.filename} className="rounded-xl border border-border bg-background p-5 lift block">
              <div className="flex items-center justify-between"><span className="text-sm font-medium">{r.label}</span><span className="text-muted-foreground">↓</span></div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{r.descriptor}</p>
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
          {brief.cases.map((c) =>
            c.line ? (
              <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="rounded-xl border border-border bg-background p-5 lift block">
                <div className="flex items-center justify-between text-sm"><span>{c.title}</span><span className="text-muted-foreground">→</span></div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{c.line}</p>
              </Link>
            ) : (
              <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="rounded-xl border border-border bg-background p-5 lift flex items-center justify-between text-sm">
                <span>{c.title}</span><span className="text-muted-foreground">→</span>
              </Link>
            ),
          )}
        </div>
      </Block>

      <Block title="Interview availability">
        <div className="rounded-2xl bg-[var(--panel)] text-white p-7 flex items-center justify-center">
          <a href={brief.availability.bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--emerald)] text-white px-6 py-3 text-sm font-medium hover:opacity-90">Book A Slot on my Calendar</a>
        </div>
      </Block>
    </div>
  );
}

function Block({ title, children, surface }: { title: string; children: React.ReactNode; surface?: boolean }) {
  return (
    <section className={`py-14 ${surface ? "bg-[var(--surface)]" : ""}`}>
      <div className="container-x">
        <Reveal><h2 className="font-serif text-3xl md:text-4xl mb-6">{title}</h2></Reveal>
        <Reveal delay={0.05}>{children}</Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Loading({ label }: { label: string }) {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}
function Centered({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[70vh] grid place-items-center container-x">{children}</div>;
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="max-w-md w-full rounded-2xl border border-border bg-background p-8 text-center">{children}</div>;
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--emerald)]">{children}</div>;
}
function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="mt-3 font-serif text-3xl">{children}</h1>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{children}</p>;
}
