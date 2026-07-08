import { c as createServerRpc } from "./createServerRpc-COFUSbbe.mjs";
import { a as createServerFn } from "./server-CxnyA7Ml.mjs";
import { R as Resend } from "../_libs/resend.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as object, r as record, s as string } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/standardwebhooks.mjs";
import "../_libs/stablelib__base64.mjs";
import "../_libs/fast-sha256.mjs";
async function sendLeadEmailViaResend(input) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const missing = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!from) missing.push("RESEND_FROM");
  if (missing.length) {
    console.warn("Resend not configured; skipping email.", {
      missing,
      to: input.to,
      subject: input.subject,
      nodeEnv: "production",
      hasSandboxRecipient: !!process.env.RESEND_SANDBOX_RECIPIENT
    });
    return { sent: false, missing };
  }
  const resendFrom = from;
  const resend = new Resend(apiKey);
  const sandboxRecipient = process.env.RESEND_SANDBOX_RECIPIENT;
  const nodeEnv = "production";
  const isProduction = process.env.VERCEL_ENV === "production" || nodeEnv === "production";
  const shouldUseSandbox = !isProduction;
  const finalTo = input.to;
  console.info("[server][resend] send attempt", {
    nodeEnv,
    isProduction,
    shouldUseSandbox,
    sandboxRecipient: sandboxRecipient ?? null,
    inputTo: input.to,
    finalTo
  });
  await resend.emails.send({
    // Resend typings are strict; runtime we ensured `resendFrom` exists.
    from: resendFrom,
    to: finalTo,
    subject: input.subject,
    text: input.text,
    html: input.html
  });
  return { sent: true, usedSandbox: shouldUseSandbox };
}
const submitLead_createServerFn_handler = createServerRpc({
  id: "ac26f9916c7bdd965311fc480dedcbec6114fdeb4d8b9ad70ef485ea13cf1d4f",
  name: "submitLead",
  filename: "src/lib/api/leads.functions.ts"
}, (opts) => submitLead.__executeServer(opts));
const submitLead = createServerFn({
  method: "POST"
}).inputValidator(object({
  name: string().min(2),
  email: string().email(),
  phone: string().min(7),
  profile: string().min(1),
  goal: string().min(1),
  source: string().optional(),
  adminEmail: string().email().optional(),
  answers: record(string(), string()).optional()
})).handler(submitLead_createServerFn_handler, async ({
  data
}) => {
  const adminEmail = data.adminEmail || process.env.DEFAULT_ADMIN_EMAIL || "codexmattrixacademy@gmail.com";
  const textLines = [`Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone}`, `Profile: ${data.profile}`, `Goal: ${data.goal}`, `Source: ${data.source ?? "-"}`];
  if (data.answers) {
    textLines.push("\nAssessment answers:");
    for (const [k, v] of Object.entries(data.answers)) {
      textLines.push(`${k}: ${v}`);
    }
  }
  const text = textLines.join("\n");
  const subject = `New lead: ${data.profile} — ${data.name}`;
  try {
    const res = await sendLeadEmailViaResend({
      to: adminEmail,
      subject,
      text,
      html: `<pre style="white-space:pre-wrap">${text}</pre>`
    });
    if (!res.sent) {
      return {
        ok: true,
        emailed: false
      };
    }
    console.info("[server] lead emailed via Resend to", adminEmail);
    return {
      ok: true,
      emailed: true
    };
  } catch (err) {
    console.error("[server] failed to send lead email via Resend", err);
    return {
      ok: false,
      emailed: false
    };
  }
});
export {
  submitLead_createServerFn_handler
};
