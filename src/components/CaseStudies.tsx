"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CaseStudyItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  accent: string;
}

const BASE: CaseStudyItem[] = [
  {
    id: "seo-engine",
    eyebrow: "AI · Builder.ai",
    title: "Generative AI SEO Engine",
    description:
      "RAG-based multimodal pipeline that drove 2.1× organic traffic growth and $2M+ incremental revenue across 6 global markets.",
    href: "https://gamma.app/docs/Generative-AI-SEO-Engine-6yqlz59djd9kmwo",
    accent: "#00e5a0",
  },
  {
    id: "magic-upload",
    eyebrow: "AI · Builder.ai",
    title: "Magic Upload",
    description:
      "Multimodal AI-powered inventory automation for e-commerce — 500K+ uploads at 94% accuracy, cutting manual effort by 60%.",
    href: "https://gamma.app/docs/Magic-Upload-4s3sh72jde8nwj2",
    accent: "#a78bfa",
  },
];

const SLOTS = [-2, -1, 0, 1, 2];
const THROTTLE_MS = 500;

type SlotKey = -2 | -1 | 0 | 1 | 2;
const SLOT_STYLE: Record<SlotKey, { scale: number; opacity: number; showDetail: boolean }> = {
  "-2": { scale: 0.38, opacity: 0.12, showDetail: false },
  "-1": { scale: 0.62, opacity: 0.35, showDetail: false },
  0: { scale: 1, opacity: 1, showDetail: true },
  1: { scale: 0.62, opacity: 0.35, showDetail: false },
  2: { scale: 0.38, opacity: 0.12, showDetail: false },
};

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheel = useRef(0);
  const touchStart = useRef(0);

  // Wheel → advance by ±1, throttled
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < THROTTLE_MS) return;
      lastWheel.current = now;
      setActiveIndex((i) => i + (e.deltaY > 0 ? 1 : -1));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch swipe → same on mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      setActiveIndex((i) => i + (delta > 0 ? 1 : -1));
    }
  };

  const activeDot = ((activeIndex % BASE.length) + BASE.length) % BASE.length;

  return (
    <div className="mt-16">
      {/* Section heading */}
      <h3
        className="mb-12 text-5xl font-bold text-[var(--text-dim)] sm:text-6xl md:text-8xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Case Studies
      </h3>

      {/* Carousel */}
      <div
        ref={containerRef}
        data-lenis-prevent
        className="relative flex h-72 items-center justify-center overflow-hidden sm:h-80"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {SLOTS.map((offset) => {
          const slotKey = offset as SlotKey;
          const itemIndex =
            ((activeIndex + offset) % BASE.length + BASE.length) % BASE.length;
          const item = BASE[itemIndex];
          const { scale, opacity, showDetail } = SLOT_STYLE[slotKey];
          const xVw = offset * 44;

          return (
            <motion.div
              key={`slot-${offset}`}
              className="absolute flex flex-col items-center text-center"
              style={{ width: "min(440px, 85vw)" }}
              animate={{ x: `${xVw}vw`, scale, opacity }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              {/* Eyebrow */}
              <p
                className="mb-2 text-[10px] uppercase tracking-widest sm:text-xs"
                style={{ color: item.accent, fontFamily: "var(--font-mono)" }}
              >
                {item.eyebrow}
              </p>

              {/* Title */}
              <h4
                className="mb-3 text-2xl font-bold leading-tight text-[var(--text-primary)] sm:text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </h4>

              {/* Description + CTA — center only */}
              {showDetail && (
                <>
                  <p
                    className="mb-5 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold transition-all duration-200 hover:underline"
                    style={{ color: item.accent, fontFamily: "var(--font-body)" }}
                  >
                    View case study →
                  </a>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {BASE.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to ${item.title}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: activeDot === i ? 24 : 8,
              background: activeDot === i ? item.accent : "var(--text-dim)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
