import { GlowButton } from "./shared/GlowButton";
import { useLeadModal } from "./shared/LeadContext";
import { AIBrainOrb } from "./AIBrainOrb";
import { ScrollReveal } from "./shared/ScrollReveal";
import { trustStats } from "@/lib/landing/data";
import { Star, ArrowRight, Download } from "lucide-react";
export function Hero() {
  const { openLead } = useLeadModal();
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10 grid-bg opacity-[0.35]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[80vh] bg-gradient-hero" />
      <div className="pointer-events-none absolute -left-40 top-40 -z-10 size-[520px] rounded-full bg-secondary opacity-20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-60 -z-10 size-[520px] rounded-full bg-primary opacity-20 blur-[140px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
              <span className="size-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-glow" />
              <span className="font-mono uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Cohort 14 · Applications Open
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="mt-6 text-balance font-display text-3xl font-bold leading-[1.2] tracking-[-0.03em] sm:text-4xl lg:text-[68px]">
              Build Your AI Career,{" "}
              <span className="text-gradient">Launch Your Startup</span>, or Scale Your Business with Industry-Ready Skills
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              Master Artificial Intelligence, Machine Learning, Generative AI, Automation, Data Science, Full Stack Development, Digital Growth, and Business Systems through real-world projects, global mentors, and outcome-driven learning.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GlowButton size="md" onClick={() => openLead("hero-primary")}>
                Book Free Career Strategy Session
                <ArrowRight className="size-4" />
              </GlowButton>
              <GlowButton size="md" variant="outline" onClick={() => openLead("hero-guide")}>
                <Download className="size-4" />
                Download Program Guide
              </GlowButton>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex direction-row items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[color:var(--accent)] text-[color:var(--accent)]" />
                ))}
              </div>
              <span>Rated by learners worldwide</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {trustStats.map((s) => (
                <div key={s.label} className="glass rounded-xl p-3">
                  <dt className="text-xl font-bold text-gradient">{s.value}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.15} y={0}>
          <AIBrainOrb />
        </ScrollReveal>
      </div>
    </section>
  );
}
