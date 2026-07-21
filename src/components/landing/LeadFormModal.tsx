import { useEffect, useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GlowButton } from "./shared/GlowButton";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import { submitLead } from "@/lib/api/leads.functions";
const schema = z.object({
  goal: z.string().min(1).max(80),
  profile: z.string().min(1).max(80),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(7).max(20).regex(/^[+\d\s()-]+$/),
});
const goals = ["Land an AI job", "2x my salary", "Launch a startup", "Build an agency"];
const profiles = ["Student", "Professional", "Freelancer", "Founder", "Career Switcher"];
// Map profile -> admin email that should receive the lead
const adminEmails: Record<string, string> = {
  Student: "student@codexmattrix.com",
  Professional: "pro@codexmattrix.com",
  Freelancer: "freelancer@codexmattrix.com",
  Founder: "founder@codexmattrix.com",
  "Career Switcher": "switcher@codexmattrix.com",
};
export function LeadFormModal({
  open,
  onClose,
  source,
  payload,
}: {
  open: boolean;
  onClose: () => void;
  source: string;
  payload?: any;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ goal: "", profile: "", name: "", email: "", phone: "" });
  const [done, setDone] = useState(false);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const reset = () => {
    setStep(0);
    setData({ goal: "", profile: "", name: "", email: "", phone: "" });
    setDone(false);
    setEmailSent(null);
    setErr(null);
  };
  useEffect(() => {
    if (open && payload) {
      // Prefill profile if provided in payload (e.g., from assessment)
      setData((d) => ({ ...d, profile: payload.profile ?? d.profile }));
    }
  }, [open, payload]);

  // Goal options depend on the selected profile.
  // Students shouldn't see "2x my salary" since it doesn't apply to them.
  const availableGoals =
    data.profile === "Student" ? goals.filter((g) => g !== "2x my salary") : goals;

  const submit = async () => {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setErr("Please check your details and try again.");
      return;
    }
    const adminEmail = "codexmattrixacademy@gmail.com";
    try {
      const result = await submitLead({ data: { ...parsed.data, source, adminEmail, answers: payload?.answers } });
      setDone(true);
      setEmailSent(result?.emailed ?? false);
    } catch (e) {
      console.error("lead submit failed", e);
      setErr("Submission failed. Please try again later.");
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setTimeout(reset, 300);
        }
      }}
    >
      <DialogContent        
        className="max-w-lg  border-white/10 bg-[#000] p-0 shadow-elevated"
      >
        <DialogTitle className="sr-only">Book your career strategy session</DialogTitle>
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 -z-10 bg-gradient-glow opacity-10" />
          <div className="p-7">
            {done ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-gradient-primary shadow-glow">
                  <Check className="size-7" />
                </div>
                <h3 className="text-2xl font-bold">You're in.</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our admissions team will reach out within 24 hours with your custom roadmap.
                </p>
                {emailSent === false ? (
                  <p className="mt-3 text-sm text-amber-200">
                    Note: email delivery is not configured for this environment, but your request has been received.
                  </p>
                ) : null}
                <GlowButton className="mt-6" onClick={onClose}>
                  Continue exploring
                </GlowButton>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-2">
                  <Sparkles className="size-4 text-[color:var(--accent)]" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    Free strategy session · Step {step + 1} of 3
                  </span>
                </div>
                <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-primary transition-all duration-500"
                    style={{ width: `${((step + 1) / 3) * 100}%` }}
                  />
                </div>
                {step === 0 && (
                  <Step title="What best describes you?">
                    <ChoiceGrid
                      options={profiles}
                      value={data.profile}
                      onPick={(v) => {
                        setData((d) => ({
                          ...d,
                          profile: v,
                          // Clear a previously picked goal if it's no longer valid for this profile
                          goal: v === "Student" && d.goal === "2x my salary" ? "" : d.goal,
                        }));
                        setStep(1);
                      }}
                    />
                  </Step>
                )}
                {step === 1 && (
                  <Step title="What's your primary goal?">
                    <ChoiceGrid
                      options={availableGoals}
                      value={data.goal}
                      onPick={(v) => {
                        setData({ ...data, goal: v });
                        setStep(2);
                      }}
                    />
                  </Step>
                )}
                {step === 2 && (
                  <Step title="Where should we send your roadmap?">
                    <div className="space-y-3">
                      <p className="mb-2 text-sm text-muted-foreground">
                        This request will be sent to{' '}
                        <a
                          href="mailto:codexmattrixacademy@gmail.com"
                          className="text-[color:var(--accent)] underline"
                        >
                          codexmattrixacademy@gmail.com
                        </a>
                      </p>
                      <Field
                        label="Full name"
                        value={data.name}
                        onChange={(v) => setData({ ...data, name: v })}
                        placeholder="Ada Lovelace"
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(v) => setData({ ...data, email: v })}
                        placeholder="you@example.com"
                      />
                      <Field
                        label="WhatsApp / Phone"
                        value={data.phone}
                        onChange={(v) => setData({ ...data, phone: v })}
                        placeholder="+1 555 0123"
                      />
                      {err && <p className="text-xs text-destructive">{err}</p>}
                      <GlowButton className="mt-2 w-full" size="lg" onClick={submit}>
                        Book free strategy session
                      </GlowButton>
                      <p className="text-center text-[11px] text-muted-foreground">
                        We respect your privacy. No spam, ever.
                      </p>
                    </div>
                  </Step>
                )}
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="mt-5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    ← Back
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-xl font-bold tracking-tight">{title}</h3>
      {children}
    </div>
  );
}
function ChoiceGrid({
  options,
  value,
  onPick,
}: {
  options: string[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onPick(o)}
          className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${
            value === o
              ? "border-[color:var(--accent)] bg-[color:var(--accent)]/10"
              : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
          }`}
        >
          <span>{o}</span>
          <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </button>
      ))}
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[color:var(--accent)] focus:bg-white/[0.06]"
      />
    </label>
  );
}