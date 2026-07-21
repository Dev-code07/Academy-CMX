import { motion, useReducedMotion } from "motion/react";

const orbits = [
  { label: "Careers",    angle: 0,   r: 130 },
  { label: "Automation", angle: 60,  r: 130 },
  { label: "Startups",   angle: 120, r: 130 },
  { label: "Coding",     angle: 180, r: 130 },
  { label: "Analytics",  angle: 240, r: 130 },
  { label: "Innovation", angle: 300, r: 130 },
];

export function AIBrainOrb() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Mesh glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-[12%] rounded-full bg-gradient-glow opacity-30 blur-3xl animate-pulse-glow" />
        <div className="absolute inset-[28%] rounded-full bg-secondary opacity-30 blur-2xl" />
      </div>

      {/* Outer ring border */}
      <div className="absolute inset-0 rounded-full border border-white/10" />

      {/* Outer ring ticks - SVG based so it scales perfectly at any container size */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 48 }).map(function (_, i) {
          const angle = (i * 7.5 * Math.PI) / 180;
          const x1 = 100 + 92 * Math.cos(angle);
          const y1 = 100 + 92 * Math.sin(angle);
          const x2 = 100 + 100 * Math.cos(angle);
          const y2 = 100 + 100 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />
          );
        })}
      </motion.svg>

      {/* Middle ring */}
      <motion.div
        className="absolute inset-[14%] rounded-full border border-white/[0.07]"
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Core orb - slightly smaller on mobile to give badges more breathing room */}
      <div className="absolute inset-[33%] sm:inset-[30%] grid place-items-center rounded-full bg-gradient-primary shadow-glow">
        <div className="absolute inset-2 rounded-full bg-[oklch(0.18_0.06_270)]" />
        <svg
          viewBox="0 0 100 100"
          className="relative size-16 sm:size-24 text-[color:var(--accent)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M50 12 C30 12 22 28 22 42 C12 46 12 60 22 64 C22 78 32 88 50 88 C68 88 78 78 78 64 C88 60 88 46 78 42 C78 28 70 12 50 12 Z" />
          <path d="M50 12 V88 M22 42 H78 M22 64 H78 M30 28 Q50 38 70 28 M30 72 Q50 62 70 72" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* Orbiting nodes */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {orbits.map(function (o) {
          const rad = (o.angle * Math.PI) / 180;
          const x = Number((50 + (o.r / 4.5) * Math.cos(rad)).toFixed(4));
          const y = Number((50 + (o.r / 4.5) * Math.sin(rad)).toFixed(4));
          return (
            <motion.div
              key={o.label}
              className="absolute"
              style={{ left: x + "%", top: y + "%", transform: "translate(-50%, -50%)" }}
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            >
              <div className="glass-strong whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium shadow-[0_4px_20px_oklch(0_0_0/0.4)] sm:px-3 sm:py-1.5 sm:text-xs">
                <span className="bg-clip-text">{o.label}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}