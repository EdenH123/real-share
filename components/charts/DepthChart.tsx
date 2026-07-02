"use client";

import { useI18n } from "@/lib/i18n";
import { formatEUR } from "@/lib/format";
import type { Order } from "@/lib/seed";
import { useDrawn } from "./anim";

const BID = "#2E7D5B"; // positive
const ASK = "#A8493D"; // negative

const W = 320;
const H = 96;
const PAD_X = 10;
const PAD_T = 10;
const PAD_B = 20;
const PLOT_H = H - PAD_T - PAD_B;

/**
 * Cumulative market-depth chart. Bids accumulate outward from the best bid
 * (green, left of the estimated-price marker); asks accumulate outward from the
 * best ask (red, right of it). Bids/asks separate by position AND color (the
 * accessibility relief the CVD floor requires for this red/green pair), and the
 * compact legend names both series.
 */
export function DepthChart({
  bids,
  asks,
  est,
}: {
  bids: Order[]; // sorted price desc (best bid first)
  asks: Order[]; // sorted price asc (best ask first)
  est: number;
}) {
  const { t } = useI18n();
  const drawn = useDrawn();

  // Cumulative depth per side.
  let cb = 0;
  const bidCum = bids.map((o) => {
    cb += o.tokens;
    return { price: o.price, cum: cb };
  });
  let ca = 0;
  const askCum = asks.map((o) => {
    ca += o.tokens;
    return { price: o.price, cum: ca };
  });

  const prices = [...bidCum, ...askCum].map((d) => d.price).concat(est);
  const pMin = Math.min(...prices);
  const pMax = Math.max(...prices);
  const pRange = pMax - pMin || 1;
  const maxCum = Math.max(cb, ca, 1);

  const x = (p: number) => PAD_X + ((p - pMin) / pRange) * (W - PAD_X * 2);
  const y = (c: number) => PAD_T + PLOT_H - (c / maxCum) * PLOT_H;
  const baseY = PAD_T + PLOT_H;

  // Step area for bids: ascending price (lowest→best bid), cum descending.
  const bidAsc = [...bidCum].reverse(); // price asc, cum desc
  const askAsc = askCum; // price asc, cum asc

  function bidArea(): string {
    if (bidAsc.length === 0) return "";
    let d = `M ${x(bidAsc[0].price)} ${baseY} L ${x(bidAsc[0].price)} ${y(bidAsc[0].cum)}`;
    for (let i = 1; i < bidAsc.length; i++) {
      d += ` L ${x(bidAsc[i].price)} ${y(bidAsc[i - 1].cum)}`; // step across
      d += ` L ${x(bidAsc[i].price)} ${y(bidAsc[i].cum)}`; // step down
    }
    d += ` L ${x(bidAsc[bidAsc.length - 1].price)} ${baseY} Z`;
    return d;
  }
  function askArea(): string {
    if (askAsc.length === 0) return "";
    let d = `M ${x(askAsc[0].price)} ${baseY} L ${x(askAsc[0].price)} ${y(askAsc[0].cum)}`;
    for (let i = 1; i < askAsc.length; i++) {
      d += ` L ${x(askAsc[i].price)} ${y(askAsc[i - 1].cum)}`;
      d += ` L ${x(askAsc[i].price)} ${y(askAsc[i].cum)}`;
    }
    d += ` L ${x(askAsc[askAsc.length - 1].price)} ${baseY} Z`;
    return d;
  }

  const markerX = x(est);

  return (
    <div>
      {/* compact legend (>=2 series) */}
      <div className="mb-2 flex items-center gap-4 text-[11px]">
        <span className="flex items-center gap-1.5 font-semibold text-positive">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: BID }} />
          {t("trade.bids")}
        </span>
        <span className="flex items-center gap-1.5 font-semibold text-negative">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ASK }} />
          {t("trade.asks")}
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={t("trade.depth")}
          className="chart-fade"
          style={{ opacity: drawn ? 1 : 0 }}
        >
          <line
            x1={PAD_X}
            x2={W - PAD_X}
            y1={baseY}
            y2={baseY}
            stroke="#D8E0E5"
            strokeWidth={1}
          />
          <path d={bidArea()} fill={BID} fillOpacity={0.14} stroke={BID} strokeWidth={1.5} />
          <path d={askArea()} fill={ASK} fillOpacity={0.14} stroke={ASK} strokeWidth={1.5} />

          {/* est-price marker */}
          <line
            x1={markerX}
            x2={markerX}
            y1={PAD_T - 2}
            y2={baseY}
            stroke="#1B3A5B"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />

          {/* price axis ends */}
          <text x={PAD_X} y={H - 6} fontSize={10} fill="#5A6B78" textAnchor="start"
            style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatEUR(pMin, { decimals: 1 })}
          </text>
          <text x={W - PAD_X} y={H - 6} fontSize={10} fill="#5A6B78" textAnchor="end"
            style={{ fontVariantNumeric: "tabular-nums" }}>
            {formatEUR(pMax, { decimals: 1 })}
          </text>
        </svg>

        {/* est-price chip, positioned over the marker */}
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2"
          style={{ left: `${(markerX / W) * 100}%` }}
        >
          <span className="num rounded-full bg-navy px-1.5 py-0.5 text-[9px] font-semibold text-gold">
            {formatEUR(est, { decimals: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
