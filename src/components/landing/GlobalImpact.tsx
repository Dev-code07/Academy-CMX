import { SectionHeading } from "./shared/SectionHeading";
import { ScrollReveal } from "./shared/ScrollReveal";
import { globalCountries } from "@/lib/landing/data";
import { AnimatedCounter } from "./shared/AnimatedCounter";
export function GlobalImpact() {
  const total = globalCountries.reduce((a, b) => a + b.students, 0);
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Global impact"
          title={<>Learners and businesses across <span className="text-gradient">30+ countries</span></>}
          subtitle="From Silicon Valley to Singapore — a global community building the next era of AI work."
        />
        <ScrollReveal>
          <div className="relative mt-14 aspect-[2/1] w-full overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.11_0.04_270)]">
            {/* Stylized dot world */}
            <svg className="absolute inset-0 size-full opacity-30" viewBox="0 0 100 50">
              {Array.from({ length: 28 }).map((_, r) =>
                Array.from({ length: 56 }).map((_, c) => {
                  const x = c * 1.78 + 0.5;
                  const y = r * 1.78 + 0.5;
                  // Crude continent mask
                  const inMask =
                    (x > 12 && x < 28 && y > 10 && y < 32) || // Americas
                    (x > 42 && x < 60 && y > 8 && y < 30) ||  // Europe / Africa
                    (x > 60 && x < 88 && y > 12 && y < 36);   // Asia / Oceania
                  if (!inMask) return null;
                  return <circle key={`${r}-${c}`} cx={x} cy={y} r="0.5" fill="currentColor" />;
                }),
              )}
            </svg>
            {globalCountries.map((c) => (
              <div
                key={c.code}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
              >
                <span className="relative grid size-3 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-[color:var(--accent)] animate-pulse-glow" />
                  <span className="absolute inset-0 rounded-full bg-[color:var(--accent)] opacity-40 blur-md" />
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full glass px-2 py-0.5 text-[10px] font-medium">
                  {c.code} <span className="text-[color:var(--accent)]">·</span> {c.students}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {[
            { l: "Students", v: total },
            { l: "Professionals", v: 4200 },
            { l: "Businesses", v: 180 },
            { l: "Projects Delivered", v: 9400 },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-gradient">
                <AnimatedCounter to={s.v} />+
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
