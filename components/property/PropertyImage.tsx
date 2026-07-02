import { Building2 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { MarketId } from "@/lib/seed";
import { CitySkyline } from "./CitySkyline";

// Property "photos" — hand-crafted layered SVG city scenes per market
// (recognizable skylines, signature skies, glowing windows). Fully offline,
// crisp at any size, zero console errors.

// Fallback gradients when no market is provided.
const THEMES = [
  "from-[#123049] via-[#1B3A5B] to-[#1F6675]",
  "from-[#1F6675] via-[#194f5c] to-[#0F2233]",
  "from-[#0F2233] via-[#1B3A5B] to-[#2b4a63]",
  "from-[#294a5f] via-[#1F6675] to-[#123049]",
  "from-[#1B3A5B] via-[#123049] to-[#0F2233]",
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
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        !market && cn("bg-gradient-to-br", THEMES[theme % THEMES.length]),
        rounded,
        height,
        className
      )}
    >
      {market ? (
        <CitySkyline market={market} seed={theme} className="absolute inset-0" />
      ) : (
        <>
          <div className="bloom-breathe absolute -start-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="bloom-breathe bloom-breathe--slow absolute -end-6 bottom-0 h-28 w-28 rounded-full bg-gold/20 blur-2xl" />
          <div className="absolute inset-0 grid place-items-center">
            <Building2 size={40} className="text-white/40" strokeWidth={1.5} />
          </div>
        </>
      )}
      {/* bottom scrim keeps overlaid labels AA-legible */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/60 to-transparent" />
      {label && (
        <div className="absolute bottom-2 start-3 text-xs font-semibold text-white">
          {label}
        </div>
      )}
    </div>
  );
}
