"use client";

import { useI18n } from "@/lib/i18n";
import { formatEUR, formatPct } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";

// Worked example (deck "The Numbers"): €150k flat.
const GROSS = 7500;
const OPERATING = 3125;
const CIT = 394;
const NET = GROSS - OPERATING - CIT; // 3981
const NET_YIELD = 2.65;
const SURVIVE_PCT = Math.round((NET / GROSS) * 100); // 53

export function StatWaterfall() {
  const { t } = useI18n();

  const rows = [
    { label: t("wf.grossRent"), value: GROSS, tone: "text-ink", w: 100, bar: "bg-teal" },
    { label: t("wf.operatingCosts"), value: -OPERATING, tone: "text-negative", w: (OPERATING / GROSS) * 100, bar: "bg-negative/70" },
    { label: t("wf.cit"), value: -CIT, tone: "text-negative", w: (CIT / GROSS) * 100, bar: "bg-negative/50" },
  ];

  return (
    <Card variant="navy" className="overflow-hidden p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="eyebrow !text-gold">{t("wf.title")}</div>
          <div className="mt-0.5 text-xs text-white/60">{t("wf.subtitle")}</div>
        </div>
        <IllustrativeTag className="!bg-white/10 !text-white/70" />
      </div>

      {/* proportion bar */}
      <div className="mt-4">
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-gold" style={{ width: `${SURVIVE_PCT}%` }} />
          <div className="h-full bg-negative/60" style={{ width: `${(OPERATING / GROSS) * 100}%` }} />
          <div className="h-full bg-negative/40" style={{ width: `${(CIT / GROSS) * 100}%` }} />
        </div>
        <div className="mt-2 text-xs text-white/70">
          {t("wf.survives", { pct: `${SURVIVE_PCT}%` })}
        </div>
      </div>

      {/* line items */}
      <div className="mt-4 space-y-2.5">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-white/80">{r.label}</span>
            <span className={`num font-semibold ${r.value < 0 ? "text-[#f0a99d]" : "text-white"}`}>
              {r.value < 0 ? "−" : ""}
              {formatEUR(Math.abs(r.value))}
            </span>
          </div>
        ))}
        <div className="my-2 h-px bg-white/15" />
        <div className="flex items-end justify-between">
          <span className="text-sm font-semibold text-white">{t("wf.netDistributable")}</span>
          <div className="text-end">
            <div className="num font-display text-2xl font-semibold text-gold">
              <CountUp value={NET} format={(n) => formatEUR(Math.round(n))} />
            </div>
            <div className="text-xs font-semibold text-gold/90">
              {t("wf.netYield", { pct: formatPct(NET_YIELD, { decimals: 2 }) })}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-white/50">{t("wf.note")}</p>
    </Card>
  );
}
