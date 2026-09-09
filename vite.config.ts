// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// --- Cloudflare Worker runtime env -----------------------------------------
// nitro's cloudflare preset auto-enables `deployConfig`, which makes the
// generated wrangler config the source of truth for the deploy and DISCARDS
// env vars set in the Cloudflare dashboard. So any var the Worker needs at
// runtime must be present in the generated wrangler config.
//
// We read the values from the BUILD environment (Cloudflare Workers Builds
// injects your configured build vars/secrets into the build step) and inject
// them into `cloudflare.wrangler.vars`. Values are NEVER hardcoded here — if a
// key is absent from the build env (e.g. local builds), it is simply skipped.
//
// Set these as build variables/secrets in Cloudflare → your Worker → Settings →
// Build → Variables and secrets:
//   - SUPABASE_URL               (public project URL)
//   - SUPABASE_SERVICE_ROLE_KEY  (service-role key — see the deploy notes)
const RUNTIME_VAR_KEYS = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;

function workerVarsFromBuildEnv(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const key of RUNTIME_VAR_KEYS) {
    const value = process.env[key];
    if (value) vars[key] = value;
  }
  return vars;
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    cloudflare: {
      wrangler: {
        // Injected from the build environment (see above); empty locally.
        vars: workerVarsFromBuildEnv(),
        // Don't wipe vars/secrets already on the Worker that aren't in this
        // config — lets you keep SUPABASE_SERVICE_ROLE_KEY as an encrypted
        // Secret binding instead of a plaintext var if you prefer.
        keep_vars: true,
      },
    },
  },
});
