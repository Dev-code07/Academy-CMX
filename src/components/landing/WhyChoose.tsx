import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { whyCards } from "@/lib/landing/data";
import {
  Brain, Users, Rocket, Briefcase, Award, Lightbulb, Cog, Globe,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Brain, Users, Rocket, Briefcase, Award, Lightbulb, Cog, Globe,
};

export function WhyChoose() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why CodexMattrix"
          title={<>Why thousands choose <span className="text-gradient">CodexMattrix</span></>}
          subtitle="Eight reasons we out-perform traditional bootcamps — built for the 2026 industry, not the 2010 textbook."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c, i) => {
            const Icon = iconMap[c.icon] ?? Brain;
            return (
              <ScrollReveal key={c.title} delay={i * 0.04}>
                <GlassCard glow className="group h-full">
                  <div className="relative grid size-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="size-5" />
                    <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-primary opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
