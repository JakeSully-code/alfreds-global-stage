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

export const getRecruiterBrief = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(context.claims.email ?? "").toLowerCase();
    if (!email) {
      throw new Error("FORBIDDEN: No email on session.");
    }

    const { data, error } = await context.supabase
      .from("allowed_recruiter_emails")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("[recruiter] allowlist lookup failed", error);
      throw new Error("FORBIDDEN: Could not verify access.");
    }
    if (!data) {
      throw new Error("FORBIDDEN: Email not on allowlist.");
    }

    return { email, ...BRIEF } satisfies RecruiterBrief;
  });
