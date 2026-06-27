import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

export const GlassCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { glow?: boolean }>(
  ({ className, glow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-6 transition-all duration-500",
        "hover:border-[color:var(--accent)]/30 hover:-translate-y-1",
        glow && "hover:shadow-glow-accent",
        className,
      )}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";
