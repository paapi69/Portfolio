"use client";

import { useRef, useState, useEffect } from "react";

interface CaseStudy {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  tag: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "seo-engine",
    eyebrow: "AI · Builder.ai",
    title: "Generative AI SEO Engine",
    description:
      "RAG-based multimodal pipeline that drove 2.1x organic traffic growth and $2M+ incremental revenue across 6 global markets.",
    href: "https://gamma.app/docs/Generative-AI-SEO-Engine-6yqlz59djd9kmwo",
    gradientFrom: "#071a10",
    gradientTo: "#0d1520",
    accent: "#00e5a0",
    tag: "Case Study",
  },
  {
    id: "magic-upload",
    eyebrow: "AI · Builder.ai",
    title: "Magic Upload",
    description:
      "Multimodal AI-powered inventory automation for e-commerce — 500K+ uploads at 94% accuracy, cutting manual effort by 60%.",
    href: "https://gamma.app/docs/Magic-Upload-4s3sh72jde8nwj2",
    gradientFrom: "#0d0d1a",
    gradientTo: "#1a0d2e",
    accent: "#a78bfa",
    tag: "Case Study",
  },
];

export default function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const SCROLL_AMOUNT = 400;

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-16">
      {/* Section header + Apple-style arrow buttons */}
      <div className="mb-8 flex items-end justify-between">
        <h3
          className="text-5xl font-bold text-[var(--text-dim)] sm:text-6xl md:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Case Studies
        </h3>

        {/* Circular scroll arrows — hidden on mobile */}
        <div className="hidden shrink-0 items-center gap-2 pb-2 sm:flex">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-lg text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-25"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-lg text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-25"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal scroll shelf */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   snap-x snap-mandatory"
      >
        {caseStudies.map((card) => (
          <a
            key={card.id}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-[85vw] flex-shrink-0 snap-start overflow-hidden rounded-3xl
                       border border-[var(--border)] bg-[var(--bg-secondary)]
                       transition-transform duration-300 hover:scale-[1.02]
                       sm:w-[360px]"
          >
            {/* Visual header — gradient + glow */}
            <div
              className="relative h-52 w-full overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
              }}
            >
              {/* Ambient glow orb */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 25% 60%, ${card.accent}40 0%, transparent 65%)`,
                }}
              />
              {/* Secondary glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 75% 30%, ${card.accent}18 0%, transparent 55%)`,
                }}
              />
              {/* Faint grid lines */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(${card.accent} 1px, transparent 1px), linear-gradient(90deg, ${card.accent} 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Tag badge */}
              <span
                className="absolute left-5 top-5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{
                  borderColor: `${card.accent}40`,
                  color: card.accent,
                  background: `${card.accent}12`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {card.tag}
              </span>

              {/* Arrow hint on hover */}
              <span
                className="absolute right-5 top-5 text-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: card.accent }}
              >
                ↗
              </span>
            </div>

            {/* Content area */}
            <div className="p-5">
              <p
                className="mb-2 text-xs uppercase tracking-widest"
                style={{
                  color: card.accent,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {card.eyebrow}
              </p>
              <h4
                className="mb-2 text-xl font-bold leading-snug text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {card.title}
              </h4>
              <p
                className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {card.description}
              </p>
              <span
                className="text-sm font-semibold transition-all duration-200 group-hover:underline"
                style={{ color: card.accent, fontFamily: "var(--font-body)" }}
              >
                View case study →
              </span>
            </div>
          </a>
        ))}

        {/* Coming soon placeholder card */}
        <div
          className="flex w-[85vw] flex-shrink-0 snap-start flex-col items-center
                     justify-center gap-3 rounded-3xl border border-dashed
                     border-[var(--border)] bg-[var(--bg-secondary)]/50 p-10 sm:w-[360px]"
        >
          <span className="text-3xl opacity-40">＋</span>
          <p
            className="text-center text-sm text-[var(--text-dim)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            More case studies coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
