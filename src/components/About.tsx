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
      className="px-6 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-24 md:px-16 lg:px-24"
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
            I&apos;ve had a bit of an unconventional path into product
            management, and I think that&apos;s what makes it work.
          </p>
        </ScrollReveal>

        {/* Secondary bio */}
        <ScrollReveal delay={0.2}>
          <div
            className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
          >
            <p>
              I started as a founder. Spent seven years building two businesses
              from scratch without much of a playbook. An artist marketplace and
              a travel platform, both bootstrapped, both profitable, neither
              world-changing. But those years gave me something most PM roles
              don&apos;t: the instinct to question whether something should be
              built at all before figuring out how to build it.
            </p>

            {/* Pull-quote */}
            <blockquote
              className="border-l-2 border-[var(--accent)] pl-6 text-lg italic text-[var(--text-primary)] sm:text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;I went from building my own products to helping others build
              theirs, and the founder lens never really went away.&rdquo;
            </blockquote>

            <p>
              From there I moved into product management across fintech and AI.
              At Fyp, I built payments and fraud systems for a neo-bank from
              zero. At FamPay, I helped crack the growth equation for teen
              fintech. At Builder.ai, I led the Studio Store vertical, a no-code
              platform for SMBs, and shipped generative AI systems across six
              markets. Learned a lot about what it takes to make LLMs work in
              production, not just in demos.
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
              AI Stack
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
