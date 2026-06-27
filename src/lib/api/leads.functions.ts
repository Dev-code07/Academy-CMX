import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";

// Server function to handle lead submissions. Sends an email to the profile-specific admin.
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
    })
  )
  .handler(async ({ data }) => {
    const adminEmail = data.adminEmail || process.env.DEFAULT_ADMIN_EMAIL || "rahul.codexmatrix@gmail.com";

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

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

    // If SMTP not configured, just log and return ok=false
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.warn("SMTP not configured, lead will be logged instead of emailed.", { adminEmail, payload: data });
      console.info("[server] lead received", data);
      return { ok: true, emailed: false };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const from = process.env.SMTP_FROM || smtpUser;

    const subject = `New lead: ${data.profile} — ${data.name}`;

    try {
      await transporter.sendMail({
        from,
        to: adminEmail,
        subject,
        text,
        html: `<pre style="white-space:pre-wrap">${text}</pre>`,
      });
      console.info("[server] lead emailed to", adminEmail);
      return { ok: true, emailed: true };
    } catch (err) {
      console.error("[server] failed to send lead email", err);
      // still return success so UI doesn't block; surface emailed:false
      return { ok: false, emailed: false };
    }
  });
