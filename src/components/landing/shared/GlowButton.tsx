import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";
type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}
export const GlowButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";
    const sizes: Record<Size, string> = {
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };
    const variants: Record<Variant, string> = {
      primary:
        "bg-gradient-primary text-primary-foreground shadow-[0_8px_30px_-4px_oklch(0.65_0.21_252/0.5)] hover:shadow-[0_12px_50px_-4px_oklch(0.65_0.21_252/0.8)] hover:scale-[1.02]",
      outline:
        "glass-strong text-foreground border border-[color:var(--border)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--accent)]",
      ghost:
        "text-foreground/80 hover:text-foreground hover:bg-white/5",
    };
    return (
      <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props} />
    );
  },
);
GlowButton.displayName = "GlowButton";
