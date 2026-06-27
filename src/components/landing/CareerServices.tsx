import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { careerServices } from "@/lib/landing/data";
import { Check } from "lucide-react";

export function CareerServices() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Career services"
          title={<>We help you <span className="text-gradient">get hired</span></>}
          subtitle="End-to-end placement support — from your résumé to your offer letter."
        />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {careerServices.map((s, i) => (
            <ScrollReveal key={s} delay={i * 0.02}>
              <GlassCard className="h-full p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                    <Check className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{s}</span>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
