import { GlowButton } from "./shared/GlowButton";
import { useLeadModal } from "./shared/LeadContext";
export function StickyMobileCTA() {
  const { openLead } = useLeadModal();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[oklch(0.1_0.04_270)/0.85] p-3 backdrop-blur-xl md:hidden">
      <GlowButton className="w-full" onClick={() => openLead("mobile-sticky")}>
        Book Free Strategy Session
      </GlowButton>
    </div>
  );
}
