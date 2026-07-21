import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { certifications } from "@/lib/landing/data";
import { Award, ShieldCheck } from "lucide-react";
export function Certifications() {
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Certifications"
          title={<>Industry-recognized <span className="text-gradient">certifications</span></>}
          subtitle="Stackable credentials that signal real, verifiable skill to employers and clients."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Premium certificate mock */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 bg-gradient-primary p-1 shadow-elevated">
              <div className="relative grid size-full place-items-center rounded-[20px] bg-[oklch(0.11_0.04_270)] p-8">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="absolute -right-20 -top-20 size-64 rounded-full bg-[color:var(--accent)] opacity-20 blur-3xl" />
                <div className="relative text-center">
                  <ShieldCheck className="mx-auto size-10 text-[color:var(--accent)]" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    Certificate of Mastery
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
                    Applied <span className="text-gradient">Generative AI</span>
                  </h3>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Awarded by CodexMattrix Academy™
                  </p>
                  <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider">
                    <span>CMX · 2026 · #04127</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {certifications.map((c, i) => (
              <ScrollReveal key={c.cat} delay={i * 0.04}>
                <GlassCard glow className="h-full">
                  <Award className="size-5 text-[color:var(--accent)]" />
                  <h3 className="mt-3 text-base font-bold">{c.cat}</h3>
                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {c.items.map((it) => (
                      <li key={it}>· {it}</li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
