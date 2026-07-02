"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Page navigation wrapped in the View Transitions API when available —
 * a soft depth crossfade between screens (see ::view-transition-* rules in
 * globals.css). Progressive enhancement: falls back to a plain push, and is
 * skipped entirely under prefers-reduced-motion.
 */
export function useViewTransitionRouter() {
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      const doc = document as Document & {
        startViewTransition?: (cb: () => Promise<void>) => void;
      };
      const reduce = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!doc.startViewTransition || reduce) {
        router.push(href);
        return;
      }
      doc.startViewTransition(() => {
        router.push(href);
        // Give the router a beat to commit the new tree so the "new" snapshot
        // captures the incoming page rather than the old one.
        return new Promise<void>((resolve) => setTimeout(resolve, 90));
      });
    },
    [router]
  );

  return navigate;
}
