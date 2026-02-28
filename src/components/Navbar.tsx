"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const navItems = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as Record<string, Lenis>).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = (window as unknown as Record<string, Lenis>).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-0 top-0 z-[100] w-full border-b border-[var(--border)] bg-[var(--bg-primary)] px-6 py-4 sm:px-8 lg:px-12"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a
              href="#home"
              onClick={scrollToTop}
              data-hoverable
              className="text-sm font-bold tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sahil Gupta
            </a>

            <nav className="flex gap-6 sm:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  data-hoverable
                  className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
