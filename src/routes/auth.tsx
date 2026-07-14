import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const SearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (search) => SearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Sign in — Alfred Collins" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // If they're already signed in, bounce to the destination.
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (!cancelled && data.user) {
        navigate({ to: redirect ?? "/hiring-alfred" });
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate({ to: redirect ?? "/hiring-alfred" });
      }
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate, redirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const redirectPath = redirect ?? "/hiring-alfred";
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}${redirectPath}`,
      },
    });
    if (err) {
      setStatus("error");
      setError(err.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="min-h-[85vh] grid place-items-center container-x bg-[var(--surface)]">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-sm">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--emerald)]">
          Private · Recruiters
        </div>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">
          Sign in to view <span className="italic">Hiring Alfred</span>.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Enter your work email. We'll send a one-tap magic link — no password needed.
        </p>

        {status === "sent" ? (
          <div className="mt-7 rounded-xl border border-[var(--emerald)]/30 bg-[var(--emerald)]/5 p-5">
            <div className="font-serif text-xl">Check your inbox.</div>
            <p className="mt-2 text-sm text-muted-foreground">
              We sent a magic link to <span className="font-medium text-foreground">{email}</span>.
              Open it on this device to continue.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setEmail("");
              }}
              className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-[var(--ink)]"
            >
              Use a different email →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-3">
            <label className="block">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Work email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="you@company.com"
                className="mt-2 w-full rounded-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-[var(--ink)]"
              />
            </label>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-[var(--emerald)] text-white px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send magic link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-center">
          Magic link · No password
        </p>
      </div>
    </div>
  );
}
