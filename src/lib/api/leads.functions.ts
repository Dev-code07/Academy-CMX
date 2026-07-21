import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendLeadEmailViaResend } from "./_mail.resend";
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(7),
      profile: z.string().min(1),
      goal: z.string().min(1),
      source: z.string().optional(),
      adminEmail: z.string().email().optional(),
      answers: z.record(z.string(), z.string()).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const adminEmail =
      data.adminEmail ||
      process.env.DEFAULT_ADMIN_EMAIL ||
      "codexmattrixacademy@gmail.com";

    const textLines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Profile: ${data.profile}`,
      `Goal: ${data.goal}`,
      `Source: ${data.source ?? "-"}`,
    ];

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
        html: `<pre style="white-space:pre-wrap">${text}</pre>`,
      });

      if (!res.sent) {
        // Resend not configured; treat as non-blocking.
        return { ok: true, emailed: false };
      }

      console.info("[server] lead emailed via Resend to", adminEmail);
      return { ok: true, emailed: true };
    } catch (err) {
      console.error("[server] failed to send lead email via Resend", err);
      // still return success so UI doesn't block; surface emailed:false
      return { ok: false, emailed: false };
    }
  });

