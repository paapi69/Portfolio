"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "$20M", "100K", "45%", "$150K+"
  label: string;
}

function parseValue(raw: string): {
  prefix: string;
  number: number;
  suffix: string;
} {
  // Extract prefix (non-numeric leading chars like $ or +)
  const prefixMatch = raw.match(/^([^0-9]*)/);
  const prefix = prefixMatch ? prefixMatch[1] : "";

  // Extract number
  const numMatch = raw.match(/([0-9]+\.?[0-9]*)/);
  const number = numMatch ? parseFloat(numMatch[1]) : 0;

  // Extract suffix (everything after the number)
  const suffixMatch = raw.match(/[0-9]+\.?[0-9]*(.*)/);
  const suffix = suffixMatch ? suffixMatch[1] : "";

  return { prefix, number, suffix };
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayNumber, setDisplayNumber] = useState(0);
  const { prefix, number, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const startTime = Date.now();
    const isFloat = number % 1 !== 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * number;

      setDisplayNumber(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayNumber(number);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, number]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-[var(--accent)] sm:text-4xl"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {prefix}
        {displayNumber}
        {suffix}
      </motion.div>
      <p
        className="mt-2 text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
    </div>
  );
}
