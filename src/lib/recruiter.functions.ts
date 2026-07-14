import { createServerFn } from "@tanstack/react-start";

export type RecruiterBrief = {
  email: string;
  name?: string;
  whyHire: string[];
  competencies: string[];
  philosophy: string;
  resumes: { label: string; descriptor: string; href: string }[];
  references: { name: string; note: string }[];
  cases: { slug: string; title: string }[];
  availability: { window: string; bookingUrl: string };
};

const BRIEF: Omit<RecruiterBrief, "email" | "name"> = {
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
    bookingUrl: "https://calendly.com/alfredcollinsc/consultingwithalfred",
  },
};

// Unauthenticated: brief via emailed share-link token.
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
      .select("token, active, expires_at, name, email")
      .eq("token", data.shareToken)
      .maybeSingle();
    if (!link || !link.active) throw new Error("Link not valid.");
    if (link.expires_at && new Date(link.expires_at).getTime() < Date.now()) {
      throw new Error("Link expired.");
    }
    return { email: link.email ?? "shared-link", name: link.name ?? undefined, ...BRIEF };
  });

function randomToken(bytes = 24): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Public: recruiter requests the brief. Creates a share-link token and emails it
// straight to the requester, plus a heads-up to the owner. No login required.
export const requestBrief = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string; companyRole?: string }) => {
    const name = String(data?.name ?? "").trim();
    const email = String(data?.email ?? "").trim().toLowerCase();
    if (!name || name.length > 120) throw new Error("Name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      throw new Error("A valid email is required.");
    }
    return {
      name,
      email,
      companyRole: String(data?.companyRole ?? "").trim().slice(0, 200) || undefined,
    };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const token = randomToken();
    const { error: insertErr } = await supabaseAdmin.from("access_links").insert({
      token,
      label: data.name,
      name: data.name,
      email: data.email,
      company_role: data.companyRole ?? null,
      active: true,
    });
    if (insertErr) throw new Error(insertErr.message);

    const { sendEmail, getOwnerEmail, getSiteOrigin } = await import("@/lib/email.server");
    const briefUrl = `${getSiteOrigin()}/hiring-alfred?key=${token}`;

    try {
      await sendEmail({
        to: data.email,
        subject: "Your private brief — Alfred Collins",
        html: requesterEmailHtml({ name: data.name, briefUrl }),
      });
    } catch (e) {
      console.error("[recruiter] requester email failed", e);
      throw new Error("Couldn't send the email — please try again in a moment.");
    }

    try {
      await sendEmail({
        to: getOwnerEmail(),
        subject: `New brief request — ${data.name}`,
        replyTo: data.email,
        html: ownerNotificationHtml({ name: data.name, email: data.email, companyRole: data.companyRole }),
      });
    } catch (e) {
      console.error("[recruiter] owner notification failed", e);
    }

    return { state: "sent" as const };
  });

function escapeHtml(s: string | undefined | null): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function requesterEmailHtml(p: { name: string; briefUrl: string }): string {
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,sans-serif;padding:24px;color:#101418">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px">
    <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#16A34A">Hiring Alfred</div>
    <h1 style="font-family:Georgia,serif;font-size:26px;margin:10px 0">Great to connect, ${escapeHtml(p.name)}.</h1>
    <p style="color:#4b5563;line-height:1.6">Thanks for reaching out — I'm excited about the opportunity to work together and look forward to connecting. Here's the private brief with everything a hiring team typically needs: why hire me, top competencies, resumes, references, and my availability.</p>
    <p style="margin-top:20px"><a href="${p.briefUrl}" style="background:#16A34A;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">Open the brief →</a></p>
    <p style="margin-top:24px;font-size:12px;color:#9ca3af">This link is just for you — no login needed.</p>
  </div></body></html>`;
}

function ownerNotificationHtml(p: { name: string; email: string; companyRole?: string }): string {
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,sans-serif;background:#fafafa;padding:24px;color:#101418">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px">
    <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#16A34A">New brief request</div>
    <h1 style="font-family:Georgia,serif;font-size:24px;margin:8px 0 16px">${escapeHtml(p.name)} just requested your brief</h1>
    <table style="font-size:14px;line-height:1.6;color:#374151">
      <tr><td style="padding-right:12px;color:#6b7280">Email</td><td>${escapeHtml(p.email)}</td></tr>
      <tr><td style="padding-right:12px;color:#6b7280">Company / Role</td><td>${escapeHtml(p.companyRole) || "—"}</td></tr>
    </table>
    <p style="margin-top:20px;font-size:12px;color:#9ca3af">The brief link was already sent to them automatically — no action needed from you.</p>
  </div></body></html>`;
}
