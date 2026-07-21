import { useEffect, useState } from "react";
import { GlassCard } from "./shared/GlassCard";
import { GlowButton } from "./shared/GlowButton";
import { useLeadModal } from "./shared/LeadContext";
import { Sparkles } from "lucide-react";
function useCountdown(targetDays = 9) {
  const [target, setTarget] = useState(0);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const nextTarget = Date.now() + targetDays * 24 * 60 * 60 * 1000;
    setTarget(nextTarget);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetDays]);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}
export function UrgencyScholarships() {
  const t = useCountdown();
  const seatsTotal = 60;
  const seatsLeft = 12;
  const pct = ((seatsTotal - seatsLeft) / seatsTotal) * 100;
  const { openLead } = useLeadModal();
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <GlassCard className="glass-strong overflow-hidden p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)]/15 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-[color:var(--accent)]">
                <Sparkles className="size-3" /> Applications now open · Cohort 14
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Up to <span className="text-gradient">40% scholarship</span> for early applicants
              </h2>
              <p className="mt-4 max-w-lg text-sm text-muted-foreground">
                Limited seats per cohort to preserve mentor-to-learner ratio. Scholarships awarded on a rolling basis to the strongest applications.
              </p>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Seats remaining</span>
                  <span className="font-mono font-semibold text-[color:var(--accent)]">{seatsLeft} / {seatsTotal}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-gradient-primary transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <GlowButton size="lg" className="mt-7" onClick={() => openLead("scholarship")}>
                Apply for Scholarship
              </GlowButton>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[oklch(0.1_0.04_270)] p-6">
              <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Application deadline
              </p>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                {[
                  { l: "Days", v: t.d },
                  { l: "Hours", v: t.h },
                  { l: "Mins", v: t.m },
                  { l: "Secs", v: t.s },
                ].map((u) => (
                  <div key={u.l} className="glass rounded-xl py-4">
                    <p className="font-mono text-3xl font-bold text-gradient sm:text-4xl">
                      {String(u.v).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{u.l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-[11px] text-muted-foreground">
                Cohort kicks off the week following deadline.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
