"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MarketsTable } from "@/components/home/MarketsTable";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Building2, ShieldAlert } from "lucide-react";

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="pb-10">
      <Header back title={t("about.title")} showBell={false} />
      <div className="space-y-5 px-4">
        <Card variant="navy" className="p-5">
          <IconMedallion icon={Building2} size={52} />
          <div className="eyebrow !text-gold mt-3">{t("brand.name")}</div>
          <h1 className="mt-1 font-display text-2xl font-semibold text-white">
            {t("about.tagline")}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{t("about.body")}</p>
        </Card>

        <div>
          <SectionTitle>{t("about.how.title")}</SectionTitle>
          <HowItWorks />
        </div>

        <div>
          <SectionTitle>{t("about.markets.title")}</SectionTitle>
          <MarketsTable />
        </div>

        <Link href="/legal">
          <Card className="flex items-center gap-3 p-4">
            <ShieldAlert size={18} className="text-gold-text" />
            <span className="flex-1 text-sm font-semibold text-ink">
              {t("about.disclaimerLink")}
            </span>
          </Card>
        </Link>
      </div>
    </div>
  );
}
