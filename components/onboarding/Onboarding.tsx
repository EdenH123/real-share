"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { PieChart, Coins, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

const SLIDES: { icon: LucideIcon; eyebrow: string; title: string; body: string }[] = [
  { icon: PieChart, eyebrow: "ob.slide1.eyebrow", title: "ob.slide1.title", body: "ob.slide1.body" },
  { icon: Coins, eyebrow: "ob.slide2.eyebrow", title: "ob.slide2.title", body: "ob.slide2.body" },
  { icon: ShieldCheck, eyebrow: "ob.slide3.eyebrow", title: "ob.slide3.title", body: "ob.slide3.body" },
];

export function Onboarding({ onFinish }: { onFinish: () => void }) {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const last = i === SLIDES.length - 1;

  if (showWaitlist) {
    return (
      <div className="flex h-full flex-col bg-surface">
        <div className="flex items-center justify-between p-4">
          <LanguageToggle />
          <button onClick={onFinish} className="text-sm font-semibold text-muted">
            {t("common.skip")}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <WaitlistForm onDone={() => setTimeout(onFinish, 1400)} />
          <button
            onClick={onFinish}
            className="mt-6 w-full text-center text-sm font-semibold text-teal"
          >
            {t("ob.cta")}
          </button>
        </div>
      </div>
    );
  }

  const slide = SLIDES[i];

  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-[#0F2233] via-[#132a40] to-[#0F2233] text-white">
      <div className="flex items-center justify-between p-4">
        <LanguageToggle variant="dark" />
        <button onClick={onFinish} className="text-sm font-semibold text-white/70">
          {t("common.skip")}
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-8 grid h-24 w-24 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
          <IconMedallion icon={slide.icon} size={72} />
        </div>
        <div className="eyebrow !text-gold">{t(slide.eyebrow)}</div>
        <h1 key={slide.title} className="mt-3 font-display text-3xl font-semibold leading-tight animate-fade-up">
          {t(slide.title)}
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/75">
          {t(slide.body)}
        </p>
      </div>

      <div className="p-6 pb-8">
        <div className="mb-5 flex justify-center gap-2">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-6 bg-gold" : "w-1.5 bg-white/25"
              )}
            />
          ))}
        </div>
        <Button
          size="lg"
          onClick={() => (last ? setShowWaitlist(true) : setI(i + 1))}
        >
          {last ? t("ob.join") : t("common.next")}
        </Button>
        {last && (
          <button
            onClick={onFinish}
            className="mt-3 w-full text-center text-sm font-semibold text-white/70"
          >
            {t("ob.cta")}
          </button>
        )}
      </div>
    </div>
  );
}
