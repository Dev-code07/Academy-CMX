import { SectionHeading } from "./shared/SectionHeading";
import { skills } from "@/lib/landing/data";
export function SkillsGrid() {
  // duplicate for seamless marquee
  const row = [...skills, ...skills];
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills you'll master"
          title={<>The exact stack <span className="text-gradient">top AI teams</span> hire for</>}
          subtitle="A curriculum built around what's actually used at FAANG, frontier AI labs, and unicorn startups."
        />
      </div>
      <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max gap-3 animate-marquee">
          {row.map((s, i) => (
            <span
              key={i}
              className="glass shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-2 px-4 sm:grid-cols-3 sm:px-6 md:grid-cols-4 lg:grid-cols-5">
        {skills.map((s) => (
          <div
            key={s}
            className="glass rounded-xl px-4 py-3 text-center text-xs font-medium transition-all hover:-translate-y-0.5 hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)] hover:shadow-glow-accent"
          >
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}
