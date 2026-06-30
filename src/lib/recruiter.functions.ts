import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type RecruiterBrief = {
  email: string;
  whyHire: string[];
  competencies: string[];
  philosophy: string;
  resumes: { label: string; descriptor: string; href: string }[];
  references: { name: string; note: string }[];
  cases: { slug: string; title: string }[];
  availability: { window: string; bookingUrl: string };
};

const BRIEF: Omit<RecruiterBrief, "email"> = {
  whyHire: [
    "Operator who has shipped product, run programs, and scaled communities.",
    "Comfortable across customer, product, partnerships, and exec.",
    "Global — has built in 60+ countries.",
    "Translates strategy into systems people can actually run.",
  ],
  competencies: [
    "Product Strategy",
    "Community Architecture",
    "Partnerships",
    "Programs",
    "Go-to-Market",
    "Research",
    "Cross-functional Leadership",
    "Storytelling",
  ],
  philosophy:
    "Trust the team to do the work. Build the system that lets them. Hold the standard, not the steering wheel.",
  resumes: [
    {
      label: "Programs Management Resume",
      descriptor: "For roles in program & operations leadership across global teams.",
      href: "#",
    },
    {
      label: "Community Resume",
      descriptor: "For community, developer relations, and ecosystem-building roles.",
      href: "#",
    },
    {
      label: "Product Strategy Resume",
      descriptor: "For product management and product strategy roles.",
      href: "#",
    },
  ],
  references: [
    { name: "Shiv Gaglani", note: "Co-founder & CEO, Osmosis (Elsevier) — available on request." },
    { name: "Jorge Mendes", note: "Global Partnerships Leader — available on request." },
    { name: "Victoria Cumberbatch", note: "Community Strategy — available on request." },
  ],
  cases: [
    { slug: "osmosis", title: "Osmosis — Community as growth engine" },
    { slug: "roomz", title: "ROOMZ — 0→1 product build" },
    { slug: "ascent", title: "Ascent — AI education platform" },
    { slug: "bulb-africa", title: "Bulb Africa — Developer ecosystems" },
  ],
  availability: {
    window: "Tue–Thu · 9am–1pm GMT+1",
    bookingUrl: "https://calendly.com",
  },
};

export type UserBriefResult =
  | { state: "allowed"; brief: RecruiterBrief }
  | { state: "pending"; email: string }
  | { state: "needs_request"; email: string };

// Authenticated: returns either the brief or what state the user is in.
export const getBriefForUser = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<UserBriefResult> => {
    const email = String(context.claims.email ?? "").toLowerCase();
    if (!email) throw new Error("No email on session.");

    const { data: allow } = await context.supabase
      .from("allowed_recruiter_emails")
      .select("email")
      .eq("email", email)
      .maybeSingle();
    if (allow) {
      return { state: "allowed", brief: { email, ...BRIEF } };
    }

    // Use admin to check pending without exposing the table to clients.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: pending } = await supabaseAdmin
      .from("access_requests")
      .select("id")
      .eq("status", "pending")
      .ilike("email", email)
      .maybeSingle();
    if (pending) return { state: "pending", email };

    return { state: "needs_request", email };
  });

// Unauthenticated: brief via share-link token.
export const getBriefByToken = createServerFn({ method: "GET" })
  .inputValidator((data: { shareToken: string }) => {
    if (!data?.shareToken || typeof data.shareToken !== "string" || data.shareToken.length < 8) {
      throw new Error("Invalid token.");
    }
    return data;
  })
  .handler(async ({ data }): Promise<RecruiterBrief> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: link } = await supabaseAdmin
      .from("access_links")
      .select("token, active, expires_at")
      .eq("token", data.shareToken)
      .maybeSingle();
    if (!link || !link.active) throw new Error("Link not valid.");
    if (link.expires_at && new Date(link.expires_at).getTime() < Date.now()) {
      throw new Error("Link expired.");
    }
    return { email: "shared-link", ...BRIEF };
  });

