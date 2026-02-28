"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RobotMascot() {
  const robotRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState(0);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [showBubble, setShowBubble] = useState(false);
  const [autoShowBubble, setAutoShowBubble] = useState(false);

  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-show bubble after 5s for 3s then fade
  useEffect(() => {
    const showTimer = setTimeout(() => setAutoShowBubble(true), 5000);
    const hideTimer = setTimeout(() => setAutoShowBubble(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Head rotation + pupil tracking
  useEffect(() => {
    if (!robotRef.current) return;
    const rect = robotRef.current.getBoundingClientRect();
    const headCenterX = rect.left + rect.width / 2;
    const headCenterY = rect.top + rect.height * 0.35;

    const angleRad = Math.atan2(mouse.y - headCenterY, mouse.x - headCenterX);
    const angleDeg = angleRad * (180 / Math.PI);
    setHeadRotation(Math.max(-30, Math.min(30, angleDeg * 0.35)));

    const dist = Math.sqrt(
      (mouse.x - headCenterX) ** 2 + (mouse.y - headCenterY) ** 2
    );
    const d = Math.max(dist, 1);
    setPupilOffset({
      x: ((mouse.x - headCenterX) / d) * 5,
      y: ((mouse.y - headCenterY) / d) * 5,
    });
  }, [mouse]);

  const bubbleVisible = showBubble || autoShowBubble;

  return (
    <div
      ref={robotRef}
      className="fixed bottom-6 right-6 z-40 hidden sm:block"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {bubbleVisible && (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-xs text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            👋 Say hi to Sahil!
            <span className="absolute -bottom-[5px] right-4 block h-2.5 w-2.5 rotate-45 border-b border-r border-[var(--border)] bg-[var(--bg-elevated)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot — clickable link to LinkedIn */}
      <a
        href="https://www.linkedin.com/in/sahil-gupta-41a3b6113/"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
      >
        {/* Idle float */}
        <motion.div
          animate={{ y: [-4, 0, -4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="72"
            height="96"
            viewBox="0 0 72 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* BODY (static) */}
            <rect x="16" y="56" width="40" height="28" rx="6" fill="#2a2a2a" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <rect x="28" y="63" width="16" height="6" rx="3" fill="#00e5a0" opacity="0.25" />
            <rect x="30" y="64" width="12" height="4" rx="2" fill="#00e5a0" opacity="0.5" />

            {/* Arms */}
            <rect x="4" y="58" width="10" height="20" rx="5" fill="#2a2a2a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="58" y="58" width="10" height="20" rx="5" fill="#2a2a2a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Legs */}
            <rect x="20" y="82" width="12" height="12" rx="4" fill="#242424" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="40" y="82" width="12" height="12" rx="4" fill="#242424" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* HEAD (rotates from neck pivot at 36,56) */}
            <g
              style={{
                transformOrigin: "36px 56px",
                transform: `rotate(${headRotation}deg)`,
                transition: "transform 0.12s ease-out",
              }}
            >
              {/* Antenna */}
              <line x1="36" y1="26" x2="36" y2="33" stroke="#00e5a0" strokeWidth="2" strokeLinecap="round" />
              <circle cx="36" cy="23" r="4" fill="#00e5a0" opacity="0.8" />

              {/* Head box */}
              <rect x="13" y="33" width="46" height="36" rx="10" fill="#2a2a2a" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Eye sockets */}
              <circle cx="25" cy="49" r="8" fill="#1c1c1c" />
              <circle cx="47" cy="49" r="8" fill="#1c1c1c" />

              {/* Pupils */}
              <circle cx={25 + pupilOffset.x} cy={49 + pupilOffset.y} r="4" fill="#00e5a0" opacity="0.9" />
              <circle cx={47 + pupilOffset.x} cy={49 + pupilOffset.y} r="4" fill="#00e5a0" opacity="0.9" />

              {/* Glints */}
              <circle cx={26.5 + pupilOffset.x} cy={47.5 + pupilOffset.y} r="1.5" fill="white" opacity="0.7" />
              <circle cx={48.5 + pupilOffset.x} cy={49.5 + pupilOffset.y} r="1.5" fill="white" opacity="0.7" />

              {/* Mouth */}
              <path d="M 26 60 Q 36 65 46 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </motion.div>
      </a>
    </div>
  );
}
