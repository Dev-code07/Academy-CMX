import { useState } from "react";
import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { personas } from "@/lib/landing/data";
import { GlowButton } from "./shared/GlowButton";
import { useLeadModal } from "./shared/LeadContext";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
export function VisitorSegmentation({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const { openLead } = useLeadModal();
  const current = personas.find((p) => p.id === active)!;
  return (
    <section className="relative py-12 py-md-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Choose your path"
          title={<>Built for every <span className="text-gradient">growth journey</span></>}
          subtitle="Pick the profile that fits you best — we'll surface the right roadmap, mentors, and outcomes."
        />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.04}>
              <button
                onClick={() => onChange(p.id)}
                className={`w-full text-left transition-all ${
                  active === p.id ? "scale-[1.01]" : ""
                }`}
              >
                <GlassCard
                  className={`h-full ${
                    active === p.id
                      ? "border-[color:var(--accent)]/50 shadow-glow-accent"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                      I am a
                    </span>
                    <span
                      className={`size-2 rounded-full transition-colors ${
                        active === p.id ? "bg-[color:var(--accent)] shadow-glow-accent" : "bg-white/20"
                      }`}
                    />
                  </div>
                  <h3 className="mt-3 text-2xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </GlassCard>
              </button>
            </ScrollReveal>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8"
          >
            <GlassCard className="glass-strong border-[color:var(--accent)]/20 p-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">Outcome</p>
                  <p className="mt-2 text-2xl font-bold text-gradient">{current.outcome}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">Recommended path</p>
                  <p className="mt-2 text-xl font-semibold">{current.path}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    {["1:1 mentor matched", "Portfolio build-out", "Placement support", "Lifetime community"].map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <Check className="size-4 text-[color:var(--accent)]" /> {b}
                      </li>
                    ))}
                  </ul>
                  <GlowButton className="mt-6" onClick={() => openLead(`persona-${current.id}`)}>
                    Get my custom {current.title} roadmap
                  </GlowButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
