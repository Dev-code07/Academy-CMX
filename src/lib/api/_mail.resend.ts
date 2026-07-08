import { Resend } from "resend";

export type ResendSendInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export async function sendLeadEmailViaResend(input: ResendSendInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!from) missing.push("RESEND_FROM");

  if (missing.length) {
    console.warn("Resend not configured; skipping email.", {
      missing,
      to: input.to,
      subject: input.subject,
      nodeEnv: process.env.NODE_ENV,
      hasSandboxRecipient: !!process.env.RESEND_SANDBOX_RECIPIENT,
    });
    return { sent: false, missing };
  }

  // At this point we know from is defined (validated above), but we narrow for TypeScript.
  const resendFrom = from;

  const resend = new Resend(apiKey);

  // Optional: use sandbox recipient in non-prod to avoid spamming real inboxes.
  const sandboxRecipient = process.env.RESEND_SANDBOX_RECIPIENT;
  const nodeEnv = process.env.NODE_ENV;

  // Vercel sometimes sets NODE_ENV differently than expected.
  // Prefer an explicit production check.
  const isProduction = process.env.VERCEL_ENV === "production" || nodeEnv === "production";
  const shouldUseSandbox = !isProduction && !!sandboxRecipient;
  const finalTo = shouldUseSandbox ? sandboxRecipient! : input.to;

  console.info("[server][resend] send attempt", {
    nodeEnv,
    isProduction,
    shouldUseSandbox,
    sandboxRecipient: sandboxRecipient ?? null,
    inputTo: input.to,
    finalTo,
  });

  await resend.emails.send({
    // Resend typings are strict; runtime we ensured `resendFrom` exists.
    from: resendFrom as string,
    to: finalTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
  } as any);

  return { sent: true, usedSandbox: shouldUseSandbox };
}

