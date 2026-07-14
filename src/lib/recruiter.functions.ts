import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export type RecruiterBrief = {
  email: string;
  name?: string;
  whyHire: string[];
  competencies: string[];
  resumes: { label: string; descriptor: string; href: string }[];
  references: { name: string; note: string }[];
  cases: { slug: string; title: string; line?: string }[];
  availability: { bookingUrl: string };
};

const BRIEF: Omit<RecruiterBrief, "email" | "name"> = {
  whyHire: [
    "Operator who has shipped product, run programs, and scaled communities.",
    "Comfortable across customer, product, partnerships, and exec.",
    "Global — has built programs & communities with reach across 60+ countries.",
    "Translates strategy into systems people can actually run.",
    "Experienced supporting institutional partnerships, deals supported with institutions in South Africa, Rwanda, and Poland. Total ROI = $62K.",
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
    "AI-enabled workflows",
    "Interpersonal Relationships",
    "Stakeholder Management",
  ],
  resumes: [
    {
      label: "Programs Management Resume",
      descriptor: "For roles in program & operations leadership across global teams.",
      href: "/resumes/program-management-resume.pdf",
    },
    {
      label: "Community Resume",
      descriptor: "For community, developer relations, and ecosystem-building roles.",
      href: "/resumes/community-resume.pdf",
    },
    {
      label: "Product Strategy Resume",
      descriptor: "For product management and product strategy roles.",
      href: "/resumes/product-strategy-resume.pdf",
    },
  ],
  references: [
    { name: "Shiv Gaglani", note: "Co-founder & CEO, Osmosis (Elsevier) — available on request." },
    { name: "Jorge Mendes", note: "Global Partnerships Leader — available on request." },
    { name: "Victoria Cumberbatch", note: "Community Strategy — available on request." },
    { name: "Others", note: "Available on request." },
  ],
  cases: [
    { slug: "osmosis", title: "Osmosis — Community as growth engine" },
    { slug: "roomz", title: "ROOMZ — 0→1 product build" },
    { slug: "ascent", title: "Ascent — AI education platform" },
    {
      slug: "global-collaboration-village",
      title: "Global Collaboration Village",
      line: "Leverage immersive tech to provide feedback on stakeholder collaboration in the Metaverse",
    },
    { slug: "bulb-africa", title: "Bulb Africa — Developer ecosystems" },
  ],
  availability: {
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

// Public: recruiter requests the brief. Creates a share-link token and returns
// the brief URL — the client sends the actual emails via EmailJS (see
// src/lib/emailjs.client.ts), since email delivery needs no server secret that way.
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

    const request = getRequest();
    const host = request?.headers.get("host");
    const proto = request?.headers.get("x-forwarded-proto") ?? "https";
    const origin = host ? `${proto}://${host}` : "http://localhost:8080";
    const briefUrl = `${origin}/hiring-alfred?key=${token}`;

    return { state: "created" as const, briefUrl };
  });
