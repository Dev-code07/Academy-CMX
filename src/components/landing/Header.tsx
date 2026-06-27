import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GlowButton } from "./shared/GlowButton";
import { useLeadModal } from "./shared/LeadContext";
import { SITE } from "@/lib/landing/config";

const nav = [
  { href: "#paths", label: "Programs" },
  { href: "#projects", label: "Projects" },
  { href: "#mentors", label: "Mentors" },
  { href: "#stories", label: "Stories" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openLead } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[oklch(0.1_0.04_270)/0.7] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-primary text-sm font-bold shadow-glow">
            CM
            <span className="absolute inset-0 rounded-xl bg-gradient-primary opacity-50 blur-md transition-opacity group-hover:opacity-80" />
          </span>
          <span className="font-display text-base font-bold tracking-tight">
            {SITE.brand}
            <span className="ml-1 text-xs text-muted-foreground">Academy™</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* <GlowButton variant="ghost" size="md" className="hidden sm:inline-flex" onClick={() => openLead("header-secondary")}>
            Login
          </GlowButton> */}
          <GlowButton size="md" onClick={() => openLead("header-cta")}>
            Book Free Session
          </GlowButton>
        </div>
      </div>
    </header>
  );
}
