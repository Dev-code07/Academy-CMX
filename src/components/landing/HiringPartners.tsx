import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { hiringPartners } from "@/lib/landing/data";
const logoNames = [
  "NovaAI", "Stratify", "Helios", "Apex Labs", "Quantum", "Vector",
  "Lumen", "Atlas", "Pulse", "Forge", "Halo", "Nimbus", "Orbit", "Prism",
];
export function HiringPartners() {
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Hiring partners"
          title={<>Access opportunities across <span className="text-gradient">every industry</span></>}
          subtitle="Our placement team has live pipelines into 100+ hiring partners across 8 sectors."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {hiringPartners.map((h) => (
            <span key={h} className="glass rounded-full px-4 py-1.5 text-xs font-medium">
              {h}
            </span>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4 lg:grid-cols-7">
          {logoNames.map((n) => (
            <div
              key={n}
              className="flex h-24 items-center justify-center bg-[oklch(0.14_0.04_270)] text-sm font-display font-bold text-muted-foreground/70 transition-all hover:text-foreground"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
