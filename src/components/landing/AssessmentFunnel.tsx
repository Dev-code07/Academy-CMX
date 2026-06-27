import { useEffect, useState } from "react";
import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { GlowButton } from "./shared/GlowButton";
import { assessmentQuestions } from "@/lib/landing/data";
import { useLeadModal } from "./shared/LeadContext";
import { Sparkles, TrendingUp, Target, Clock } from "lucide-react";

export function AssessmentFunnel({ profile }: { profile: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questions =
    profile === "student"
      ? assessmentQuestions.filter((question) => question.id !== "salary")
      : assessmentQuestions;
  const total = questions.length;
  const { openLead } = useLeadModal();
  const done = step >= total;

  useEffect(() => {
    setStep(0);
    setAnswers({});
  }, [profile]);

  const progress = Math.min(100, ((step) / total) * 100);

  const score = Math.min(98, 60 + Object.keys(answers).length * 7);
  const salary = "$95k–$185k";
  const path =
    answers.goal?.includes("startup")
      ? "Startup Builder + Agentic AI"
      : answers.goal?.includes("salary")
      ? "Generative AI + Automation"
      : "AI Engineering";
  const timeline =
    answers.skill === "Complete beginner" ? "9–12 months" : answers.skill === "Advanced" ? "3–4 months" : "5–7 months";

  return (
    <section id="assessment" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="AI Career Assessment"
          title={<>Discover your <span className="text-gradient">best AI career path</span></>}
          subtitle={`${total} quick questions. Get your match score, salary projection, and a personalised roadmap.`}
        />

        <div className="mt-12">
          <GlassCard className="glass-strong p-8 sm:p-10">
            {!done ? (
              <>
                <div className="mb-6 flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    Question {step + 1} of {total}
                  </span>
                  <span className="text-muted-foreground">{Math.round(progress)}% complete</span>
                </div>
                <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>

                <h3 className="text-2xl font-bold sm:text-3xl">{questions[step].q}</h3>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {questions[step].options.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setAnswers({ ...answers, [questions[step].id]: o });
                        setStep(step + 1);
                      }}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-left text-sm transition-all hover:border-[color:var(--accent)]/50 hover:bg-white/[0.05]"
                    >
                      {o}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 text-xs text-muted-foreground hover:text-foreground"
                  >
                    ← Back
                  </button>
                )}
              </>
            ) : (
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="size-4 text-[color:var(--accent)]" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    Your AI career profile
                  </span>
                </div>
                <h3 className="text-3xl font-bold sm:text-4xl">
                  Match score:{" "}
                  <span className="text-gradient">{score}%</span>
                </h3>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <Stat icon={<TrendingUp className="size-5" />} label="Salary projection" value={salary} />
                  <Stat icon={<Target className="size-5" />} label="Recommended path" value={path} />
                  <Stat icon={<Clock className="size-5" />} label="Timeline to success" value={timeline} />
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <GlowButton size="lg" onClick={() => openLead("assessment-cta", { answers, profile })}>
                    Unlock my full roadmap (free)
                  </GlowButton>
                  <GlowButton size="lg" variant="ghost" onClick={() => { setStep(0); setAnswers({}); }}>
                    Retake assessment
                  </GlowButton>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="grid size-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
        {icon}
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}
