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

  if (!apiKey || !from) {
    console.warn("Resend not configured; skipping email.", {
      hasApiKey: !!apiKey,
      hasFrom: !!from,
      to: input.to,
      subject: input.subject,
    });
    return { sent: false };
  }

  const resend = new Resend(apiKey);

  // Optional: use sandbox recipient in non-prod to avoid spamming real inboxes.
  const sandboxRecipient = process.env.RESEND_SANDBOX_RECIPIENT;
  const nodeEnv = process.env.NODE_ENV;
  const shouldUseSandbox = nodeEnv !== "production" && !!sandboxRecipient;
  const finalTo = shouldUseSandbox ? sandboxRecipient! : input.to;

  await resend.emails.send({
    from,
    to: finalTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });

  return { sent: true, usedSandbox: shouldUseSandbox };
}

