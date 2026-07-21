import { SITE } from "@/lib/landing/config";
export function Footer() {
  const cols = [
    {
      h: "Programs",
      items: ["AI Engineering", "Generative AI", "Agentic AI", "Data Science", "Full Stack"],
    },
    {
      h: "Outcomes",
      items: ["Placement", "Startup Incubation", "Mentors", "Certifications"],
    },
    {
      h: "Company",
      items: ["About", "Careers", "Press", "Contact"],
    },
    {
      h: "Resources",
      items: ["Blog", "Guides", "Free AI Report", "Community"],
    },
  ];
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4">
        {/* <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-primary text-sm font-bold shadow-glow">
                CM
              </span>
              <span className="font-display text-base font-bold tracking-tight">
                {SITE.brand} <span className="text-xs text-muted-foreground">Academy™</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The global destination for AI careers, automation expertise, and startup incubation.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">{SITE.email}</p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="text-sm font-semibold">{c.h}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.brand} Academy™. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">{SITE.domain}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
