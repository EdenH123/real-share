"use client";

import { useI18n } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { ClipboardCheck, PiggyBank, Building, Vote } from "lucide-react";
import { IconMedallion } from "@/components/ui/IconMedallion";
import type { LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ClipboardCheck, title: "home.how.step1.title", body: "home.how.step1.body" },
  { icon: PiggyBank, title: "home.how.step2.title", body: "home.how.step2.body" },
  { icon: Building, title: "home.how.step3.title", body: "home.how.step3.body" },
  { icon: Vote, title: "home.how.step4.title", body: "home.how.step4.body" },
];

export function HowItWorks() {
  const { t } = useI18n();
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {STEPS.map((s, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <IconMedallion icon={s.icon} size={40} />
              {i < STEPS.length - 1 && <div className="mt-1 h-full w-px flex-1 bg-hairline" />}
            </div>
            <div className="pb-1">
              <h3 className="text-sm font-bold text-ink">{t(s.title)}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{t(s.body)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
