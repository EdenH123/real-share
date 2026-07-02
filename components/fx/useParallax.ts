"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll parallax within the app's internal scroll area (`.app-scroll`).
 * Translates the ref'd element at `speed`× the scroll offset (clamped),
 * giving hero imagery gentle depth. rAF-throttled; disabled under
 * prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(speed = 0.35, max = 120) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const scroller = el.closest(".app-scroll");
    if (!scroller) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(max, (scroller.scrollTop || 0) * speed);
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, max]);

  return ref;
}
