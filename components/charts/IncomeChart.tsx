"use client";

import { useI18n } from "@/lib/i18n";
import { SEED_DISTRIBUTIONS, type Holding } from "@/lib/seed";
import { formatEUR } from "@/lib/format";
import { useDrawn } from "./anim";

const TEAL = "#1F6675";

// Plot geometry (viewBox units). Width is responsive via viewBox + 100% width.
const W = 300;
const H = 132;
const PAD_L = 10;
const PAD_R = 46;
const PAD_T = 14;
const PAD_B = 24;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

function monthLabel(key: string, locale: string): string {
  // key = "YYYY-MM" → short month name in the active locale.
  const d = new Date(`${key}-01T00:00:00`);
  return d.toLocaleDateString(locale === "he" ? "he-IL" : "en-GB", {
    month: "short",
  });
}

export function IncomeChart({ holdings }: { holdings: Holding[] }) {
  const { locale } = useI18n();
  const drawn = useDrawn();

  const tokensFor = (id: string) =>
    holdings.find((h) => h.propertyId === id)?.tokens ?? 0;
  const heldIds = new Set(holdings.map((h) => h.propertyId));

  // Aggregate per calendar month.
  const monthMap = new Map<string, { amount: number; paid: boolean }>();
  for (const d of SEED_DISTRIBUTIONS) {
    if (!heldIds.has(d.propertyId)) continue;
    const key = d.date.slice(0, 7);
    const cur = monthMap.get(key) ?? { amount: 0, paid: true };
    cur.amount += d.amountPerToken * tokensFor(d.propertyId);
    cur.paid = cur.paid && d.paid;
    monthMap.set(key, cur);
  }
  const months = Array.from(monthMap.keys()).sort();

  // Cumulative points.
  let running = 0;
  const points = months.map((key) => {
    const m = monthMap.get(key)!;
    running += m.amount;
    return { key, cum: running, paid: m.paid };
  });

  if (points.length === 0) return null;

  const n = points.length;
  const maxY = points[n - 1].cum || 1;
  const x = (i: number) => PAD_L + (n === 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W);
  const y = (v: number) => PAD_T + PLOT_H - (v / maxY) * PLOT_H;

  // Split at the last paid month; upcoming continues dashed.
  let lastPaid = -1;
  points.forEach((p, i) => {
    if (p.paid) lastPaid = i;
  });
  const paidPts = points.slice(0, lastPaid + 1);
  const upcomingPts = lastPaid >= 0 ? points.slice(lastPaid) : points;

  const toPath = (pts: { cum: number }[], startIdx: number) =>
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${x(startIdx + i)} ${y(p.cum)}`)
      .join(" ");

  const paidLine = paidPts.length ? toPath(paidPts, 0) : "";
  const upcomingLine =
    upcomingPts.length > 1 ? toPath(upcomingPts, Math.max(0, lastPaid)) : "";

  // Area under the paid line.
  const areaPath =
    paidPts.length > 1
      ? `${paidLine} L ${x(lastPaid)} ${PAD_T + PLOT_H} L ${x(0)} ${
          PAD_T + PLOT_H
        } Z`
      : "";

  const gridVals = [maxY, maxY / 2];
  const endPoint = points[n - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
    >
      {/* gridlines */}
      {gridVals.map((g, i) => (
        <line
          key={i}
          x1={PAD_L}
          x2={PAD_L + PLOT_W}
          y1={y(g)}
          y2={y(g)}
          stroke="#D8E0E5"
          strokeWidth={1}
        />
      ))}

      {/* area */}
      {areaPath && (
        <path
          d={areaPath}
          fill={TEAL}
          fillOpacity={0.1}
          className="chart-fade"
          style={{ opacity: drawn ? 1 : 0 }}
        />
      )}

      {/* upcoming dashed line */}
      {upcomingLine && (
        <path
          d={upcomingLine}
          fill="none"
          stroke={TEAL}
          strokeWidth={2}
          strokeDasharray="4 3"
          strokeLinecap="round"
          opacity={0.7}
          pathLength={100}
          strokeDashoffset={0}
          className="chart-fade"
          style={{ opacity: drawn ? 0.7 : 0 }}
        />
      )}

      {/* paid line (draws in) */}
      {paidLine && (
        <path
          d={paidLine}
          fill="none"
          stroke={TEAL}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={drawn ? 0 : 100}
          className="chart-draw"
        />
      )}

      {/* endpoint dot: hollow if upcoming, filled if paid */}
      <circle
        cx={x(n - 1)}
        cy={y(endPoint.cum)}
        r={3.5}
        fill={endPoint.paid ? TEAL : "#FFFFFF"}
        stroke={TEAL}
        strokeWidth={2}
      />

      {/* end value label */}
      <text
        x={x(n - 1) + 6}
        y={y(endPoint.cum) + 3}
        fontSize={11}
        fontWeight={700}
        fill="#1E2A36"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {formatEUR(endPoint.cum, { decimals: 0 })}
      </text>

      {/* month labels */}
      {points.map((p, i) => (
        <text
          key={p.key}
          x={x(i)}
          y={H - 7}
          fontSize={10}
          fill="#5A6B78"
          textAnchor="middle"
        >
          {monthLabel(p.key, locale)}
        </text>
      ))}
    </svg>
  );
}
