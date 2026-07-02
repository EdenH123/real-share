"use client";

import { useEffect, useState } from "react";

/**
 * Flips to `true` on the frame after mount so CSS transitions can draw the
 * chart in (line stroke-dashoffset, donut stroke-dasharray, area fade). The
 * transitions themselves are declared in globals.css gated behind
 * `prefers-reduced-motion: no-preference`, so when motion is reduced the state
 * flip lands instantly with no animation. SSR-safe (starts `false` on both
 * server and first client render — no hydration mismatch).
 */
export function useDrawn(): boolean {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return drawn;
}
