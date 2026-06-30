import { createFileRoute } from "@tanstack/react-router";

function page(title: string, body: string, ok = true): Response {
  const color = ok ? "#16A34A" : "#b91c1c";
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="font-family:-apple-system,Segoe UI,sans-serif;background:#f6f5f1;color:#101418;min-height:100vh;margin:0;display:grid;place-items:center;padding:24px">
      <div style="max-width:520px;background:#fff;border:1px solid #e5e7eb;border-radius:20px;padding:36px;text-align:center">
        <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:${color}">${ok ? "Done" : "Problem"}</div>
        <h1 style="font-family:Georgia,serif;font-size:32px;margin:10px 0 12px">${title}</h1>
        <p style="color:#4b5563;line-height:1.6;font-size:15px">${body}</p>
      </div>
    </body></html>`,
    { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

export const Route = createFileRoute("/api/public/access-decision")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const token = url.searchParams.get("token") ?? "";
        const action = url.searchParams.get("action");
        if (!token || (action !== "approve" && action !== "reject")) {
          return page("Invalid link", "This approval link is malformed.", false);
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const tokenColumn = action === "approve" ? "approve_token" : "reject_token";
        const { data: req } = await supabaseAdmin
          .from("access_requests")
          .select("id, email, name, status, token_expires_at")
          .eq(tokenColumn, token)
          .maybeSingle();

        if (!req) return page("Link not found", "This link is invalid or has already been used.", false);
        if (new Date(req.token_expires_at).getTime() < Date.now()) {
          return page("Link expired", "This approval link has expired. Ask the requester to apply again.", false);
        }
        if (req.status !== "pending") {
          return page(
            "Already decided",
            `This request was already marked <strong>${req.status}</strong>.`,
            false,
          );
        }

        const newStatus = action === "approve" ? "approved" : "rejected";
        // Invalidate both tokens by overwriting them.
        const { error: updErr } = await supabaseAdmin
          .from("access_requests")
          .update({
            status: newStatus,
            decided_at: new Date().toISOString(),
            approve_token: `used-${req.id}`,
            reject_token: `used-${req.id}-r`,
          })
          .eq("id", req.id);
        if (updErr) return page("Server error", "Could not update the request. Try again.", false);

        const { sendEmail, getSiteOrigin } = await import("@/lib/email.server");

        if (action === "approve") {
          // Insert into allowlist (ignore if already present).
          await supabaseAdmin
            .from("allowed_recruiter_emails")
            .upsert({ email: req.email.toLowerCase(), note: `Approved: ${req.name}` }, { onConflict: "email" });

          try {
            await sendEmail({
              to: req.email,
              subject: "You've been granted access — Hiring Alfred",
              html: `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,sans-serif;padding:24px;color:#101418">
                <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px">
                  <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#16A34A">Access granted</div>
                  <h1 style="font-family:Georgia,serif;font-size:26px;margin:10px 0">You're in, ${escapeHtml(req.name)}.</h1>
                  <p style="color:#4b5563;line-height:1.6">Sign in with this email to view the brief.</p>
                  <p style="margin-top:20px"><a href="${getSiteOrigin()}/hiring-alfred" style="background:#16A34A;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px">Open Hiring Alfred</a></p>
                </div></body></html>`,
            });
          } catch (e) {
            console.error("[decision] grant email failed", e);
          }
          return page("Access approved", `${escapeHtml(req.name)} (${escapeHtml(req.email)}) can now sign in and view the brief.`);
        }

        try {
          await sendEmail({
            to: req.email,
            subject: "Update on your access request",
            html: `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,sans-serif;padding:24px;color:#101418">
              <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px">
                <h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 10px">Thanks for reaching out</h1>
                <p style="color:#4b5563;line-height:1.6">Alfred isn't able to share the private brief right now. Appreciate the interest.</p>
              </div></body></html>`,
          });
        } catch (e) {
          console.error("[decision] reject email failed", e);
        }
        return page("Request rejected", `Marked ${escapeHtml(req.email)}'s request as rejected.`);
      },
    },
  },
});

function escapeHtml(s: string | undefined | null): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
