import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

/**
 * The unified brand motif: a gold filled circle with a navy solid glyph
 * at ~52% scale. Used consistently for every concept icon.
 */
export function IconMedallion({
  icon: Icon,
  size = 44,
  className,
  tone = "gold",
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
  tone?: "gold" | "navy" | "teal";
}) {
  const glyph = Math.round(size * 0.52);
  const tones = {
    gold: "bg-gold text-navy",
    navy: "bg-navy text-gold",
    teal: "bg-teal text-white",
  };
  return (
    <span
      className={cn(
        "inline-grid place-items-center rounded-full shrink-0",
        tones[tone],
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Icon size={glyph} strokeWidth={2.25} />
    </span>
  );
}
