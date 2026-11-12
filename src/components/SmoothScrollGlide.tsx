"use client";

import { useEffect } from "react";

/**
 * Anticipatory Smooth Momentum Scroll
 * Glides smoothly ahead as the user scrolls, creating a buttery luxury feel.
 */
export default function SmoothScrollGlide() {
  useEffect(() => {
    // Only apply on client-side desktop where wheel events are standard
    if (typeof window === "undefined") return;

    let isScrolling = false;
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    const ease = 0.12; // Smooth anticipatory momentum interpolation

    const updateScroll = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.5) {
        currentY += diff * ease;
        window.scrollTo(0, currentY);
        requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        isScrolling = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Don't intercept if modifier keys pressed or in an open modal / scrollable child
      if (e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('[role="dialog"], .overflow-y-auto, textarea, select')) {
        return;
      }

      // Anticipatory forward glide multiplier
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const delta = e.deltaY * 1.15; // Smooth forward glide
      targetY = Math.max(0, Math.min(maxScroll, (isScrolling ? targetY : window.scrollY) + delta));

      if (!isScrolling) {
        isScrolling = true;
        currentY = window.scrollY;
        requestAnimationFrame(updateScroll);
      }

      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
