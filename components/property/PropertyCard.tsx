"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import type { Property } from "@/lib/seed";
import { propDistrict, propTitle, fundingPct } from "@/lib/property";
import { formatEUR, formatPct } from "@/lib/format";
import { PropertyImage } from "./PropertyImage";
import { StatusChip } from "@/components/ui/StatusChip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";
import { MapPin } from "lucide-react";

export function PropertyCard({ p }: { p: Property }) {
  const { t, locale } = useI18n();
  const pct = fundingPct(p);

  return (
    <Link href={`/property/${p.id}`} className="block">
      <Card className="press lift overflow-hidden hover:shadow-cardHover">
        <div className="relative">
          <PropertyImage
            theme={p.theme}
            market={p.market}
            height="h-40"
            rounded="rounded-none"
          />
          <div className="absolute start-3 top-3">
            <StatusChip status={p.status} />
          </div>
          <div className="absolute end-3 top-3 rounded-full bg-navy/70 px-2.5 py-1 text-xs font-bold text-gold backdrop-blur">
            <span className="num">{formatPct(p.grossYield)}</span> {t("prop.grossYield")}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 text-xs font-medium text-muted">
            <MapPin size={13} className="text-teal" />
            {t(p.cityKey)} · {propDistrict(p, locale)}
          </div>
          <h3 className="mt-1 line-clamp-1 font-display text-[17px] font-semibold text-ink">
            {propTitle(p, locale)}
          </h3>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="text-[11px] text-muted">{t("prop.price")}</div>
              <div className="num font-display text-lg font-semibold text-ink">
                {formatEUR(p.price)}
              </div>
            </div>
            <div className="text-end">
              <div className="text-[11px] text-muted">{t("prop.tokenPrice")}</div>
              <div className="num font-semibold text-teal">
                {formatEUR(p.tokenPrice)}
              </div>
            </div>
          </div>

          {p.status === "funding" && (
            <div className="mt-3">
              <ProgressBar pct={pct} />
              <div className="mt-1.5 flex justify-between text-[11px] font-medium">
                <span className="text-gold-text">
                  <span className="num">{pct}%</span> {t("prop.funded")}
                </span>
                <span className="text-muted">
                  {t("prop.daysLeft", { days: p.daysLeft })}
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
