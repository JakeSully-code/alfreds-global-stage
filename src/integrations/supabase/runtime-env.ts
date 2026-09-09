// Reads runtime env in a way that works on Cloudflare Workers AND locally.
//
// On Cloudflare Workers the app runs with `nodejs_compat`, whose native
// `process.env` is NOT populated from the dashboard vars/secrets — those arrive
// only on the Worker's `env` binding. The nitro Cloudflare preset assigns that
// binding to `globalThis.__env__` at the start of every request (see nitro's
// cloudflare `_module-handler`), and its dev server sets the same global.
//
// Reading `globalThis.__env__` is equivalent to importing `env` from the
// `cloudflare:workers` module, but it resolves in every build stage — the
// virtual `cloudflare:workers` module only resolves in the final worker bundle,
// not the intermediate SSR build, so a static import of it breaks the build.
//
// We fall back to `process.env` so plain Node contexts (tooling, any non-Worker
// execution) keep working.
type EnvBag = Record<string, string | undefined>;

export function readServerEnv(key: string): string | undefined {
  const cfEnv = (globalThis as { __env__?: EnvBag }).__env__;
  return cfEnv?.[key] ?? process.env[key];
}
