import { cn } from "@/lib/cn";

export function ProgressBar({
  pct,
  className,
  tone = "gold",
}: {
  pct: number;
  className?: string;
  tone?: "gold" | "teal" | "positive";
}) {
  const tones = {
    gold: "bg-gold",
    teal: "bg-teal",
    positive: "bg-positive",
  };
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-hairline", className)}>
      <div
        className={cn("h-full rounded-full transition-all", tones[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
