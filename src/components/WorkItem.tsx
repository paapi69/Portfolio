"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

interface Metric {
  value: string;
  label: string;
}

interface SubProject {
  name: string;
  detail: string;
}

interface Project {
  name: string;
  role: string;
  period: string;
  companyType: string;
  oneLiner: string;
  metrics: Metric[];
  tags: string[];
  highlight?: string;
  isFounderCard?: boolean;
  subProjects?: SubProject[];
}

export default function WorkItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="border-b border-[var(--border)]"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        data-hoverable
        className="flex w-full items-start gap-4 py-8 text-left sm:gap-6 md:py-12"
      >
        {/* Number */}
        <span
          className="mt-1 text-sm text-[var(--accent)] md:mt-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="flex-1">
          <h3
            className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h3>
          <p
            className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {project.oneLiner}
          </p>
          <span
            className="mt-1 inline-block text-xs text-[var(--text-dim)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {project.role} &middot; {project.period}
          </span>
        </div>

        {/* Expand arrow */}
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 text-lg text-[var(--text-secondary)] md:mt-2 md:text-xl"
        >
          &#8599;
        </motion.span>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-8 sm:pl-10 md:pl-16">
              {/* Sub-projects for founder card */}
              {project.subProjects && (
                <div className="mb-6 space-y-3">
                  {project.subProjects.map((sub) => (
                    <div
                      key={sub.name}
                      className="border-l-2 border-[var(--accent)]/30 pl-4"
                    >
                      <p
                        className="text-sm font-medium text-[var(--text-primary)]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {sub.name}
                      </p>
                      <p
                        className="text-sm text-[var(--text-secondary)]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {sub.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                {project.metrics.map((m) => (
                  <AnimatedCounter
                    key={m.label}
                    value={m.value}
                    label={m.label}
                  />
                ))}
              </div>

              {/* Highlight */}
              {project.highlight && (
                <p
                  className="mt-6 text-sm text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  &#9733; {project.highlight}
                </p>
              )}

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
