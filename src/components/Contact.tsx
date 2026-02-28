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
    href: "https://linkedin.com/in/sahilgupta-41a3b6113",
    display: "linkedin.com/in/sahilgupta",
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
      className="px-6 py-16 sm:px-8 sm:py-24 md:px-16 lg:px-24"
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
          <p
            className="mt-12 max-w-2xl text-xl font-medium leading-snug text-[var(--text-primary)] sm:text-2xl md:text-3xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Open to Senior PM / Lead PM roles in AI, GenAI, fintech, and SaaS.
            Let&apos;s build something.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p
            className="mt-4 max-w-2xl text-base text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-body)", lineHeight: 1.7 }}
          >
            Open to India, UK, and UAE (visa sponsorship welcome). Best way to
            reach me: email.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
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
