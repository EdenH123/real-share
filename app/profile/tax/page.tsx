"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getProperty } from "@/lib/seed";
import { computePortfolio } from "@/lib/portfolio";
import { formatEUR } from "@/lib/format";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { FileSpreadsheet, Download, FileCheck2, Check } from "lucide-react";

const TAX_YEAR = 2025;
const TAX_RATE = 0.25;

export default function TaxReportPage() {
  const { t, locale } = useI18n();
  const { holdings } = useStore();
  const summary = useMemo(() => computePortfolio(holdings), [holdings]);
  const [downloaded, setDownloaded] = useState(false);

  // Dividend-like distributions = accrued income to date.
  const dividends = summary.accrued;
  // Illustrative realized capital gain (e.g. a partial sale on the marketplace).
  const capitalGains = summary.gain > 0 ? summary.gain * 0.4 : 0;
  // 9% Hungarian CIT already paid at company level → creditable foreign tax.
  const foreignTax = (dividends + capitalGains) * 0.09;
  const taxableIncome = dividends + capitalGains;
  const grossTax = taxableIncome * TAX_RATE;
  const estTax = Math.max(0, grossTax - foreignTax);
  const netAfterTax = taxableIncome - estTax;

  const rows = [
    { label: t("tax.dividends"), value: dividends },
    { label: t("tax.capitalGains"), value: capitalGains },
    { label: t("tax.foreignTax"), value: -foreignTax, neg: true },
  ];

  return (
    <div className="pb-10">
      <Header back title={t("tax.title")} showBell={false} />

      <div className="space-y-4 px-4">
        {/* header card */}
        <Card variant="navy" className="p-5">
          <div className="flex items-start gap-3">
            <IconMedallion icon={FileSpreadsheet} size={48} />
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold">
                {t("tax.badge")}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {t("tax.subtitle", { year: TAX_YEAR })}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/70">{t("tax.intro")}</p>
        </Card>

        {/* statement */}
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">
              {t("tax.title")} · {TAX_YEAR}
            </h2>
            <IllustrativeTag />
          </div>

          <div className="space-y-2.5 text-sm">
            {rows.map((r, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-muted">{r.label}</span>
                <span className={`num font-semibold ${r.neg ? "text-negative" : "text-ink"}`}>
                  {r.neg ? "−" : ""}
                  {formatEUR(Math.abs(r.value), { decimals: 2 })}
                </span>
              </div>
            ))}
            <div className="my-1 h-px bg-hairline" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink">{t("tax.taxableIncome")}</span>
              <span className="num font-semibold text-ink">
                {formatEUR(taxableIncome, { decimals: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">{t("tax.estTax")}</span>
              <span className="num font-semibold text-negative">
                −{formatEUR(estTax, { decimals: 2 })}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between rounded-lg bg-positive/8 px-3 py-2.5">
              <span className="font-semibold text-ink">{t("tax.netAfterTax")}</span>
              <span className="num font-display text-lg font-semibold text-positive">
                {formatEUR(netAfterTax, { decimals: 2 })}
              </span>
            </div>
          </div>
        </Card>

        {/* per property */}
        <Card className="p-4">
          <div className="mb-2 flex justify-between text-xs font-semibold text-muted">
            <span>{t("tax.property")}</span>
            <span>{t("tax.dividends")}</span>
          </div>
          <div className="divide-y divide-hairline">
            {summary.views.map((v) => {
              const p = getProperty(v.propertyId)!;
              return (
                <div key={v.propertyId} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-ink">{t(p.cityKey)}</span>
                  <span className="num font-semibold text-ink">
                    {formatEUR(v.accrued, { decimals: 2 })}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* form 1301 */}
        <Card variant="tint" className="flex items-center gap-3 p-4">
          <FileCheck2 size={20} className="text-teal" />
          <span className="flex-1 text-sm text-ink">{t("tax.form")}</span>
          <Check size={18} className="text-positive" />
        </Card>

        <Button
          size="lg"
          className="no-print"
          onClick={() => {
            setDownloaded(true);
            if (typeof window !== "undefined") window.print();
          }}
        >
          <Download size={18} />
          {downloaded ? t("common.done") : t("tax.download")}
        </Button>
        <p className="text-center text-[11px] leading-relaxed text-muted">
          {t("tax.downloadNote")}
        </p>
      </div>
    </div>
  );
}
