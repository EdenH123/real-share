"use client";

import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { ShieldAlert, FlaskConical, BarChart3, Landmark } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function LegalPage() {
  const { t } = useI18n();
  const sections: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: ShieldAlert, title: t("legal.s1.title"), body: t("legal.s1.body") },
    { icon: FlaskConical, title: t("legal.s2.title"), body: t("legal.s2.body") },
    { icon: BarChart3, title: t("legal.s3.title"), body: t("legal.s3.body") },
    { icon: Landmark, title: t("legal.s4.title"), body: t("legal.s4.body") },
  ];
  return (
    <div className="pb-10">
      <Header back title={t("legal.title")} showBell={false} />
      <div className="space-y-4 px-4">
        <p className="px-1 text-sm text-muted">{t("legal.intro")}</p>
        {sections.map((s, i) => (
          <Card key={i} className="flex gap-3 p-4">
            <IconMedallion icon={s.icon} size={42} tone="navy" />
            <div>
              <h2 className="text-sm font-bold text-ink">{s.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.body}</p>
            </div>
          </Card>
        ))}
        <Card variant="navy" className="p-4">
          <p className="text-xs leading-relaxed text-white/80">{t("disclaimer.short")}</p>
        </Card>
      </div>
    </div>
  );
}
