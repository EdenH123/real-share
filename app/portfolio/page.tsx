"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getProperty, SEED_DISTRIBUTIONS } from "@/lib/seed";
import { propTitle } from "@/lib/property";
import { computePortfolio } from "@/lib/portfolio";
import { formatEUR, formatPct, formatDate } from "@/lib/format";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PropertyImage } from "@/components/property/PropertyImage";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Wallet, TrendingUp, ChevronLeft, ChevronRight, Coins } from "lucide-react";

export default function PortfolioPage() {
  const { t, locale, dir } = useI18n();
  const { holdings, ready } = useStore();
  const summary = useMemo(() => computePortfolio(holdings), [holdings]);

  const dists = useMemo(() => {
    const ids = new Set(holdings.map((h) => h.propertyId));
    return SEED_DISTRIBUTIONS.filter((d) => ids.has(d.propertyId)).sort((a, b) =>
      a.date < b.date ? 1 : -1
    );
  }, [holdings]);

  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  if (ready && holdings.length === 0) {
    return (
      <div>
        <Header title={t("pf.title")} subtitle={t("pf.subtitle")} />
        <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
          <IconMedallion icon={Wallet} size={64} tone="navy" />
          <h1 className="font-display text-xl font-semibold text-ink">{t("pf.empty.title")}</h1>
          <p className="max-w-xs text-sm text-muted">{t("pf.empty.body")}</p>
          <ButtonLink href="/map" variant="gold" size="md">
            {t("pf.empty.cta")}
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <Header title={t("pf.title")} subtitle={t("pf.subtitle")} />

      <div className="space-y-5 px-4">
        {/* summary hero */}
        <Card variant="navy" className="relative overflow-hidden p-5">
          <div className="absolute -end-8 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl" />
          <div className="relative">
            <div className="text-xs text-white/70">{t("pf.totalValue")}</div>
            <div className="num mt-1 font-display text-4xl font-semibold text-white">
              {formatEUR(summary.currentValue, { decimals: 2 })}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-sm">
              <TrendingUp size={15} className="text-positive" />
              <span className="num font-semibold text-positive">
                {formatPct(summary.gainPct, { sign: true })}
              </span>
              <span className="num text-white/70">
                (+{formatEUR(summary.gain, { decimals: 2 })})
              </span>
              <IllustrativeTag className="!bg-white/10 !text-white/70" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Stat label={t("pf.investedTitle")} value={formatEUR(summary.invested, { decimals: 0 })} />
              <Stat label={t("pf.accrued")} value={formatEUR(summary.accrued, { decimals: 2 })} gold />
              <Stat label={t("pf.nextPayout")} value={formatEUR(summary.nextPayout, { decimals: 2 })} gold />
            </div>
          </div>
        </Card>

        {/* holdings */}
        <div>
          <SectionTitle>{t("pf.holdings")}</SectionTitle>
          <div className="space-y-3">
            {summary.views.map((v) => {
              const p = getProperty(v.propertyId)!;
              return (
                <Link key={v.propertyId} href={`/property/${v.propertyId}`}>
                  <Card className="flex items-center gap-3 p-3">
                    <PropertyImage
                      theme={p.theme}
                      height="h-16"
                      className="!w-16 shrink-0"
                      rounded="rounded-xl"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-ink">
                        {propTitle(p, locale)}
                      </div>
                      <div className="text-xs text-muted">
                        {t("pf.tokensHeld", { count: v.tokens })} · {t(p.cityKey)}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="num font-semibold text-ink">
                          {formatEUR(v.currentValue, { decimals: 2 })}
                        </span>
                        <span className="num font-semibold text-positive">
                          {formatPct(v.gainPct, { sign: true })}
                        </span>
                      </div>
                    </div>
                    <Chevron size={18} className="text-muted" />
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* distributions */}
        <div>
          <SectionTitle>{t("pf.distributions")}</SectionTitle>
          <Card className="divide-y divide-hairline">
            {dists.map((d, i) => {
              const p = getProperty(d.propertyId)!;
              const holding = holdings.find((h) => h.propertyId === d.propertyId);
              const amount = (holding?.tokens ?? 0) * d.amountPerToken;
              return (
                <div key={i} className="flex items-center gap-3 p-3.5">
                  <IconMedallion icon={Coins} size={38} tone={d.paid ? "navy" : "gold"} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-ink">{t(p.cityKey)}</div>
                    <div className="text-xs text-muted">{formatDate(d.date, locale)}</div>
                  </div>
                  <div className="text-end">
                    <div className="num text-sm font-semibold text-ink">
                      {formatEUR(amount, { decimals: 2 })}
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${
                        d.paid ? "text-positive" : "text-gold-text"
                      }`}
                    >
                      {d.paid ? t("pf.paid") : t("pf.upcoming")}
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="rounded-xl bg-white/5 p-2.5">
      <div className="text-[10px] text-white/60">{label}</div>
      <div className={`num mt-0.5 text-sm font-semibold ${gold ? "text-gold" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}
