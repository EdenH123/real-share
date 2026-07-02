"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { SEED_USER } from "@/lib/seed";
import { Header } from "@/components/layout/Header";
import { HeroShell } from "@/components/layout/HeroShell";
import { Card } from "@/components/ui/Card";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import {
  BadgeCheck,
  FileSpreadsheet,
  Bell,
  Info,
  ShieldAlert,
  LifeBuoy,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Languages,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function ProfilePage() {
  const { t, locale, dir } = useI18n();
  const { resetDemo, waitlist } = useStore();
  const [resetMsg, setResetMsg] = useState(false);

  const name = locale === "he" ? SEED_USER.nameHe : SEED_USER.name;
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  function handleReset() {
    resetDemo();
    setResetMsg(true);
    setTimeout(() => setResetMsg(false), 2200);
  }

  const links: { href: string; icon: LucideIcon; label: string; sub?: string; highlight?: boolean }[] = [
    {
      href: "/profile/tax",
      icon: FileSpreadsheet,
      label: t("profile.taxReport"),
      sub: t("profile.taxReport.sub"),
      highlight: true,
    },
    { href: "/notifications", icon: Bell, label: t("profile.notifications") },
    { href: "/waitlist", icon: BadgeCheck, label: t("ob.join") },
  ];

  const hero = (
    <>
      <Header title={t("profile.title")} showLang={false} showBell={false} onDark />
      <div className="flex items-center gap-4 px-5 pt-1">
        <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-gradient-to-br from-[#EBB877] to-gold font-display text-3xl font-semibold text-navy ring-2 ring-gold/40 ring-offset-4 ring-offset-transparent">
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-xl font-semibold text-white">{name}</div>
          <div className="truncate text-sm text-white/70" dir="ltr">
            {waitlist?.email ?? SEED_USER.email}
          </div>
          <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/[.08] px-2.5 py-1 text-[11px] font-semibold text-[#7fd3ab] ring-1 ring-white/[.14]">
            <BadgeCheck size={12} />
            {t("profile.kyc")}: {t("profile.kyc.verified")}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <HeroShell hero={hero} className="pb-8">
      <div className="space-y-5 px-4">

        {/* language toggle row */}
        <Card className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <IconMedallion icon={Languages} size={40} />
            <span className="text-sm font-semibold text-ink">{t("profile.language")}</span>
          </div>
          <LanguageToggle />
        </Card>

        {/* primary links */}
        <div className="space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <Card
                className={`flex items-center gap-3 p-4 ${
                  l.highlight ? "ring-1 ring-gold/40" : ""
                }`}
              >
                <IconMedallion icon={l.icon} size={42} tone={l.highlight ? "gold" : "navy"} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink">{l.label}</div>
                  {l.sub && <div className="text-xs text-muted">{l.sub}</div>}
                </div>
                <Chevron size={18} className="text-muted" />
              </Card>
            </Link>
          ))}
        </div>

        {/* settings list */}
        <Card className="divide-y divide-hairline">
          <SettingRow icon={Info} label={t("profile.about")} chevron={<Chevron size={18} />} href="/about" />
          <SettingRow
            icon={ShieldAlert}
            label={t("profile.legal")}
            chevron={<Chevron size={18} />}
            href="/legal"
          />
          <button
            onClick={handleReset}
            className="flex w-full items-center gap-3 p-4 text-start"
          >
            <RotateCcw size={18} className="text-negative" />
            <span className="flex-1 text-sm font-semibold text-negative">
              {resetMsg ? t("profile.signOutDone") : t("profile.signOut")}
            </span>
          </button>
        </Card>

        <p className="px-1 text-center text-[11px] text-muted">
          {t("brand.name")} · {t("common.preview")}
        </p>
      </div>
    </HeroShell>
  );
}

function SettingRow({
  icon: Icon,
  label,
  chevron,
  href,
}: {
  icon: LucideIcon;
  label: string;
  chevron: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 p-4">
      <Icon size={18} className="text-teal" />
      <span className="flex-1 text-sm font-semibold text-ink">{label}</span>
      <span className="text-muted">{chevron}</span>
    </Link>
  );
}
