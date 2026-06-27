import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GlowButton } from "./shared/GlowButton";
import { useLeadModal } from "./shared/LeadContext";
import { Gift } from "lucide-react";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const { openLead } = useLeadModal();

  useEffect(() => {
    if (shown) return;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setOpen(true);
        setShown(true);
      }
    };
    const onScroll = () => {
      if (window.scrollY > 1500 && !shown) {
        setOpen(true);
        setShown(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [shown]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        
        className="max-w-lg glass-strong border-white/10 bg-[oklch(0.14_0.04_270)/0.96] p-0"
      >
        <DialogTitle className="sr-only">Free AI Career Report</DialogTitle>
        <div className="relative overflow-hidden rounded-2xl p-8 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-glow opacity-10" />
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-gradient-primary shadow-glow">
            <Gift className="size-7" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Wait — grab your free AI Career Report</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A personalised 12-page roadmap with salary benchmarks, skill priorities, and a 90-day plan tailored to your goals.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <GlowButton
              size="lg"
              onClick={() => {
                setOpen(false);
                openLead("exit-intent");
              }}
            >
              Send me the report
            </GlowButton>
            <GlowButton size="lg" variant="ghost" onClick={() => setOpen(false)}>
              No thanks
            </GlowButton>
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Used by 1,000+ professionals to make their next career move.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
