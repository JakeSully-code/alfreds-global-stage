import { createClientOnlyFn } from "@tanstack/react-start";
import emailjs from "@emailjs/browser";

// EmailJS sends from the browser using only this public key — safe to ship in
// client code by design (EmailJS's spam protection is domain/origin-based,
// not secret-based). No server-side secret is needed for any of this.
// Wrapped in createClientOnlyFn since @emailjs/browser touches the DOM and
// must never execute during SSR.
const SERVICE_ID = "service_9pn4vq9";
const REQUESTER_TEMPLATE_ID = "template_pm5zts4";
const OWNER_TEMPLATE_ID = "template_1bhkheq";
const PUBLIC_KEY = "s_9zNMXc6Tu_FLkXm";

export const sendBriefEmails = createClientOnlyFn(
  async (p: { name: string; email: string; companyRole?: string; briefUrl: string }): Promise<void> => {
    await emailjs.send(
      SERVICE_ID,
      REQUESTER_TEMPLATE_ID,
      { to_email: p.email, to_name: p.name, brief_url: p.briefUrl },
      { publicKey: PUBLIC_KEY },
    );

    try {
      await emailjs.send(
        SERVICE_ID,
        OWNER_TEMPLATE_ID,
        {
          requester_name: p.name,
          requester_email: p.email,
          company_role: p.companyRole ?? "—",
        },
        { publicKey: PUBLIC_KEY },
      );
    } catch (e) {
      console.error("[emailjs] owner notification failed", e);
    }
  },
);
