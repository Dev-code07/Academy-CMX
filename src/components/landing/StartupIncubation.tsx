import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { GlowButton } from "./shared/GlowButton";
import { incubationFeatures, incubationTracks } from "@/lib/landing/data";
import { useLeadModal } from "./shared/LeadContext";
import { Check, Rocket } from "lucide-react";

export function StartupIncubation() {
  const { openLead } = useLeadModal();
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Startup incubation"
          title={
            <>Not looking for a job? <span className="text-gradient">Build your own AI business.</span></>
          }
          subtitle="From validation to investor-ready — backed by mentors who've built and exited."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {incubationTracks.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.04}>
                <GlassCard glow className="h-full">
                  <Rocket className="size-5 text-[color:var(--accent)]" />
                  <h3 className="mt-3 text-base font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{t.desc}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <GlassCard className="glass-strong h-full">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
              What's included
            </p>
            <h3 className="mt-3 text-2xl font-bold">90-day founder sprint</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {incubationFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="grid size-5 place-items-center rounded-full bg-gradient-primary">
                    <Check className="size-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <GlowButton className="mt-6 w-full" onClick={() => openLead("incubation")}>
              Apply to the incubator
            </GlowButton>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
