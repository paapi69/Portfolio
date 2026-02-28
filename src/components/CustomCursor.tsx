"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hoverable]")
      ) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`custom-cursor ${hovering ? "hovering" : ""}`}
      style={{
        transform: `translate(${position.x - 6}px, ${position.y - 6}px)${hovering ? " scale(3)" : ""}`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
