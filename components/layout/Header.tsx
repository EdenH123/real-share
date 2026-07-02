"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Bell } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { SEED_NOTIFICATIONS } from "@/lib/seed";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/cn";

/** App header. Two modes: main (title + actions) or back (back button + title). */
export function Header({
  title,
  subtitle,
  back = false,
  showLang = true,
  showBell = true,
  onDark = false,
  avatar,
  right,
}: {
  title?: string;
  subtitle?: string;
  back?: boolean;
  showLang?: boolean;
  showBell?: boolean;
  onDark?: boolean;
  /** initial letter for a gold-ringed avatar medallion before the title */
  avatar?: string;
  right?: React.ReactNode;
}) {
  const { t, dir } = useI18n();
  const router = useRouter();
  const { isRead, ready } = useStore();

  const unread =
    ready && SEED_NOTIFICATIONS.some((n) => !isRead(n.id));

  const BackIcon = dir === "rtl" ? ChevronRight : ChevronLeft;

  return (
    <header
      className={cn(
        "flex items-center gap-3 px-4 pt-4 pb-3",
        onDark ? "text-white" : "text-ink"
      )}
    >
      {back && (
        <button
          onClick={() => router.back()}
          className={cn(
            "no-print grid h-10 w-10 shrink-0 place-items-center rounded-full",
            onDark ? "bg-white/10 text-white" : "bg-tint text-ink"
          )}
          aria-label={t("common.back")}
        >
          <BackIcon size={22} />
        </button>
      )}
      {avatar && (
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#EBB877] to-gold font-display text-lg font-semibold text-navy ring-2 ring-gold/40 ring-offset-2 ring-offset-transparent"
          aria-hidden
        >
          {avatar}
        </span>
      )}
      <div className="min-w-0 flex-1">
        {title && (
          <h1 className="truncate font-display text-xl font-semibold leading-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className={cn("truncate text-[13px]", onDark ? "text-white/70" : "text-muted")}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="no-print flex shrink-0 items-center gap-2">
        {right}
        {showLang && <LanguageToggle variant={onDark ? "dark" : "light"} />}
        {showBell && (
          <Link
            href="/notifications"
            className={cn(
              "relative grid h-10 w-10 place-items-center rounded-full",
              onDark ? "bg-white/10 text-white" : "bg-tint text-ink"
            )}
            aria-label={t("notif.title")}
          >
            <Bell size={19} />
            {unread && (
              <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-negative ring-2 ring-surface" />
            )}
          </Link>
        )}
      </div>
    </header>
  );
}