function randomToken(bytes = 24): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Authenticated: submit an access request (after magic-link sign-in).
export const submitAccessRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { name: string; companyRole?: string; message?: string }) => {
    const name = String(data?.name ?? "").trim();
    if (!name || name.length > 120) throw new Error("Name is required.");
    return {
      name,
      companyRole: String(data?.companyRole ?? "").trim().slice(0, 200) || undefined,
      message: String(data?.message ?? "").trim().slice(0, 1000) || undefined,
    };
  })
  .handler(async ({ data, context }) => {
    const email = String(context.claims.email ?? "").toLowerCase();
    if (!email) throw new Error("No email on session.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Already allowlisted?
    const { data: allow } = await supabaseAdmin
      .from("allowed_recruiter_emails")
      .select("email")
      .eq("email", email)
      .maybeSingle();
    if (allow) return { state: "already_allowed" as const };

    // Existing pending?
    const { data: existing } = await supabaseAdmin
      .from("access_requests")
      .select("id")
      .eq("status", "pending")
      .ilike("email", email)
      .maybeSingle();
    if (existing) return { state: "already_pending" as const };

    const approve_token = randomToken();
    const reject_token = randomToken();
    const { error: insertErr } = await supabaseAdmin.from("access_requests").insert({
      email,
      name: data.name,
      company_role: data.companyRole ?? null,
      message: data.message ?? null,
      approve_token,
      reject_token,
    });
    if (insertErr) throw new Error(insertErr.message);

    // Send owner notification email.
    const { sendEmail, getOwnerEmail, getSiteOrigin } = await import("@/lib/email.server");
    const origin = getSiteOrigin();
    const approveUrl = `${origin}/api/public/access-decision?token=${approve_token}&action=approve`;
    const rejectUrl = `${origin}/api/public/access-decision?token=${reject_token}&action=reject`;
    try {
      await sendEmail({
        to: getOwnerEmail(),
        subject: `New recruiter access request — ${data.name}`,
        replyTo: email,
        html: ownerEmailHtml({
          name: data.name,
          email,
          companyRole: data.companyRole,
          message: data.message,
          approveUrl,
          rejectUrl,
        }),
      });
    } catch (e) {
      console.error("[recruiter] owner email failed", e);
    }
    return { state: "submitted" as const };
  });

function escapeHtml(s: string | undefined | null): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ownerEmailHtml(p: {
  name: string;
  email: string;
  companyRole?: string;
  message?: string;
  approveUrl: string;
  rejectUrl: string;
}): string {
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,sans-serif;background:#fafafa;padding:24px;color:#101418">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px">
    <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#16A34A">Recruiter access request</div>
    <h1 style="font-family:Georgia,serif;font-size:24px;margin:8px 0 16px">${escapeHtml(p.name)} wants access</h1>
    <table style="font-size:14px;line-height:1.6;color:#374151">
      <tr><td style="padding-right:12px;color:#6b7280">Email</td><td>${escapeHtml(p.email)}</td></tr>
      <tr><td style="padding-right:12px;color:#6b7280">Company / Role</td><td>${escapeHtml(p.companyRole) || "—"}</td></tr>
    </table>
    ${p.message ? `<div style="margin-top:16px;padding:14px;border-left:3px solid #16A34A;background:#f6fbf7;font-size:14px;color:#374151">${escapeHtml(p.message)}</div>` : ""}
    <div style="margin-top:24px;display:flex;gap:12px">
      <a href="${p.approveUrl}" style="background:#16A34A;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">Approve</a>
      <a href="${p.rejectUrl}" style="background:#101418;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">Reject</a>
    </div>
    <p style="margin-top:24px;font-size:12px;color:#9ca3af">These links are single-use and expire in 30 days. Anyone with the link can act, so don't forward this email.</p>
  </div></body></html>`;
}
