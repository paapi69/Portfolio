"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudyCard, type CaseStudyItem } from "@/components/ui/case-study-card";

const BASE: CaseStudyItem[] = [
  {
    id: "seo-engine",
    eyebrow: "AI · Builder.ai",
    title: "Generative AI SEO Engine",
    description:
      "RAG-based multimodal pipeline that drove 2.1× organic traffic growth and $2M+ incremental revenue across 6 global markets.",
    href: "https://gamma.app/docs/Generative-AI-SEO-Engine-6yqlz59djd9kmwo",
    accent: "#00e5a0",
    image: "/case-studies/SEO.jpg",
  },
  {
    id: "magic-upload",
    eyebrow: "AI · Builder.ai",
    title: "Magic Upload",
    description:
      "Multimodal AI-powered inventory automation for e-commerce — 500K+ uploads at 94% accuracy, cutting manual effort by 60%.",
    href: "https://gamma.app/docs/Magic-Upload-4s3sh72jde8nwj2",
    accent: "#a78bfa",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    id: "fraud-risk-engine",
    eyebrow: "Risk · Fintech",
    title: "Behavioral Fraud Detection System",
    description:
      "Built a 15+ signal behavioral risk scoring system that reduced fraud by 45%.",
    href: "https://gamma.app/docs/Fraud-Risk-Management-Engine-4y6hf6a2ygyfmun",
    accent: "#f87171",
    image: "/case-studies/Fintech.jpg",
  },
];

const WHEEL_THRESHOLD = 80;

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
  const [slotSpacing, setSlotSpacing] = useState(44);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchStart = useRef(0);

  // Responsive slot spacing — push side items off-screen on mobile
  useEffect(() => {
    const update = () => setSlotSpacing(window.innerWidth < 640 ? 110 : 44);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Wheel → accumulate delta, advance when threshold reached
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccum.current += e.deltaY;

      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, 300);

      if (wheelAccum.current >= WHEEL_THRESHOLD) {
        wheelAccum.current = 0;
        setActiveIndex((i) => i + 1);
      } else if (wheelAccum.current <= -WHEEL_THRESHOLD) {
        wheelAccum.current = 0;
        setActiveIndex((i) => i - 1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch swipe
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
        className="relative flex cursor-grab items-center justify-center overflow-hidden active:cursor-grabbing"
        style={{ height: "clamp(340px, 52vw, 480px)" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false}>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const virtualIdx = activeIndex + offset;
            const itemIndex =
              ((virtualIdx % BASE.length) + BASE.length) % BASE.length;
            const item = BASE[itemIndex];
            const slotKey = offset as SlotKey;
            const { scale, opacity, showDetail } = SLOT_STYLE[slotKey];
            const xVw = offset * slotSpacing;
            const initialXVw = (offset + (offset >= 0 ? 1 : -1)) * slotSpacing;

            return (
              <motion.div
                key={virtualIdx}
                initial={{ x: `${initialXVw}vw`, scale: 0.2, opacity: 0 }}
                animate={{ x: `${xVw}vw`, scale, opacity }}
                exit={{ scale: 0.2, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className="absolute"
                style={{ width: "min(420px, 88vw)" }}
              >
                <CaseStudyCard item={item} showDetail={showDetail} />
              </motion.div>
            );
          })}
        </AnimatePresence>
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
              background: item.accent,
              opacity: activeDot === i ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
