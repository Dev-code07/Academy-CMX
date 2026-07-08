# TODO - Convert Nodemailer lead emails to Resend

- [ ] Inspect current lead email implementation (src/lib/api/leads.functions.ts)
- [ ] Add Resend client integration (new server-only helper or inline) and remove nodemailer usage for leads
- [ ] Update src/lib/api/leads.functions.ts to send email via Resend using env vars (RESEND_API_KEY, RESEND_FROM, RESEND_SANDBOX_RECIPIENT)
- [x] Ensure behavior: if Resend not configured, log and return { ok: true, emailed: false } like current SMTP fallback

- [x] Ensure adminEmail routing continues to work
- [x] Update package.json dependencies if needed (resend)
- [x] Run typecheck/lint/build to verify


