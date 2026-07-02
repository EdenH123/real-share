"use client";

import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { SEED_NOTIFICATIONS, type NotificationType } from "@/lib/seed";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { formatDate } from "@/lib/format";
import { Coins, PiggyBank, Vote, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<NotificationType, LucideIcon> = {
  payout: Coins,
  round: PiggyBank,
  vote: Vote,
  system: Sparkles,
};

const TYPE_KEY: Record<NotificationType, string> = {
  payout: "notif.type.payout",
  round: "notif.type.round",
  vote: "notif.type.vote",
  system: "notif.type.system",
};

export default function NotificationsPage() {
  const { t, locale } = useI18n();
  const { isRead, markAllRead, ready } = useStore();

  return (
    <div className="pb-8">
      <Header
        back
        title={t("notif.title")}
        showBell={false}
        right={
          <button
            onClick={markAllRead}
            className="rounded-full bg-tint px-3 py-1.5 text-xs font-semibold text-teal"
          >
            {t("notif.markAllRead")}
          </button>
        }
      />

      <div className="space-y-3 px-4">
        {SEED_NOTIFICATIONS.map((n) => {
          const Icon = ICONS[n.type];
          const read = ready ? isRead(n.id) : n.read;
          return (
            <Card
              key={n.id}
              className={`flex gap-3 p-4 ${read ? "" : "ring-1 ring-teal/30"}`}
            >
              <IconMedallion icon={Icon} size={42} tone={n.type === "payout" ? "gold" : "navy"} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="eyebrow">{t(TYPE_KEY[n.type])}</span>
                  {!read && <span className="h-2 w-2 rounded-full bg-teal" />}
                </div>
                <h3 className="mt-0.5 text-sm font-semibold text-ink">
                  {locale === "he" ? n.titleHe : n.titleEn}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {locale === "he" ? n.bodyHe : n.bodyEn}
                </p>
                <div className="mt-1 text-[11px] text-muted">{formatDate(n.date, locale)}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
