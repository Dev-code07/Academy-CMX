import { waLink } from "@/lib/landing/config";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-[oklch(0.7_0.18_150)] text-white shadow-[0_10px_40px_-5px_oklch(0.7_0.18_150/0.6)] transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[oklch(0.7_0.18_150)] opacity-40 blur-xl group-hover:opacity-70" />
      <MessageCircle className="size-7" />
    </a>
  );
}
