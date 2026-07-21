import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { GlowButton } from "./shared/GlowButton";
import { mentors } from "@/lib/landing/data";
import { useLeadModal } from "./shared/LeadContext";
import { Linkedin } from "lucide-react";
export function Mentors() {
  const { openLead } = useLeadModal();
  return (
    <section id="mentors" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Mentors"
          title={<>Learn from <span className="text-gradient">industry leaders</span></>}
          subtitle="1:1 access to engineers, founders, and operators who've shipped the systems you'll build."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((m, i) => (
            <ScrollReveal key={m.name} delay={i * 0.05}>
              <GlassCard glow className="group h-full">
                <div className="flex items-start gap-4">
                  <div className="relative grid size-16 place-items-center rounded-2xl bg-gradient-primary font-bold text-primary-foreground shadow-glow">
                    {m.initials}
                    <span className="absolute inset-0 -z-10 rounded-2xl bg-gradient-primary opacity-40 blur-md group-hover:opacity-80" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold leading-tight">{m.name}</h3>
                    <p className="mt-0.5 text-sm text-[color:var(--accent)]">{m.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{m.exp} · {m.focus}</p>
                  </div>
                  <a href="#" aria-label={`${m.name} LinkedIn`} className="text-muted-foreground hover:text-foreground">
                    <Linkedin className="size-4" />
                  </a>
                </div>
                <button
                  onClick={() => openLead(`mentor-${m.name}`)}
                  className="mt-5 w-full rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-all hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)]"
                >
                  Book Mentor Session
                </button>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <GlowButton onClick={() => openLead("mentors-all")}>See all 30+ mentors</GlowButton>
        </div>
      </div>
    </section>
  );
}
