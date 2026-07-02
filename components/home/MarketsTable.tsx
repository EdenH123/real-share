"use client";

import { useI18n } from "@/lib/i18n";
import { MARKETS, MARKET_FRICTION } from "@/lib/seed";
import { Card } from "@/components/ui/Card";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { cn } from "@/lib/cn";

// favorability tint by rank (1 favorable .. 4 unfavorable)
const rankTint: Record<number, string> = {
  1: "text-positive",
  3: "text-gold-text",
  4: "text-negative",
};

export function MarketsTable() {
  const { t, locale } = useI18n();

  return (
    <Card className="overflow-hidden">
      <div className="space-y-3 p-4">
        {MARKETS.map((m) => (
          <div
            key={m.id}
            className="rounded-card border border-hairline p-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold text-ink">
                {t(m.nameKey)}
              </span>
              <span className={cn("num text-sm font-bold", rankTint[m.rank])}>
                {m.appreciation}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-tint px-2.5 py-1.5">
                <div className="text-muted">{t("market.grossYield")}</div>
                <div className="num font-semibold text-ink">{m.grossYield}</div>
              </div>
              <div className="rounded-lg bg-tint px-2.5 py-1.5">
                <div className="text-muted">{t("market.entry")}</div>
                <div className="num font-semibold text-ink">{m.entry}</div>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted">
              <span className="font-semibold text-ink">{t("market.friction")}: </span>
              {MARKET_FRICTION[m.frictionKey][locale]}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5">
        <span className="text-[11px] text-muted">{t("market.note")}</span>
        <IllustrativeTag />
      </div>
    </Card>
  );
}
