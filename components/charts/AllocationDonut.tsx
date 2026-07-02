"use client";

import { useI18n } from "@/lib/i18n";
import { getProperty, type MarketId } from "@/lib/seed";
import { formatEUR, formatPct } from "@/lib/format";
import type { HoldingView } from "@/lib/portfolio";
import { useDrawn } from "./anim";

// Fixed market → color mapping (color follows the entity, never its rank).
const MARKET_ORDER: MarketId[] = ["budapest", "athens", "portugal", "israel"];
const MARKET_COLOR: Record<MarketId, string> = {
  budapest: "#E0A458", // gold
  athens: "#1F6675", // teal
  portugal: "#1B3A5B", // navy-card
  israel: "#2c6f92", // lighter teal-blue (4th market)
};
const MARKET_KEY: Record<MarketId, string> = {
  budapest: "market.budapest",
  athens: "market.athens",
  portugal: "market.portugal",
  israel: "market.israel",
};

const R = 44;
const CX = 60;
const CY = 60;
const SW = 16;
const GAP = 1.4; // normalized (pathLength=100) surface gap between slices

export function AllocationDonut({ views }: { views: HoldingView[] }) {
  const { t, locale } = useI18n();
  const drawn = useDrawn();

  const byMarket = new Map<MarketId, number>();
  for (const v of views) {
    const p = getProperty(v.propertyId);
    if (!p) continue;
    byMarket.set(p.market, (byMarket.get(p.market) ?? 0) + v.currentValue);
  }
  const total = Array.from(byMarket.values()).reduce((s, n) => s + n, 0);

  const slices = MARKET_ORDER.filter((m) => byMarket.has(m)).map((m) => {
    const value = byMarket.get(m)!;
    return { market: m, value, frac: total > 0 ? value / total : 0 };
  });

  // Cumulative start fractions for arc placement.
  let acc = 0;
  const arcs = slices.map((s) => {
    const startFrac = acc;
    acc += s.frac;
    return { ...s, startFrac };
  });

  return (
    <div>
      <div className="flex items-center gap-4">
        {/* donut */}
        <div className="relative shrink-0" style={{ width: 120, height: 120 }}>
          <svg
            viewBox="0 0 120 120"
            width={120}
            height={120}
            role="img"
            aria-label={t("pf.allocation")}
          >
            {/* track */}
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="#D8E0E5"
              strokeWidth={SW}
            />
            {arcs.map((a) => {
              const len = Math.max(0, a.frac * 100 - (arcs.length > 1 ? GAP : 0));
              return (
                <circle
                  key={a.market}
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke={MARKET_COLOR[a.market]}
                  strokeWidth={SW}
                  strokeLinecap="butt"
                  pathLength={100}
                  strokeDasharray={drawn ? `${len} 100` : `0 100`}
                  strokeDashoffset={0}
                  transform={`rotate(${-90 + a.startFrac * 360} ${CX} ${CY})`}
                  className="chart-grow"
                />
              );
            })}
          </svg>
          {/* center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-[9px] font-semibold uppercase tracking-wide text-muted">
              {t("pf.totalValue")}
            </div>
            <div className="num text-sm font-semibold text-ink">
              {formatEUR(total, { decimals: 0 })}
            </div>
          </div>
        </div>

        {/* legend */}
        <ul className="min-w-0 flex-1 space-y-2">
          {arcs.map((a) => (
            <li key={a.market} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: MARKET_COLOR[a.market] }}
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate text-ink">
                {t(MARKET_KEY[a.market])}
              </span>
              <span className="num shrink-0 font-semibold text-muted">
                {formatPct(a.frac * 100, { decimals: 0 })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
