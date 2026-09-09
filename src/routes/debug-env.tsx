import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

// ---------------------------------------------------------------------------
// TEMPORARY DEBUG ROUTE — remove after diagnosing Cloudflare Worker env.
// Reports ONLY whether each key is present (truthy) via three access methods.
// It NEVER returns the actual values of any env var / secret.
// ---------------------------------------------------------------------------

const KEYS = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;

function presence(bag: Record<string, unknown> | undefined | null): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const k of KEYS) out[k] = Boolean(bag?.[k]);
  return out;
}

const checkEnv = createServerFn({ method: "GET" }).handler(async () => {
  // 1. Node-style process.env (native under nodejs_compat; often unpopulated).
  const processEnv = presence(
    typeof process !== "undefined" ? (process.env as Record<string, unknown>) : undefined,
  );

  // 2. Global that nitro's Cloudflare handler assigns from the Worker env
  //    binding at the start of every request.
  const globalEnv = presence((globalThis as { __env__?: Record<string, unknown> }).__env__);

  // 3. Via the h3 event context. getEvent is NOT re-exported by
  //    @tanstack/react-start/server, so import it from h3. Dynamic-import keeps
  //    h3 (server-only) out of the client bundle.
  let h3Env: Record<string, boolean> = presence(undefined);
  try {
    const { getEvent } = await import("h3");
    const event = getEvent() as { context?: { cloudflare?: { env?: Record<string, unknown> } } };
    h3Env = presence(event?.context?.cloudflare?.env);
  } catch {
    // getEvent unavailable in this context — leave h3Env as all-false.
  }

  return { processEnv, globalEnv, h3Env };
});

export const Route = createFileRoute("/debug-env")({
  loader: () => checkEnv(),
  component: DebugEnvPage,
});

function DebugEnvPage() {
  const data = Route.useLoaderData();
  return (
    <main style={{ padding: 24, fontFamily: "ui-monospace, monospace" }}>
      <h1 style={{ fontSize: 16, marginBottom: 12 }}>debug-env (booleans only — no secret values)</h1>
      <pre style={{ fontSize: 13, lineHeight: 1.5 }}>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
