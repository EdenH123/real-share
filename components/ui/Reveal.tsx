"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/hooks";
import { cn } from "@/lib/cn";

/**
 * Wraps children in a stagger-fade-up reveal on scroll entry. `delay` adds a
 * per-item stagger via the `--reveal-delay` custom property. Visible-by-default
 * without JS and under reduced motion (see globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
