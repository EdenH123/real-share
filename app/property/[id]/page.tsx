"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { getProperty } from "@/lib/seed";
import { propAbout, propDistrict, propTitle, fundingPct } from "@/lib/property";
import { formatEUR, formatPct } from "@/lib/format";
import { Header } from "@/components/layout/Header";
import { PropertyImage } from "@/components/property/PropertyImage";
import { StatusChip } from "@/components/ui/StatusChip";
import { StatWaterfall } from "@/components/property/StatWaterfall";
import { TokenPriceCard } from "@/components/property/TokenPriceCard";
import { VoteCard } from "@/components/property/VoteCard";
import { ScenarioChart } from "@/components/charts/ScenarioChart";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { NotFoundInline } from "@/components/ui/NotFoundInline";
import { useParallax } from "@/components/fx/useParallax";
import { useEffect } from "react";
import { track } from "@/lib/track";
import {
  MapPin,
  Percent,
  Wallet,
  TrendingUp,
  FileText,
  FileCheck2,
  ScrollText,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const MiniMap = dynamic(() => import("@/components/map/MiniMap"), {
  ssr: false,
  loading: () => (
    <div
      className="h-36 rounded-card"
      style={{ background: "#0F2233" }}
      aria-hidden
    />
  ),
});

export default function PropertyDetailPage() {
  const { t, locale } = useI18n();
  const params = useParams();
  const heroRef = useParallax<HTMLDivElement>(0.35);
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const p = id ? getProperty(id) : undefined;

  useEffect(() => {
    if (id) track("view_property", { property: id });
  }, [id]);

  if (!p) return <NotFoundInline />;

  const pct = fundingPct(p);
  const figures = [
    { icon: Landmark, label: t("prop.price"), value: formatEUR(p.price) },
    { icon: Percent, label: t("prop.grossYield"), value: formatPct(p.grossYield), tag: true },
    { icon: TrendingUp, label: t("prop.netYield"), value: formatPct(p.netYield, { decimals: 2 }), tag: true },
    { icon: Wallet, label: t("prop.monthlyRent"), value: formatEUR(p.monthlyRent) },
  ];

  const docs = [
    { icon: FileCheck2, label: t("prop.doc.appraisal") },
    { icon: ScrollText, label: t("prop.doc.title") },
    { icon: FileText, label: t("prop.doc.tenancy") },
    { icon: FileText, label: t("prop.doc.tax") },
  ];

  const canInvest = p.status === "funding" || p.status === "active";


  return (
    <div className="pb-2">
      {/* hero image with overlaid back header — gentle scroll parallax */}
      <div className="relative overflow-hidden">
        <div ref={heroRef} className="will-change-transform">
          <PropertyImage theme={p.theme} market={p.market} height="h-60" rounded="rounded-none" />
        </div>
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-navy/60 to-transparent">
          <Header back onDark showBell={false} />
        </div>
        <div className="absolute bottom-3 start-4">
          <StatusChip status={p.status} />
        </div>
      </div>

      <div className="space-y-5 px-4 pt-4">
        {/* title */}
        <div>
          <div className="flex items-center gap-1 text-sm font-medium text-muted">
            <MapPin size={15} className="text-teal" />
            {t(p.cityKey)} · {propDistrict(p, locale)}
          </div>
          <h1 className="mt-1 font-display text-2xl font-semibold leading-tight text-ink">
            {propTitle(p, locale)}
          </h1>
        </div>

        {/* exit-vote simulation */}
        {p.status === "exitVote" && <VoteCard propertyId={p.id} />}

        {/* funding progress */}
        {p.status === "funding" && (
          <Card className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gold-text">
                <span className="num">{pct}%</span> {t("prop.funded")}
              </span>
              <span className="text-muted">{t("prop.daysLeft", { days: p.daysLeft })}</span>
            </div>
            <ProgressBar pct={pct} className="mt-2" animate ticks />
            <div className="mt-2 flex justify-between text-xs text-muted">
              <span className="num">{t("prop.raised", { amount: formatEUR(p.fundingRaised) })}</span>
              <span className="num">{t("prop.target", { amount: formatEUR(p.fundingTarget) })}</span>
            </div>
          </Card>
        )}

        {/* key figures */}
        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">
            {t("prop.keyFigures")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {figures.map((f, i) => (
              <Card key={i} className="p-3.5">
                <IconMedallion icon={f.icon} size={38} />
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
                  {f.label}
                  {f.tag && <IllustrativeTag />}
                </div>
                <div className="num font-display text-lg font-semibold text-ink">
                  {f.value}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* token price */}
        <TokenPriceCard p={p} />

        {/* the numbers / waterfall — flagship worked example */}
        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">
            {t("prop.theNumbers")}
          </h2>
          <StatWaterfall />
        </div>

        {/* your €1,000 over 5 years */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-ink">
              {t("prop.your5yr")}
            </h3>
            <IllustrativeTag />
          </div>
          <div className="mt-3">
            <ScenarioChart />
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink">{t("prop.total5yr")}</span>
              <span className="num font-display text-lg font-semibold text-positive">
                +€471–€744
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{t("prop.annualized")}</span>
              <span className="num">~8–12%{t("common.perYear")}</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted">
            {t("prop.returnNote")}
          </p>
        </Card>

        {/* about */}
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-ink">
            {t("prop.about")}
          </h2>
          <p className="text-sm leading-relaxed text-muted">{propAbout(p, locale)}</p>
        </div>

        {/* location mini-map */}
        <div>
          <MiniMap lat={p.lat} lng={p.lng} />
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted">
            <MapPin size={12} className="text-teal" />
            {t(p.cityKey)} · {propDistrict(p, locale)} · {t("map.approxLocation")}
          </div>
        </div>

        {/* appraisal + market */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3.5">
            <div className="text-[11px] text-muted">{t("prop.appraisalValue")}</div>
            <div className="num font-display text-lg font-semibold text-ink">
              {formatEUR(p.appraisalValue)}
            </div>
          </Card>
          <Card className="p-3.5">
            <div className="flex items-center gap-1 text-[11px] text-muted">
              {t("prop.marketAppreciation")}
            </div>
            <div className="num font-display text-lg font-semibold text-teal">
              ~{p.marketAppreciation}%
            </div>
          </Card>
        </div>

        {/* escrow note */}
        <Card variant="tint" className="flex gap-3 p-4">
          <IconMedallion icon={ShieldCheck} size={40} tone="navy" />
          <p className="text-xs leading-relaxed text-muted">{t("prop.escrowNote")}</p>
        </Card>

        {/* documents */}
        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">
            {t("prop.documents")}
          </h2>
          <Card className="divide-y divide-hairline">
            {docs.map((d, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5">
                <d.icon size={18} className="text-teal" />
                <span className="flex-1 text-sm text-ink">{d.label}</span>
                <IllustrativeTag />
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* sticky CTA */}
      <div className="sticky bottom-0 z-30">
        <div className="mx-3 mb-3 flex gap-2 rounded-2xl bg-surface/95 p-3 shadow-cardHover backdrop-blur">
          <ButtonLink
            href={`/trade?property=${p.id}`}
            variant="secondary"
            size="md"
            className="flex-1"
          >
            {t("prop.tradeTokens")}
          </ButtonLink>
          <ButtonLink
            href={canInvest ? `/invest/${p.id}` : `/property/${p.id}`}
            variant="gold"
            size="md"
            className="flex-[2]"
          >
            {t("prop.invest")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
