"use client";

import ScrollReveal from "./ScrollReveal";
import WorkItem from "./WorkItem";

const projects = [
  {
    name: "Builder.ai — No-Code Studio Store",
    role: "Senior Product Manager",
    period: "Mar 2022 – Jun 2025",
    companyType: "Series D, $450M+ raised",
    oneLiner:
      "Led the AI/LLM product portfolio for Builder.ai's No-Code platform, scaling production-grade GenAI systems to $20M ARR across 6 global markets.",
    metrics: [
      { value: "$20M", label: "ARR from $0" },
      { value: "6", label: "Global Markets" },
      { value: "500K+", label: "Automated Uploads" },
      { value: "60%", label: "LLM Cost Reduction" },
    ],
    tags: ["GPT-4 Vision", "RAG", "LLM Optimization", "A/B Testing", "Mixpanel"],
    highlight:
      '"Magic Upload" — agentic multimodal AI pipeline: 500K uploads at 94% accuracy. RAG-based SEO system driving 2.1x organic traffic.',
  },
  {
    name: "Fyp — Neo Banking Platform",
    role: "Senior Product Manager",
    period: "Jun 2021 – Apr 2022",
    companyType: "Series A Fintech",
    oneLiner:
      "Architected payments infrastructure and fraud detection, scaling 0 → 100K users in 25 days.",
    metrics: [
      { value: "100K", label: "Users in 25 Days" },
      { value: "$1M+", label: "Monthly Txn Volume" },
      { value: "45%", label: "Fraud Reduction" },
      { value: "$150K+", label: "Annual Savings" },
    ],
    tags: ["Payments", "Fraud Detection", "RBI Compliance", "Real-time Systems"],
  },
  {
    name: "FamPay — Teen Fintech",
    role: "Product Consultant, Founder's Office",
    period: "Oct 2020 – Jun 2021",
    companyType: "Series A Fintech",
    oneLiner:
      "Spearheaded growth to $12M+ revenue and 500K MAU through viral loops and gamification.",
    metrics: [
      { value: "$12M+", label: "Revenue in 6 Months" },
      { value: "500K", label: "MAU" },
      { value: "1M+", label: "App Downloads" },
      { value: "65%", label: "CAC Reduction" },
    ],
    tags: ["Growth", "Gamification", "Referral Mechanics", "GTM Strategy"],
  },
  {
    name: "The Founder Chapter",
    role: "Founder",
    period: "2013 – 2020",
    companyType: "Bootstrapped",
    oneLiner:
      "Two ventures. Built from scratch. From artist marketplaces with Amazon and Google as clients to travel platforms with 150+ vendors.",
    metrics: [
      { value: "$1.2M+", label: "Combined Revenue" },
      { value: "150K+", label: "Sales" },
      { value: "150+", label: "Vendors" },
      { value: "35%", label: "Repeat Rate" },
    ],
    tags: ["Marketplace", "Bootstrapped", "0-to-1", "B2B"],
    isFounderCard: true,
    subProjects: [
      {
        name: "DiscovrIt (Co-Founder, 2018–2020)",
        detail:
          "Travel marketplace — $700K revenue, 150+ vendors, 35% repeat rate.",
      },
      {
        name: "Block 5 (Founder, 2013–2018)",
        detail:
          "Artist marketplace — $500K+ revenue, 150K+ sales. B2B clients: Amazon, Google, Pizza Hut.",
      },
    ],
  },
];

export default function Works() {
  return (
    <section id="work" className="px-6 py-16 sm:px-8 sm:py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2
            className="text-5xl font-bold text-[var(--text-dim)] sm:text-6xl md:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            className="mt-8 max-w-2xl text-lg text-[var(--text-primary)] sm:text-xl md:text-2xl"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.5 }}
          >
            Things I&apos;ve built and scaled over the past decade.
          </p>
        </ScrollReveal>

        <div className="mt-10 sm:mt-16">
          {projects.map((project, i) => (
            <WorkItem key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
