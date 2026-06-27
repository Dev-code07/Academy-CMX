import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { GlowButton } from "./shared/GlowButton";
import { learningPaths } from "@/lib/landing/data";
import { useLeadModal } from "./shared/LeadContext";
import { ArrowUpRight, Clock, BarChart2, Wrench } from "lucide-react";

export function LearningPaths() {
  const { openLead } = useLeadModal();
  return (
    <section id="paths" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Learning paths"
          title={<>Choose your <span className="text-gradient">transformation track</span></>}
          subtitle="14 industry-validated tracks. Real curriculum, real outcomes, real placement support."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learningPaths.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.025}>
              <GlassCard glow className="group flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:text-[color:var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><Clock className="size-3.5" /> {p.duration}</li>
                  <li className="flex items-center gap-2"><BarChart2 className="size-3.5" /> {p.level}</li>
                  <li className="flex items-start gap-2"><Wrench className="mt-0.5 size-3.5 shrink-0" /> {p.tools.join(" · ")}</li>
                </ul>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Outcome</p>
                  <p className="mt-1 text-sm font-semibold">{p.outcome}</p>
                  <p className="mt-2 text-xs text-gradient font-mono">{p.salary}</p>
                </div>

                <button
                  onClick={() => openLead(`path-${p.title}`)}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-all hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)]"
                >
                  View Roadmap →
                </button>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <GlowButton size="lg" onClick={() => openLead("paths-cta")}>
            Talk to an advisor about your track
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
