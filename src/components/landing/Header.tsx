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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openLead } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-[oklch(0.1_0.04_270)] md:bg-[oklch(0.1_0.04_270)/0.7] md:backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
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

        {/* Desktop Navigation */}
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

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-2">
          <GlowButton size="md" onClick={() => openLead("header-cta")}>
            Book Free Session
          </GlowButton>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="relative z-50 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileOpen && (
        <div className="relative fixed inset-x-0 top-0 bottom-0 z-40 flex h-[calc(55vh-4rem)] flex-col justify-between overflow-hidden bg-[oklch(0.1_0.04_270)] p-6 md:hidden">
          {/* Subtle Ambient Background Gradient Glows */}
          <div className="pointer-events-none absolute -top-10 -left-10 size-72 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 size-72 rounded-full bg-gradient-primary opacity-25 blur-3xl" />

          {/* Nav Items */}
          <nav className="relative z-10 flex flex-col items-start gap-6 pt-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={handleNavClick}
                className="group font-display text-lg font-bold transition-opacity"
              >
                <span className=" text-white group-hover:opacity-80">
                  {n.label}
                </span>
              </a>
            ))}
          </nav>

          {/* CTA Button at Bottom */}
          <div className="relative z-10 pb-10 pt-6 border-t border-white/10">
            <GlowButton
              size="md"
              className="w-full justify-center"
              onClick={() => {
                setMobileOpen(false);
                openLead("header-cta-mobile");
              }}
            >
              Book Free Session
            </GlowButton>
          </div>
        </div>
      )}
    </header>
  );
}