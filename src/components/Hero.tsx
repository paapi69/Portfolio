"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";

const ease = [0.25, 0.4, 0.25, 1] as const;

function HeroNav() {
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

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
      className="flex gap-6 sm:gap-8"
    >
      {["work", "about", "contact"].map((id) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          data-hoverable
          className="text-sm capitalize tracking-wide text-[var(--hero-text)]/60 transition-colors hover:text-[var(--hero-text)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {id}
        </a>
      ))}
    </motion.nav>
  );
}

function ProfilePhoto() {
  const photoRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), {
    stiffness: 100,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), {
    stiffness: 100,
    damping: 25,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!photoRef.current) return;
      const rect = photoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={photoRef}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ perspective: 800, rotateX, rotateY }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-start justify-center md:justify-end"
    >
      {/* Idle floating wrapper */}
      <motion.div
        animate={{ y: [-6, 0, -6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.04 }}
      >
        <div
          className="relative"
          style={{
            transition: "box-shadow 0.3s ease",
            borderRadius: "50%",
            boxShadow: isHovered
              ? "0 20px 60px rgba(0,0,0,0.35)"
              : "0 12px 40px rgba(0,0,0,0.18)",
          }}
        >
          <Image
            src="/images/sahil.jpg"
            alt="Sahil Gupta"
            width={280}
            height={280}
            priority
            className="h-48 w-48 rounded-full object-cover object-top sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-64 lg:w-64"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col"
      style={{ background: "var(--hero-bg)", color: "var(--hero-text)" }}
    >
      {/* Hero nav */}
      <div className="px-6 pt-8 sm:px-8 lg:px-12">
        <HeroNav />
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-5 md:gap-x-8">
            {/* Name — 3 cols on desktop */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="md:col-span-3"
            >
              <h1
                className="text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[128px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sahil
                <br />
                Gupta
              </h1>
            </motion.div>

            {/* Profile photo — 2 cols on desktop, md:row-span-2 to align with name+bio */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="order-first md:order-none md:col-span-2 md:row-span-2 md:flex md:items-center md:justify-end"
            >
              <ProfilePhoto />
            </motion.div>

            {/* Bio column 1 — 3 cols */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="md:col-span-3"
            >
              <p
                className="text-base leading-relaxed sm:text-lg md:text-xl"
                style={{ fontFamily: "var(--font-body)" }}
              >
                I don&apos;t build products and then find users for them. I find
                the problems first, then build. 10+ years scaling AI-native and
                fintech platforms to $20M+ ARR across six global markets.
              </p>
            </motion.div>

            {/* Bio column 2 — 3 cols (below bio-1, photo still in right) */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="md:col-span-3"
            >
              <p
                className="text-sm leading-relaxed opacity-60 sm:text-base"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Senior Product Manager specializing in LLM-powered products,
                payments infrastructure, and platform architecture. 2x Founder.
                Open to Senior PM / Lead PM roles in AI, GenAI, fintech, and
                SaaS.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
