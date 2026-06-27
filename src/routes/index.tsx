import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { VisitorSegmentation } from "@/components/landing/VisitorSegmentation";
import { AssessmentFunnel } from "@/components/landing/AssessmentFunnel";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { SalaryDashboard } from "@/components/landing/SalaryDashboard";
import { LearningPaths } from "@/components/landing/LearningPaths";
import { LiveProjects } from "@/components/landing/LiveProjects";
import { SkillsGrid } from "@/components/landing/SkillsGrid";
import { Mentors } from "@/components/landing/Mentors";
import { CareerServices } from "@/components/landing/CareerServices";
import { GoogleReviews } from "@/components/landing/GoogleReviews";
import { HiringPartners } from "@/components/landing/HiringPartners";
import { StartupIncubation } from "@/components/landing/StartupIncubation";
import { SuccessStories } from "@/components/landing/SuccessStories";
import { GlobalImpact } from "@/components/landing/GlobalImpact";
import { Certifications } from "@/components/landing/Certifications";
import { UrgencyScholarships } from "@/components/landing/UrgencyScholarships";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LeadFormModal } from "@/components/landing/LeadFormModal";
import { ExitIntentModal } from "@/components/landing/ExitIntentModal";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { LeadModalProvider } from "@/components/landing/shared/LeadContext";
import { faqs, personas } from "@/lib/landing/data";

const TITLE = "CodexMattrix Academy™ — Build Your AI Career, Launch Your Startup";
const DESC =
  "AI Career Acceleration, Industry Training, Placement, Startup Incubation & Business Transformation. Master AI, ML, GenAI, Automation & Data Science with global mentors and live projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "CodexMattrix Academy",
          url: "https://codexmattrix.com",
          description: DESC,
          sameAs: ["https://linkedin.com/company/codexmattrix"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0].id);

  return (
    <LeadModalProvider
      render={(open, source, close, payload) => (
        <LeadFormModal open={open} onClose={close} source={source} payload={payload} />
      )}
    >
      <div className="relative min-h-screen overflow-x-clip">
        <Header />
        <main>
          <Hero />
          <VisitorSegmentation
            active={selectedPersona}
            onChange={setSelectedPersona}
          />
          <AssessmentFunnel profile={selectedPersona} />
          <WhyChoose />
          <SalaryDashboard />
          <LearningPaths />
          <LiveProjects />
          <SkillsGrid />
          <Mentors />
          <CareerServices />
          <GoogleReviews />
          <HiringPartners />
          <StartupIncubation />
          <SuccessStories />
          <GlobalImpact />
          <Certifications />
          <UrgencyScholarships />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <StickyMobileCTA />
        <ExitIntentModal />
      </div>
    </LeadModalProvider>
  );
}
