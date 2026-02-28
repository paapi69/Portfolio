"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis globally for scroll-to functionality
    (window as unknown as Record<string, Lenis>).__lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
