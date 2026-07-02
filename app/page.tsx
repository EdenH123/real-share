"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { PROPERTIES, SEED_USER } from "@/lib/seed";
import { computePortfolio } from "@/lib/portfolio";
import { formatEUR, formatPct } from "@/lib/format";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { PropertyCard } from "@/components/property/PropertyCard";
import { MarketsTable } from "@/components/home/MarketsTable";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { WaitlistSheet } from "@/components/waitlist/WaitlistSheet";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { Skeleton } from "@/components/ui/Skeleton";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { InstallPromptCard } from "@/components/home/InstallPromptCard";
import { cn } from "@/lib/cn";
import { ArrowUpRight, TrendingUp, Sparkles, Rocket } from "lucide-react";

type Filter = "all" | "hot" | "highYield" | "funding";

export default function HomePage() {
  const { t, locale } = useI18n();
  const { holdings, ready } = useStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [waitlist, setWaitlist] = useState(false);

  const summary = useMemo(() => computePortfolio(holdings), [holdings]);

  const filtered = useMemo(() => {
    if (filter === "all") return PROPERTIES;
    if (filter === "funding") return PROPERTIES.filter((p) => p.status === "funding");
    return PROPERTIES.filter((p) => p.tags.includes(filter));
  }, [filter]);

  const name = locale === "he" ? SEED_USER.nameHe : SEED_USER.name;

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t("home.filter.all") },
    { id: "hot", label: t("home.filter.hot") },
    { id: "highYield", label: t("home.filter.highYield") },
    { id: "funding", label: t("home.filter.openFunding") },
  ];

  return (
    <div className="pb-6">
      <Header title={t("home.greeting", { name })} subtitle={t("home.subtitle")} />

      {/* Portfolio snapshot hero */}
      <div className="px-4">
        <Card variant="navy" className="relative overflow-hidden p-5">
          <div className="absolute -end-8 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/70">
                {t("home.portfolioValue")}
              </span>
              <Link
                href="/portfolio"
                className="flex items-center gap-1 text-xs font-semibold text-gold"
              >
                {t("home.viewPortfolio")}
                <ArrowUpRight size={14} className="rtl:-scale-x-100" />
              </Link>
            </div>
            {ready ? (
              <>
                <div className="num mt-1 font-display text-4xl font-semibold text-white">
                  <CountUp
                    value={summary.currentValue}
                    format={(n) => formatEUR(n, { decimals: 0 })}
                  />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm">
                  <TrendingUp size={15} className="text-positive" />
                  <span className="num font-semibold text-positive">
                    {formatPct(summary.gainPct, { sign: true })}
                  </span>
                  <span className="text-white/50">·</span>
                  <span className="num text-white/70">
                    +{formatEUR(summary.gain)} {t("home.totalReturn")}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Skeleton dark className="mt-1.5 h-10 w-44 rounded-lg" />
                <Skeleton dark className="mt-2 h-4 w-52 rounded" />
              </>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-3">
                <div className="text-[11px] text-white/60">{t("home.monthlyIncome")}</div>
                {ready ? (
                  <div className="num mt-0.5 font-semibold text-white">
                    {formatEUR(summary.monthlyIncome, { decimals: 0 })}
                    <span className="text-xs font-normal text-white/50">/{t("common.month")}</span>
                  </div>
                ) : (
                  <Skeleton dark className="mt-1 h-5 w-20 rounded" />
                )}
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <div className="text-[11px] text-white/60">{t("home.nextPayout")}</div>
                {ready ? (
                  <div className="num mt-0.5 font-semibold text-gold">
                    {formatEUR(summary.nextPayout, { decimals: 2 })}
                  </div>
                ) : (
                  <Skeleton dark className="mt-1 h-5 w-16 rounded" />
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Install prompt (shown only when installable / iOS & not dismissed) */}
      <div className="mt-4 px-4">
        <InstallPromptCard />
      </div>

      {/* Featured with filters */}
      <div className="mt-6">
        <SectionTitle link={t("common.seeAll")} linkHref="/map" className="mx-4">
          {t("home.featured")}
        </SectionTitle>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                filter === f.id ? "bg-navy text-white" : "bg-tint text-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="mt-3 space-y-4 px-4">
          {!ready
            ? [0, 1].map((i) => <PropertyCardSkeleton key={i} />)
            : filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 4) * 60}>
                  <PropertyCard p={p} />
                </Reveal>
              ))}
        </div>
      </div>

      {/* How it works */}
      <Reveal className="mt-8 px-4">
        <SectionTitle>{t("home.how.title")}</SectionTitle>
        <HowItWorks />
      </Reveal>

      {/* Markets */}
      <Reveal className="mt-8 px-4">
        <div className="mb-3 px-1">
          <h2 className="font-display text-lg font-semibold text-ink">
            {t("home.markets.title")}
          </h2>
          <p className="text-xs text-muted">{t("home.markets.subtitle")}</p>
        </div>
        <MarketsTable />
      </Reveal>

      {/* Waitlist CTA */}
      <Reveal className="mt-8 px-4">
        <Card variant="navy" className="flex items-center gap-4 p-5">
          <IconMedallion icon={Rocket} size={48} />
          <div className="flex-1">
            <h3 className="font-display text-base font-semibold text-white">
              {t("home.joinCta.title")}
            </h3>
            <p className="mt-0.5 text-xs text-white/70">{t("home.joinCta.body")}</p>
          </div>
        </Card>
        <Button className="mt-3" size="lg" onClick={() => setWaitlist(true)}>
          <Sparkles size={18} />
          {t("ob.join")}
        </Button>
      </Reveal>

      <WaitlistSheet open={waitlist} onClose={() => setWaitlist(false)} />
    </div>
  );
}

function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card bg-surface shadow-card">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-28 rounded" />
        <Skeleton className="h-5 w-48 rounded" />
        <div className="flex items-end justify-between">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
