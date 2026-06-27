# CodexMattrix Academy — Landing Page Plan

A single-page, scroll-driven enrollment funnel built on the existing TanStack Start stack. Premium SaaS / AI-themed dark UI with glassmorphism, electric blue + AI purple + cyan glow on a deep gradient background.

## Scope (v1)

One route (`/`) housing all 18 sections, plus persistent conversion elements (sticky header CTA, floating WhatsApp, exit-intent modal, multi-step lead form). Fully responsive, animated, SEO-tagged. No backend wiring yet — forms capture to local state and surface a "we'll contact you" confirmation; Calendly/WhatsApp/Cloud integrations are stubbed behind clearly-marked constants so they can be swapped in later.

## Design System

Tokens added to `src/styles.css` (oklch):
- `--background`: deep navy gradient base (`oklch(0.12 0.04 265)` → `oklch(0.08 0.06 280)`)
- `--primary` (Electric Blue): `oklch(0.62 0.22 250)`
- `--secondary` (AI Purple): `oklch(0.55 0.25 295)`
- `--accent` (Cyan Glow): `oklch(0.82 0.16 200)`
- Glass surfaces: `--glass-bg`, `--glass-border`, `--glass-shadow`
- Gradients: `--gradient-hero`, `--gradient-primary`, `--gradient-glow`, `--gradient-mesh`
- Glow shadows: `--shadow-glow-primary`, `--shadow-glow-accent`, `--shadow-elevated`

Typography: Plus Jakarta Sans (display/headings), Inter (body), JetBrains Mono (accent labels/code chips) — loaded via Google Fonts in `__root.tsx` head.

Motion: Framer Motion (`motion/react`) for scroll reveals, hover, counters; CSS for ambient gradient/glow drift. Reduced-motion respected.

## Section Map

1. **Hero** — gradient mesh bg, animated neural-brain SVG/orb, headline + subhead, dual CTA, trust bar (rating, 1000+/500+/100+/global)
2. **Visitor Segmentation** — 6 persona cards; click reveals tailored roadmap in expanding panel
3. **AI Career Assessment Funnel** — 5-step quiz with progress bar → lead capture (name/email/phone) → results card (match score, salary projection, path, timeline)
4. **Why CodexMattrix** — 8 glass cards with icon glow + hover lift
5. **Industry Opportunity** — interactive salary dashboard; role tabs drive animated bar/line chart (Recharts) showing avg salary, demand growth, outlook
6. **Learning Paths** — 14 program cards (duration, level, tools, outcomes, salary) with "View Roadmap" CTA
7. **Live Industry Projects** — 8 project cards with industry/problem/tools/impact
8. **Skills Grid** — animated marquee + grid of 20 skill chips with glow on hover
9. **Mentors** — 6 mentor cards (placeholder portraits, role, experience, LinkedIn, CTA)
10. **Career Services** — 10-item feature list with iconography
11. **Hiring Partner Ecosystem** — industry category tabs + animated logo wall (placeholder marks)
12. **Startup Incubation** — 6 track cards + 6 feature checklist
13. **Success Stories** — testimonial carousel with before/after stat blocks
14. **Global Impact** — stylized world map (SVG) with pulsing nodes on 8 countries + counters
15. **Certifications** — 5 categories with premium certificate mockup graphics
16. **Urgency & Scholarships** — countdown timer, seats remaining bar, cohort banner
17. **FAQ** — shadcn accordion, 7 questions
18. **Final Conversion** — full-bleed glow block, dual CTA, trust indicators

## Persistent Conversion Layer

- **Sticky header**: logo + nav anchors + "Book Free Session" CTA, glass blur on scroll
- **Floating WhatsApp** bottom-right (constant `WHATSAPP_NUMBER`)
- **Multi-step lead form** modal (3 steps: goal → profile → contact) reused by Hero CTA, Assessment, Final CTA
- **Exit-intent modal** offering "Free AI Career Report" lead magnet (triggers on mouseleave to top)
- **Sticky mobile bottom bar** with primary CTA

## Hero Visual

SVG-based animated AI brain/orb with orbiting nodes labeled Careers / Automation / Startups / Coding / Analytics / Innovation. Framer Motion for orbit + pulse. No 3D library (keeps bundle lean, Worker-safe).

## File Structure

```
src/routes/index.tsx                 # composes sections, sets head() SEO
src/components/landing/
  Header.tsx, Footer.tsx
  Hero.tsx, AIBrainOrb.tsx
  VisitorSegmentation.tsx
  AssessmentFunnel.tsx
  WhyChoose.tsx
  SalaryDashboard.tsx
  LearningPaths.tsx
  LiveProjects.tsx
  SkillsGrid.tsx
  Mentors.tsx
  CareerServices.tsx
  HiringPartners.tsx
  StartupIncubation.tsx
  SuccessStories.tsx
  GlobalImpact.tsx
  Certifications.tsx
  UrgencyScholarships.tsx
  FAQ.tsx
  FinalCTA.tsx
  LeadFormModal.tsx
  ExitIntentModal.tsx
  FloatingWhatsApp.tsx
  StickyMobileCTA.tsx
  shared/ (GlassCard, GlowButton, SectionHeading, AnimatedCounter, ScrollReveal)
src/lib/landing/data.ts              # all copy/data (paths, projects, mentors, etc.)
src/lib/landing/config.ts            # WhatsApp number, Calendly URL constants
src/styles.css                       # token additions
src/routes/__root.tsx                # Google Fonts link
```

## SEO

`head()` on `/` with title, description, og:title/description/type=website, JSON-LD `EducationalOrganization` + `Course` schema, semantic HTML (`header/main/section/footer`, single H1), alt text on all imagery, lazy-load below-fold images, canonical `/`.

## Technical Notes

- Install `motion` and `recharts` via `bun add`
- All colors via semantic tokens — zero hardcoded hex in components
- All forms validated with Zod (length + format limits)
- `useReducedMotion` to disable parallax/orbit when requested
- Mobile-first; test breakpoints sm/md/lg/xl

## Out of Scope (v1, surface later if wanted)

- Real backend for lead capture (Lovable Cloud)
- Real Calendly embed (URL placeholder)
- Real WhatsApp Business number
- Authenticated dashboard / payment / enrollment processing
- Per-program sub-routes (can be added section-by-section after)

Ready to build on approval.