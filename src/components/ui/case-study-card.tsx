"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CaseStudyItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  accent: string;
  image: string;
}

interface CaseStudyCardProps {
  item: CaseStudyItem;
  showDetail: boolean;
  className?: string;
}

export function CaseStudyCard({ item, showDetail, className }: CaseStudyCardProps) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("block w-full focus:outline-none", className)}
      style={{ pointerEvents: showDetail ? "auto" : "none" }}
      tabIndex={showDetail ? 0 : -1}
    >
      {/* Glass card */}
      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl transition-shadow duration-300"
        style={{
          background: "rgba(36, 36, 36, 0.72)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.08)",
          // @ts-expect-error CSS custom property
          "--card-accent": item.accent,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px -6px ${item.accent}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* ── Image ── */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Bottom-fade gradient */}
          <div
            className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-40"
            style={{
              background:
                "linear-gradient(to top, rgba(28,28,28,0.88) 0%, rgba(28,28,28,0.2) 50%, transparent 100%)",
            }}
          />

          {/* Eyebrow badge — bottom-left of image */}
          <div className="absolute bottom-3 left-3 z-10">
            <Badge
              variant="secondary"
              className="backdrop-blur-sm"
              style={{
                background: `${item.accent}1a`,
                color: item.accent,
                border: `1px solid ${item.accent}44`,
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {item.eyebrow}
            </Badge>
          </div>

          {/* Hover overlay with CTA */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
          >
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg"
              style={{
                background: item.accent,
                color: "#0a0a0a",
                fontFamily: "var(--font-body)",
                boxShadow: `0 4px 20px ${item.accent}55`,
              }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Case Study
            </motion.span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-5 pb-5 pt-4">
          <motion.div
            initial={false}
            animate={{ opacity: showDetail ? 1 : 0, y: showDetail ? 0 : 8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-1.5"
          >
            <h4
              className="text-xl font-bold leading-tight text-[var(--text-primary)] sm:text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </h4>
            <p
              className="text-sm leading-relaxed text-[var(--text-secondary)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.description}
            </p>
          </motion.div>
        </div>
      </div>
    </a>
  );
}
