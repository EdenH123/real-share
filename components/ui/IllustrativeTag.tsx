"use client";

import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { Info } from "lucide-react";

/** Small "Illustrative" marker to attach to any yield/return figure. */
export function IllustrativeTag({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-tint px-2 py-0.5 text-[10px] font-semibold text-muted",
        className
      )}
    >
      <Info size={10} />
      {t("common.illustrative")}
    </span>
  );
}
