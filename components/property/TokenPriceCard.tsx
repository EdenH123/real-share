"use client";

import { useI18n } from "@/lib/i18n";
import type { Property } from "@/lib/seed";
import { estimatedTokenPrice } from "@/lib/seed";
import { formatEUR } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { Coins } from "lucide-react";

export function TokenPriceCard({ p }: { p: Property }) {
  const { t } = useI18n();
  const est = estimatedTokenPrice(p);
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <IconMedallion icon={Coins} size={44} />
        <div className="flex-1">
          <div className="text-xs text-muted">{t("prop.tokenPrice")}</div>
          <div className="num font-display text-xl font-semibold text-ink">
            {formatEUR(p.tokenPrice)}
          </div>
        </div>
        <div className="text-end">
          <div className="flex items-center gap-1 text-xs text-muted">
            {t("trade.estPrice")}
          </div>
          <div className="num font-semibold text-teal">{formatEUR(est, { decimals: 2 })}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
        <span className="text-xs text-muted">
          {t("prop.tokensTotal", { count: p.tokenCount.toLocaleString("en-US") })}
        </span>
        <IllustrativeTag />
      </div>
    </Card>
  );
}
