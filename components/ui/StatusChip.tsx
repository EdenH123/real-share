"use client";

import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import type { PropertyStatus } from "@/lib/seed";
import { Circle } from "lucide-react";

const styles: Record<PropertyStatus, string> = {
  funding: "bg-gold/15 text-gold-text",
  active: "bg-positive/12 text-positive",
  failed: "bg-negative/12 text-negative",
  exitVote: "bg-teal/12 text-teal",
};

const keys: Record<PropertyStatus, string> = {
  funding: "status.funding",
  active: "status.active",
  failed: "status.failed",
  exitVote: "status.exitVote",
};

export function StatusChip({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[status],
        className
      )}
    >
      <Circle size={7} className="fill-current" />
      {t(keys[status])}
    </span>
  );
}
