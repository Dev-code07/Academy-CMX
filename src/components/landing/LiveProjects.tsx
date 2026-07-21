import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { liveProjects } from "@/lib/landing/data";
export function LiveProjects() {
  return (
    <section id="projects" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Live industry projects"
          title={<>Build real solutions that <span className="text-gradient">employers value</span></>}
          subtitle="Every learner ships production-grade portfolio projects with measurable business impact."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {liveProjects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.03}>
              <GlassCard glow className="group h-full">
                <span className="inline-flex rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-secondary-foreground">
                  {p.industry}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-tight">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{p.problem}</p>

                <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                  <Row k="Tools" v={p.tools} />
                  <Row k="Impact" v={p.impact} accent />
                  <Row k="Value" v={p.value} />
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="shrink-0 text-muted-foreground">{k}</span>
      <span className={`text-right font-medium ${accent ? "text-[color:var(--accent)]" : ""}`}>{v}</span>
    </div>
  );
}
