import { useState } from "react";
import { GlassCard } from "./shared/GlassCard";
import { SectionHeading } from "./shared/SectionHeading";
import { stories } from "@/lib/landing/data";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
export function SuccessStories() {
  const [i, setI] = useState(0);
  const s = stories[i];
  return (
    <section id="stories" className="relative py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Success stories"
          title={<>Transformation <span className="text-gradient">stories</span></>}
          subtitle="Real learners. Real career switches. Real income jumps."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <GlassCard className="glass-strong relative overflow-hidden p-8 sm:p-10">
            <div className="absolute -right-10 -top-10 opacity-10">
              <Quote className="size-48" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-balance text-2xl font-display font-medium leading-snug tracking-tight sm:text-3xl">
                  "{s.quote}"
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-gradient-primary font-bold">
                    {s.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex items-center gap-2">
              <button
                onClick={() => setI((i - 1 + stories.length) % stories.length)}
                className="glass grid size-9 place-items-center rounded-full hover:border-[color:var(--accent)]/40"
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => setI((i + 1) % stories.length)}
                className="glass grid size-9 place-items-center rounded-full hover:border-[color:var(--accent)]/40"
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </button>
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
              </span>
            </div>
          </GlassCard>

          <GlassCard className="glass-strong h-full">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
              Before → After
            </p>
            <div className="mt-6 space-y-5">
              <Pair k="Before" v={s.before} />
              <div className="h-px bg-white/10" />
              <Pair k="After" v={s.after} accent />
            </div>
            <div className="mt-8 rounded-xl bg-gradient-primary/10 p-4 text-sm">
              <p className="text-xs text-muted-foreground">Source</p>
              <p className="mt-1 font-medium">Verified LinkedIn recommendation</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
function Pair({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</p>
      <p className={`mt-1 text-2xl font-bold ${accent ? "text-gradient" : ""}`}>{v}</p>
    </div>
  );
}
