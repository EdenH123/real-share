import { Building2 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { MarketId } from "@/lib/seed";

// On-brand generated "photos" — fully offline, no console errors.
// Each market carries a distinct gradient identity; the theme index varies
// the skyline silhouette so two properties in the same market still differ.

// Per-market gradient identity (token-adjacent, no neon).
const MARKET_GRADIENTS: Record<MarketId, string> = {
  // navy → warm amber dusk
  budapest: "from-[#0F2233] via-[#28405a] to-[#9a6530]",
  // deep teal → aegean blue
  athens: "from-[#123f47] via-[#1F6675] to-[#2c6f92]",
  // plum → terracotta
  portugal: "from-[#331d33] via-[#5a2f3f] to-[#8f4a34]",
  // deep sea navy → gold
  israel: "from-[#0a1f2e] via-[#143654] to-[#b07f38]",
};

// Fallback gradients when no market is provided.
const THEMES = [
  "from-[#123049] via-[#1B3A5B] to-[#1F6675]",
  "from-[#1F6675] via-[#194f5c] to-[#0F2233]",
  "from-[#0F2233] via-[#1B3A5B] to-[#2b4a63]",
  "from-[#294a5f] via-[#1F6675] to-[#123049]",
  "from-[#1B3A5B] via-[#123049] to-[#0F2233]",
];

// Distinct skyline silhouettes keyed by theme index. Each entry is a list of
// [heightUnits, domed?] so the profiles read differently per property.
const SKYLINES: [number, boolean][][] = [
  [
    [10, false], [16, false], [12, false], [22, false], [14, false],
    [18, false], [11, false], [20, false], [13, false],
  ],
  [
    [8, false], [8, false], [24, false], [24, false], [10, false],
    [10, false], [26, false], [12, false], [12, false],
  ],
  [
    [12, true], [20, false], [12, true], [16, false], [22, true],
    [14, false], [18, true], [10, false],
  ],
  [
    [20, false], [14, false], [10, false], [24, false], [16, false],
    [12, false], [22, false], [11, false], [17, false],
  ],
  [
    [14, true], [14, false], [18, false], [26, true], [12, false],
    [16, false], [10, true], [20, false], [13, false],
  ],
];

export function PropertyImage({
  theme,
  market,
  label,
  className,
  rounded = "rounded-card",
  height = "h-44",
}: {
  theme: number;
  market?: MarketId;
  label?: string;
  className?: string;
  rounded?: string;
  height?: string;
}) {
  const grad = market ? MARKET_GRADIENTS[market] : THEMES[theme % THEMES.length];
  const skyline = SKYLINES[theme % SKYLINES.length];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br",
        grad,
        rounded,
        height,
        className
      )}
    >
      {/* soft light blooms — slowly breathing (motion-gated) */}
      <div className="bloom-breathe absolute -start-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="bloom-breathe bloom-breathe--slow absolute -end-6 bottom-0 h-28 w-28 rounded-full bg-gold/20 blur-2xl" />
      {/* skyline silhouette */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 opacity-25">
        {skyline.map(([h, domed], i) => (
          <div
            key={i}
            className={cn("w-4 bg-navy", domed ? "rounded-t-full" : "rounded-t-sm")}
            style={{ height: `${h * 3}px` }}
          />
        ))}
      </div>
      {/* bottom scrim keeps overlaid labels AA-legible on lighter gradient ends */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/55 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <Building2 size={40} className="text-white/40" strokeWidth={1.5} />
      </div>
      {label && (
        <div className="absolute bottom-2 start-3 text-xs font-semibold text-white">
          {label}
        </div>
      )}
    </div>
  );
}
