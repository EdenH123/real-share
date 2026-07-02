"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ProgressBar({
  pct,
  className,
  tone = "gold",
  animate = false,
  ticks = false,
}: {
  pct: number;
  className?: string;
  tone?: "gold" | "teal" | "positive";
  /** Animate the fill from 0 → pct on mount (no-preference only, via CSS). */
  animate?: boolean;
  /** Render subtle escrow tick marks at 25 / 50 / 75%. */
  ticks?: boolean;
}) {
  const tones = {
    gold: "bg-gold",
    teal: "bg-teal",
    positive: "bg-positive",
  };
  const clamped = Math.max(0, Math.min(100, pct));

  const [filled, setFilled] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-hairline",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full",
          animate ? "progress-fill" : "transition-all",
          tones[tone]
        )}
        style={{ width: `${filled ? clamped : 0}%` }}
      />
      {ticks &&
        [25, 50, 75].map((tk) => (
          <span
            key={tk}
            aria-hidden
            className="absolute inset-y-0 w-px bg-surface/70"
            style={{ insetInlineStart: `${tk}%` }}
          />
        ))}
    </div>
  );
}
