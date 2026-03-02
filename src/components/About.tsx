"use client";

import ScrollReveal from "./ScrollReveal";
import CaseStudies from "./CaseStudies";

const aiStackTools = [
  { name: "Claude Code", logo: "https://cdn.simpleicons.org/anthropic/ffffff" },
  { name: "Gemini",      logo: "https://cdn.simpleicons.org/googlegemini/ffffff" },
  { name: "Cursor",      logo: "https://www.cursor.com/favicon.ico" },
  { name: "Linear",      logo: "https://cdn.simpleicons.org/linear/ffffff" },
  { name: "Jira",        logo: "https://cdn.simpleicons.org/jira/ffffff" },
  { name: "Figma",       logo: "https://cdn.simpleicons.org/figma/ffffff" },
  { name: "Notion",      logo: "https://cdn.simpleicons.org/notion/ffffff" },
  { name: "Vercel",      logo: "https://cdn.simpleicons.org/vercel/ffffff" },
];

export default function About() {
  return (
    <section
      id="about"
      className="px-6 py-16 sm:px-8 sm:py-24 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2
            className="text-5xl font-bold text-[var(--text-dim)] sm:text-6xl md:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About
          </h2>
        </ScrollReveal>

        {/* Big intro text */}
        <ScrollReveal delay={0.1}>
          <p
            className="mt-12 max-w-3xl text-xl font-medium leading-snug text-[var(--text-primary)] sm:text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            I don&apos;t build products and then find users for them. I find the
            problems first, then build.
          </p>
        </ScrollReveal>

        {/* Secondary bio */}
        <ScrollReveal delay={0.2}>
          <div
            className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
          >
            <p>
              That instinct began as a founder, building two businesses to
              $1.2M+ revenue without a playbook. Every decision had to be
              validated, every feature earned. I became a Senior Product Manager,
              but I never stopped thinking like a founder.
            </p>
            <p>
              Over the past 10+ years, I&apos;ve defined product strategy and
              scaled AI-native and fintech platforms to $20M+ ARR across six
              global markets. I&apos;ve shipped production-grade Generative AI
              and LLM-powered systems that drove 2.1x traffic growth, $2M+
              incremental revenue, and 60% cost reduction through
              evaluation-driven model optimization.
            </p>
            <p>
              On the fintech side, I&apos;ve launched digital payments platforms
              to $1M+ monthly transaction volume within 25 days, integrated
              directly with banks and payment processors, owned RBI compliance,
              and designed fraud detection and risk frameworks from scratch.
            </p>
          </div>
        </ScrollReveal>

        {/* Case Studies */}
        <ScrollReveal delay={0.15}>
          <CaseStudies />
        </ScrollReveal>

        {/* AI Stack */}
        <ScrollReveal delay={0.15}>
          <div className="mt-16">
            <h3
              className="mb-8 text-5xl font-bold text-[var(--text-dim)] sm:text-6xl md:text-8xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              My AI Stack
            </h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {aiStackTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-4 transition-all duration-200 hover:scale-[1.02] hover:border-[var(--accent)]/30 hover:bg-[var(--bg-elevated)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-elevated)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <span
                    className="text-sm font-semibold text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
