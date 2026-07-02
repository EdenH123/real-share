"use client";

import { useI18n } from "@/lib/i18n";
import { formatEUR } from "@/lib/format";
import { useDrawn } from "./anim";

const TEAL = "#1F6675"; // base 6%
const GOLD = "#E0A458"; // bull 10%
const GOLD_TEXT = "#A56B2A";

const BASE_RATE = 0.06;
const BULL_RATE = 0.1;
const PRINCIPAL = 1000;
const RENT_5YR = 133; // linear rent over 5y
const RENT_PER_YR = RENT_5YR / 5;
const YEARS = 5;

const W = 300;
const H = 150;
const PAD_L = 10;
const PAD_R = 52;
const PAD_T = 16;
const PAD_B = 22;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

function valueAt(rate: number, t: number): number {
  return PRINCIPAL * Math.pow(1 + rate, t) + RENT_PER_YR * t;
}

export function ScenarioChart() {
  const { t } = useI18n();
  const drawn = useDrawn();

  const base = Array.from({ length: YEARS + 1 }, (_, i) => valueAt(BASE_RATE, i));
  const bull = Array.from({ length: YEARS + 1 }, (_, i) => valueAt(BULL_RATE, i));

  const minY = PRINCIPAL; // both start at 1,000
  const maxY = bull[YEARS] * 1.02;
  const x = (i: number) => PAD_L + (i / YEARS) * PLOT_W;
  const y = (v: number) => PAD_T + PLOT_H - ((v - minY) / (maxY - minY)) * PLOT_H;

  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const area = (arr: number[]) =>
    `${line(arr)} L ${x(YEARS)} ${PAD_T + PLOT_H} L ${x(0)} ${PAD_T + PLOT_H} Z`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={t("prop.scenarioCaption")}
      >
        {/* year gridlines 0..5 */}
        {Array.from({ length: YEARS + 1 }, (_, i) => (
          <line
            key={i}
            x1={x(i)}
            x2={x(i)}
            y1={PAD_T}
            y2={PAD_T + PLOT_H}
            stroke="#D8E0E5"
            strokeWidth={1}
          />
        ))}
        {/* baseline (€1,000) */}
        <line
          x1={PAD_L}
          x2={PAD_L + PLOT_W}
          y1={y(minY)}
          y2={y(minY)}
          stroke="#D8E0E5"
          strokeWidth={1}
        />

        {/* areas (bull behind, base in front) */}
        <path d={area(bull)} fill={GOLD} fillOpacity={0.1} className="chart-fade"
          style={{ opacity: drawn ? 1 : 0 }} />
        <path d={area(base)} fill={TEAL} fillOpacity={0.1} className="chart-fade"
          style={{ opacity: drawn ? 1 : 0 }} />

        {/* lines */}
        <path d={line(bull)} fill="none" stroke={GOLD} strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round"
          pathLength={100} strokeDasharray={100} strokeDashoffset={drawn ? 0 : 100}
          className="chart-draw" />
        <path d={line(base)} fill="none" stroke={TEAL} strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round"
          pathLength={100} strokeDasharray={100} strokeDashoffset={drawn ? 0 : 100}
          className="chart-draw" />

        {/* endpoint dots */}
        <circle cx={x(YEARS)} cy={y(bull[YEARS])} r={3.5} fill={GOLD} stroke="#fff" strokeWidth={2} />
        <circle cx={x(YEARS)} cy={y(base[YEARS])} r={3.5} fill={TEAL} stroke="#fff" strokeWidth={2} />

        {/* endpoint value labels (totals) */}
        <text x={x(YEARS) + 6} y={y(bull[YEARS]) + 3} fontSize={11} fontWeight={700}
          fill={GOLD_TEXT} style={{ fontVariantNumeric: "tabular-nums" }}>
          {formatEUR(Math.round(bull[YEARS]), { decimals: 0 })}
        </text>
        <text x={x(YEARS) + 6} y={y(base[YEARS]) + 3} fontSize={11} fontWeight={700}
          fill={TEAL} style={{ fontVariantNumeric: "tabular-nums" }}>
          {formatEUR(Math.round(base[YEARS]), { decimals: 0 })}
        </text>

        {/* x-axis year labels */}
        {Array.from({ length: YEARS + 1 }, (_, i) => (
          <text key={i} x={x(i)} y={H - 6} fontSize={9} fill="#5A6B78" textAnchor="middle">
            {i}
          </text>
        ))}
      </svg>

      {/* legend (2 series) */}
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: TEAL }} />
          {t("prop.scenarioBase")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
          {t("prop.scenarioBull")}
        </span>
        <span className="ms-auto">{t("prop.scenarioCaption")}</span>
      </div>
    </div>
  );
}
