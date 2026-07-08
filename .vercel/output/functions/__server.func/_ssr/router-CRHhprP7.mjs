import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-lMoposOf.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a0b1f" },
      { property: "og:site_name", content: "CodexMattrix Academy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@codexmattrix" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$1.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const trustStats = [
  { value: "1000+", label: "Learners" },
  { value: "500+", label: "Industry Projects" },
  { value: "100+", label: "Hiring Partners" },
  { value: "30+", label: "Countries" }
];
const personas = [
  { id: "student", title: "Student", desc: "Land internships & first AI role.", outcome: "Job-ready in 6 months", path: "AI Engineering → Internship → Placement" },
  { id: "professional", title: "Working Professional", desc: "Upskill into AI & 2x your salary.", outcome: "Avg 70% salary jump", path: "Generative AI → Lead role → Senior IC" },
  { id: "freelancer", title: "Freelancer", desc: "Launch an AI service & scale globally.", outcome: "$5k–$20k MRR", path: "Agentic AI → Productize → Scale clients" },
  { id: "entrepreneur", title: "Entrepreneur", desc: "Build an AI startup with mentorship.", outcome: "MVP in 90 days", path: "Validation → MVP → GTM → Investors" },
  { id: "agency", title: "Agency Owner", desc: "Automate ops, add AI to your stack.", outcome: "3x team output", path: "Automation → Productized services" },
  { id: "switcher", title: "Career Switcher", desc: "Transition into a high-growth AI role.", outcome: "Switch in 9 months", path: "Foundations → Project portfolio → Placement" }
];
const whyCards = [
  { title: "AI-First Curriculum", desc: "Built for 2026's industry, not 2010's textbooks.", icon: "Brain" },
  { title: "Industry Mentors", desc: "1:1 access to engineers from FAANG & top AI startups.", icon: "Users" },
  { title: "Live Projects", desc: "Ship real solutions for real companies — not toy demos.", icon: "Rocket" },
  { title: "Placement Assistance", desc: "Dedicated career team, referrals & interview prep.", icon: "Briefcase" },
  { title: "Global Certifications", desc: "Recognized credentials respected across 30+ countries.", icon: "Award" },
  { title: "Startup Incubation", desc: "Validate, build, and launch your own AI venture.", icon: "Lightbulb" },
  { title: "Business Automation", desc: "Master the workflows top agencies charge $10k+ for.", icon: "Cog" },
  { title: "Lifetime Community", desc: "Forever access to alumni, jobs, and curriculum updates.", icon: "Globe" }
];
const salaryRoles = [
  { role: "AI Engineer", avg: 165, growth: 74, outlook: "Explosive" },
  { role: "ML Engineer", avg: 158, growth: 62, outlook: "Very High" },
  { role: "Prompt Engineer", avg: 138, growth: 92, outlook: "Explosive" },
  { role: "AI Consultant", avg: 175, growth: 58, outlook: "Very High" },
  { role: "Data Scientist", avg: 145, growth: 41, outlook: "High" },
  { role: "Automation Architect", avg: 152, growth: 67, outlook: "Very High" },
  { role: "AI Product Manager", avg: 185, growth: 53, outlook: "Very High" },
  { role: "Growth Analyst", avg: 122, growth: 38, outlook: "High" }
];
const learningPaths = [
  { title: "AI Engineering", duration: "6 mo", level: "Intermediate", tools: ["Python", "PyTorch", "LangChain"], outcome: "AI Engineer", salary: "$120k–$220k" },
  { title: "Machine Learning", duration: "5 mo", level: "Intermediate", tools: ["Scikit", "TensorFlow", "MLflow"], outcome: "ML Engineer", salary: "$110k–$200k" },
  { title: "Generative AI", duration: "4 mo", level: "Beginner+", tools: ["OpenAI", "Claude", "Gemini"], outcome: "GenAI Specialist", salary: "$100k–$190k" },
  { title: "Agentic AI", duration: "4 mo", level: "Advanced", tools: ["CrewAI", "MCP", "LangGraph"], outcome: "Agent Architect", salary: "$140k–$240k" },
  { title: "Prompt Engineering", duration: "2 mo", level: "Beginner", tools: ["GPT", "Claude", "Eval frameworks"], outcome: "Prompt Engineer", salary: "$90k–$170k" },
  { title: "Full Stack Development", duration: "6 mo", level: "Beginner+", tools: ["React", "Node", "TanStack"], outcome: "Full Stack Dev", salary: "$80k–$160k" },
  { title: "Data Science", duration: "5 mo", level: "Intermediate", tools: ["Python", "SQL", "Pandas"], outcome: "Data Scientist", salary: "$100k–$180k" },
  { title: "Cyber Security", duration: "5 mo", level: "Intermediate", tools: ["Burp", "Wireshark", "SIEM"], outcome: "Security Engineer", salary: "$110k–$190k" },
  { title: "Cloud Engineering", duration: "4 mo", level: "Intermediate", tools: ["AWS", "GCP", "Terraform"], outcome: "Cloud Engineer", salary: "$120k–$200k" },
  { title: "Digital Marketing", duration: "3 mo", level: "Beginner", tools: ["GA4", "Meta", "SEO"], outcome: "Marketing Lead", salary: "$70k–$140k" },
  { title: "Growth Marketing", duration: "3 mo", level: "Intermediate", tools: ["Mixpanel", "HubSpot", "Webflow"], outcome: "Growth Manager", salary: "$90k–$160k" },
  { title: "Business Intelligence", duration: "4 mo", level: "Intermediate", tools: ["Power BI", "Tableau", "SQL"], outcome: "BI Analyst", salary: "$85k–$150k" },
  { title: "Automation Consulting", duration: "3 mo", level: "Beginner+", tools: ["n8n", "Make", "Zapier"], outcome: "Automation Consultant", salary: "$80k–$180k" },
  { title: "Startup Builder", duration: "6 mo", level: "All levels", tools: ["Lovable", "Stripe", "HubSpot"], outcome: "Founder", salary: "Equity + MRR" }
];
const liveProjects = [
  { title: "AI Travel Booking Assistant", industry: "Travel", problem: "Manual itinerary planning", tools: "GPT-4o + LangGraph", impact: "8x faster bookings", value: "Showcase agentic flow" },
  { title: "Healthcare AI Assistant", industry: "Healthcare", problem: "Patient triage backlog", tools: "Claude + RAG", impact: "60% reduced wait", value: "HIPAA-aware design" },
  { title: "AI Lead Generation Platform", industry: "SaaS", problem: "Cold outreach inefficiency", tools: "Python + Clay", impact: "3.2x reply rate", value: "Full-stack GTM build" },
  { title: "Recruitment Automation System", industry: "HR Tech", problem: "Resume screening at scale", tools: "LangChain + Pinecone", impact: "92% screen accuracy", value: "Vector + agent orchestration" },
  { title: "Voice AI Agent", industry: "Telecom", problem: "24/7 inbound support cost", tools: "Vapi + GPT-Realtime", impact: "70% cost reduction", value: "Real-time voice infra" },
  { title: "Customer Support AI", industry: "E-commerce", problem: "Ticket deflection", tools: "Claude + RAG + Zendesk", impact: "55% deflection", value: "Production-grade RAG" },
  { title: "Financial Analytics Dashboard", industry: "Finance", problem: "Real-time portfolio insight", tools: "Python + Recharts", impact: "Live insights", value: "Data viz + ETL" },
  { title: "E-Commerce Recommender", industry: "Retail", problem: "Low AOV from generic promos", tools: "Vector DB + GPT", impact: "+27% AOV", value: "Personalization engine" }
];
const skills = [
  "Python",
  "Machine Learning",
  "Deep Learning",
  "OpenAI APIs",
  "Claude APIs",
  "LangChain",
  "CrewAI",
  "MCP",
  "AI Agents",
  "RAG Systems",
  "Vector Databases",
  "Automation",
  "Power BI",
  "SQL",
  "Analytics",
  "Cloud",
  "Business Intelligence",
  "Marketing Automation",
  "CRM Systems",
  "Prompt Engineering"
];
const mentors = [
  { name: "Dr. Aanya Verma", role: "Principal AI Engineer", exp: "12 yrs", focus: "LLM Systems & RAG", initials: "AV" },
  { name: "Marcus Chen", role: "Founding ML Engineer", exp: "10 yrs", focus: "ML Infra & MLOps", initials: "MC" },
  { name: "Priya Raghunathan", role: "Head of Data Science", exp: "11 yrs", focus: "Causal AI & Forecasting", initials: "PR" },
  { name: "James O'Connell", role: "AI Product Director", exp: "14 yrs", focus: "Agentic Product", initials: "JO" },
  { name: "Sofia Reyes", role: "Automation Architect", exp: "9 yrs", focus: "n8n / Make at scale", initials: "SR" },
  { name: "Daniel Park", role: "Growth & GTM Advisor", exp: "13 yrs", focus: "0→1 AI startups", initials: "DP" }
];
const careerServices = [
  "Resume Building",
  "LinkedIn Optimization",
  "Portfolio Development",
  "Interview Preparation",
  "Mock Interviews",
  "Career Coaching",
  "Networking Support",
  "Personal Branding",
  "Job Referrals",
  "Application Tracking"
];
const hiringPartners = [
  "Technology",
  "Healthcare",
  "Finance",
  "Travel",
  "E-Commerce",
  "SaaS",
  "Agencies",
  "AI Startups"
];
const incubationTracks = [
  { title: "AI Agency", desc: "Sell AI implementation to mid-market clients." },
  { title: "Automation Consultancy", desc: "Build recurring revenue automating ops." },
  { title: "AI SaaS", desc: "Productize a vertical AI workflow." },
  { title: "Lead Generation", desc: "Outbound + AI = predictable pipeline." },
  { title: "Growth Agency", desc: "AI-augmented performance marketing." },
  { title: "Product Startup", desc: "From idea to investor-ready in 6 months." }
];
const incubationFeatures = [
  "Idea Validation",
  "MVP Development",
  "Go-To-Market Strategy",
  "Sales Systems",
  "Automation Setup",
  "Investor Readiness"
];
const stories = [
  { name: "Rahul S.", role: "Software Eng → AI Engineer", before: "$48k", after: "$135k", quote: "I went from manual QA to building production RAG systems at a Series B." },
  { name: "Maya K.", role: "Marketer → Automation Consultant", before: "$32k", after: "$11k MRR", quote: "Productized my service in 90 days. Two retainers paid for the whole program." },
  { name: "Daniel A.", role: "Student → AI Intern @ Fintech", before: "Job hunting", after: "$72k offer", quote: "The portfolio projects were the only thing recruiters wanted to talk about." },
  { name: "Lena M.", role: "Founder, AI SaaS", before: "Idea", after: "$8k MRR + seed", quote: "From validation to seed-ready in 6 months. My mentor was worth the entire fee." }
];
const globalCountries = [
  { code: "USA", students: 1240, x: 18, y: 38 },
  { code: "Canada", students: 320, x: 20, y: 26 },
  { code: "UK", students: 480, x: 47, y: 33 },
  { code: "Germany", students: 360, x: 51, y: 36 },
  { code: "UAE", students: 410, x: 60, y: 47 },
  { code: "India", students: 2100, x: 68, y: 50 },
  { code: "Singapore", students: 240, x: 76, y: 60 },
  { code: "Australia", students: 380, x: 84, y: 78 }
];
const certifications = [
  { cat: "AI Certifications", items: ["Applied GenAI", "Agentic AI Architect"] },
  { cat: "Project Certifications", items: ["Capstone Build", "Industry Project"] },
  { cat: "Career Certifications", items: ["Career-Ready Engineer", "Placement Verified"] },
  { cat: "Business Certifications", items: ["Automation Pro", "BI Specialist"] },
  { cat: "Startup Certifications", items: ["Validated Founder", "MVP Builder"] }
];
const faqs = [
  { q: "Who can join CodexMattrix Academy?", a: "Students, professionals, freelancers, agency owners, founders — anyone serious about building an AI-driven career or business. We have tracks for every level." },
  { q: "Do I need coding experience?", a: "No. Several tracks (Prompt Engineering, Automation, GenAI) are designed for non-coders. Coding-heavy paths include a foundation module." },
  { q: "Will I receive a certification?", a: "Yes — every program ends with an industry-recognized CodexMattrix certificate, plus stackable specialization credentials." },
  { q: "Will I get placement support?", a: "Yes. Dedicated career managers, resume + LinkedIn rebuild, mock interviews, and direct referrals to 100+ hiring partners." },
  { q: "How long are the programs?", a: "From 2 to 6 months depending on the track. Most learners study 8–12 hours per week with live + recorded sessions." },
  { q: "Can I learn while working full-time?", a: "Yes. Sessions are evening/weekend and fully recorded. 70% of our learners study while employed." },
  { q: "Do you support startup founders?", a: "Yes — our Startup Incubation track takes you from validation to MVP to GTM with mentor + investor access." }
];
const assessmentQuestions = [
  {
    id: "skill",
    q: "Your current skill level",
    options: ["Complete beginner", "Some basics", "Intermediate", "Advanced"]
  },
  {
    id: "salary",
    q: "Your current annual income (USD)",
    options: ["< $20k", "$20k–$50k", "$50k–$100k", "$100k+"]
  },
  {
    id: "goal",
    q: "Your primary goal",
    options: ["Land a job", "2x my salary", "Launch a startup", "Build an agency"]
  },
  {
    id: "industry",
    q: "Industry you want to work in",
    options: ["Tech / SaaS", "Finance", "Healthcare", "E-commerce", "Open to any"]
  },
  {
    id: "experience",
    q: "Years of work experience",
    options: ["0", "1–3", "4–7", "8+"]
  }
];
const $$splitComponentImporter = () => import("./index-C6--uYqV.mjs");
const TITLE = "CodexMattrix Academy™ — Build Your AI Career, Launch Your Startup";
const DESC = "AI Career Acceleration, Industry Training, Placement, Startup Incubation & Business Transformation. Master AI, ML, GenAI, Automation & Data Science with global mentors and live projects.";
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: TITLE
    }, {
      name: "description",
      content: DESC
    }, {
      property: "og:title",
      content: TITLE
    }, {
      property: "og:description",
      content: DESC
    }, {
      property: "og:url",
      content: "/"
    }, {
      name: "twitter:title",
      content: TITLE
    }, {
      name: "twitter:description",
      content: DESC
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "CodexMattrix Academy",
        url: "https://codexmattrix.com",
        description: DESC,
        sameAs: ["https://linkedin.com/company/codexmattrix"]
      })
    }, {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a
          }
        }))
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  assessmentQuestions as a,
  liveProjects as b,
  skills as c,
  careerServices as d,
  incubationFeatures as e,
  stories as f,
  globalCountries as g,
  hiringPartners as h,
  incubationTracks as i,
  certifications as j,
  faqs as k,
  learningPaths as l,
  mentors as m,
  personas as p,
  router as r,
  salaryRoles as s,
  trustStats as t,
  whyCards as w
};
