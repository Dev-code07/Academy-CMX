import { ScrollReveal } from "./ScrollReveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <ScrollReveal className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]`}>
          <span className="size-1.5 rounded-full bg-[color:var(--accent)] animate-pulse-glow" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-balance text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
