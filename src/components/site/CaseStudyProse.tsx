import { Reveal } from "@/components/site/Reveal";

export function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--emerald)]">{index}</div>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{title}</h2>
      </Reveal>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-12 pl-6 border-l-2 border-border">
      <Reveal>
        <h3 className="font-serif text-2xl md:text-3xl">{title}</h3>
      </Reveal>
      <div className="mt-4 space-y-5">{children}</div>
    </div>
  );
}

export function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-lg text-foreground/85 leading-relaxed ${className}`}>{children}</p>;
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <span className="text-[var(--emerald)] font-medium">{children}</span>;
}

export function Emphasis({ children }: { children: React.ReactNode }) {
  return <p className="font-serif italic text-xl md:text-2xl text-[var(--ink)]">{children}</p>;
}

export function Quote({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <blockquote
      className={`border-l-2 border-[var(--emerald)] pl-6 font-serif italic leading-snug ${
        small ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
      }`}
    >
      {children}
    </blockquote>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3 text-lg text-foreground/85 leading-relaxed">
          <span className="text-[var(--emerald)] font-mono text-xs translate-y-[-2px]">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Numbered({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={item} className="flex items-baseline gap-3 text-lg text-foreground/85 leading-relaxed">
          <span className="text-[var(--emerald)] font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function ImpactItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 rounded-xl border border-border bg-[var(--surface)] p-5 text-base text-foreground/85 leading-relaxed">
      <span className="text-[var(--emerald)] font-mono text-xs translate-y-[3px]">—</span>
      <span>{children}</span>
    </li>
  );
}

export function Principle({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-[var(--emerald)] text-lg leading-none translate-y-[3px]" aria-hidden="true">★</span>
      <p className="text-lg text-foreground/85 leading-relaxed">
        <span className="font-serif text-xl text-[var(--ink)]">{lead}</span>{" "}
        <span>{children}</span>
      </p>
    </li>
  );
}
