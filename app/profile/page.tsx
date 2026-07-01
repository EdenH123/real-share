"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { SEED_USER } from "@/lib/seed";
import { Header } from "@/components/layout/Header";
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

  return (
    <div className="pb-8">
      <Header title={t("profile.title")} showLang={false} showBell={false} />

      <div className="space-y-5 px-4">
        {/* user card */}
        <Card variant="navy" className="p-5">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gold font-display text-2xl font-semibold text-navy">
              {name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display text-lg font-semibold text-white">{name}</div>
              <div className="truncate text-sm text-white/70" dir="ltr">
                {waitlist?.email ?? SEED_USER.email}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-positive/20 px-2 py-0.5 text-[11px] font-semibold text-[#7fd3ab]">
                <BadgeCheck size={12} />
                {t("profile.kyc")}: {t("profile.kyc.verified")}
              </div>
            </div>
          </div>
        </Card>

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
    </div>
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
