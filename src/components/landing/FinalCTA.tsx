import { GlowButton } from "./shared/GlowButton";
import { useLeadModal } from "./shared/LeadContext";
import { ShieldCheck, Users, Headphones, Globe } from "lucide-react";
export function FinalCTA() {
  const { openLead } = useLeadModal();
  return (
    <section className="relative py-12 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] border border-white/15 p-10 sm:p-16">
          <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-25" />
          <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-30" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
          <div className="pointer-events-none absolute -left-32 -top-32 -z-10 size-[420px] rounded-full bg-[color:var(--accent)] opacity-30 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 -bottom-32 -z-10 size-[420px] rounded-full bg-secondary opacity-40 blur-[120px]" />
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Your future in AI <br className="hidden sm:block" />
              <span className="text-gradient">starts here.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              Join ambitious learners, professionals, founders and innovators building the next generation of careers and businesses.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GlowButton size="lg" onClick={() => openLead("final-apply")}>
                Apply Now
              </GlowButton>
              <GlowButton size="lg" variant="outline" onClick={() => openLead("final-consult")}>
                Book Free Consultation
              </GlowButton>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              {[
                { i: <ShieldCheck className="size-4" />, t: "Secure Application" },
                { i: <Users className="size-4" />, t: "Industry Mentors" },
                { i: <Headphones className="size-4" />, t: "Career Support" },
                { i: <Globe className="size-4" />, t: "Global Community" },
              ].map((x) => (
                <div key={x.t} className="glass flex items-center justify-center gap-2 rounded-full px-3 py-2 text-muted-foreground">
                  <span className="text-[color:var(--accent)]">{x.i}</span>
                  {x.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
