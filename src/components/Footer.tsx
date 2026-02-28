"use client";

import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="px-6 pb-8 pt-10 sm:px-8 sm:pb-12 sm:pt-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <nav
            className="flex gap-8 text-sm text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <a
              href="mailto:sahil.sg.1991@gmail.com"
              data-hoverable
              className="transition-colors hover:text-[var(--accent)]"
            >
              email
            </a>
            <a
              href="https://linkedin.com/in/sahilgupta-41a3b6113"
              target="_blank"
              rel="noopener noreferrer"
              data-hoverable
              className="transition-colors hover:text-[var(--accent)]"
            >
              linkedin
            </a>
          </nav>
        </ScrollReveal>

        <p
          className="mt-6 text-center text-xs text-[var(--text-dim)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Thought and Crafted by Sahil Gupta. Engineered with Claude Code.
        </p>
      </div>
    </footer>
  );
}
