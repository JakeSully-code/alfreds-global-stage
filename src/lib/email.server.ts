// Server-only email helper using Resend.
// SECURITY: Never import this from client-reachable modules at top level.
// Load inside server handlers: const { sendEmail } = await import("@/lib/email.server");

type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, replyTo }: SendEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping send", { to, subject });
    return { skipped: true as const };
  }
  const from = process.env.EMAIL_FROM ?? "Alfred Collins <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[email] resend failed", res.status, body);
    throw new Error(`Email send failed: ${res.status}`);
  }
  return { skipped: false as const, id: (await res.json())?.id as string | undefined };
}

export function getOwnerEmail(): string {
  return process.env.OWNER_NOTIFICATION_EMAIL ?? "hello@alfredcollins.com";
}

export function getSiteOrigin(): string {
  return process.env.SITE_ORIGIN ?? "http://localhost:8080";
}
