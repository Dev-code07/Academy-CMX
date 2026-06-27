export const SITE = {
  name: "CodexMattrix Academy",
  brand: "CodexMattrix",
  tagline: "AI Career Acceleration Platform",
  domain: "codexmattrix.com",
  whatsapp: "+91 98056 04541", // TODO: replace with real WhatsApp Business number
  whatsappMessage: "Hi! I'd like to learn more about CodexMattrix Academy programs.",
  calendlyUrl: "https://calendly.com/codexmattrix/strategy", // TODO: replace
  email: "rahul.codexmatrix@gmail.com",
};

export const waLink = () =>
  `https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(SITE.whatsappMessage)}`;
