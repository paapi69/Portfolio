"use client";

import ScrollReveal from "./ScrollReveal";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:sahil.sg.1991@gmail.com",
    display: "sahil.sg.1991@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahil-gupta-41a3b6113/",
    display: "linkedin.com/in/sahil-gupta",
    external: true,
  },
  {
    label: "Phone",
    href: "tel:9971107229",
    display: "+91 99711 07229",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-24 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <h2
            className="text-5xl font-bold text-[var(--text-dim)] sm:text-6xl md:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 max-w-lg">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                data-hoverable
                className="group flex items-center justify-between border-b border-[var(--border)] py-4 transition-colors"
              >
                <span
                  className="text-base font-medium text-[var(--text-primary)] sm:text-lg"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </span>
                <span
                  className="text-sm text-[var(--text-secondary)] transition-colors group-hover:text-[var(--accent)] sm:text-base"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {link.display} &#8599;
                </span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
