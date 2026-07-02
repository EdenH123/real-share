"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Sheet } from "./Sheet";
import { ShieldAlert, ChevronUp } from "lucide-react";

/**
 * Persistent, always-visible plain-language disclaimer legend (HE + EN).
 * Tapping opens the full legal disclaimer.
 */
export function DisclaimerBar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 border-t border-hairline bg-navy px-3 py-2 text-start text-white/90"
        aria-label={t("disclaimer.title")}
      >
        <ShieldAlert size={15} className="shrink-0 text-gold" />
        <span className="line-clamp-1 flex-1 text-[11px] leading-tight text-white/80">
          {t("disclaimer.short")}
        </span>
        <ChevronUp size={14} className="shrink-0 text-white/50" />
      </button>

      <Sheet open={open} onClose={() => setOpen(false)} title={t("disclaimer.title")}>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold-text">
            <ShieldAlert size={14} />
            {t("disclaimer.badge")}
          </div>
          <p className="text-sm leading-relaxed text-ink">{t("disclaimer.full")}</p>
          <div className="rounded-card bg-tint p-3 text-xs leading-relaxed text-muted">
            {t("disclaimer.short")}
          </div>
        </div>
      </Sheet>
    </>
  );
}
