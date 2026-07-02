"use client";

import { useCountUp } from "@/lib/hooks";

/**
 * Animates a numeric value up from 0 on mount, formatting each frame via the
 * supplied formatter (keeps `.num` formatting intact). Instant under reduced
 * motion. Wrap in a `.num` container at the call site as before.
 */
export function CountUp({
  value,
  format,
  duration,
}: {
  value: number;
  format: (n: number) => string;
  duration?: number;
}) {
  const n = useCountUp(value, duration);
  return <>{format(n)}</>;
}
