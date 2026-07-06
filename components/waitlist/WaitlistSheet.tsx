"use client";

import { Sheet } from "@/components/ui/Sheet";
import { WaitlistForm, type InvestIntent } from "./WaitlistForm";
import { useI18n } from "@/lib/i18n";

export function WaitlistSheet({
  open,
  onClose,
  intent,
}: {
  open: boolean;
  onClose: () => void;
  /** sized, non-binding interest carried in from the invest flow */
  intent?: InvestIntent;
}) {
  const { t } = useI18n();
  return (
    <Sheet open={open} onClose={onClose} title={t("waitlist.title")}>
      <WaitlistForm compact intent={intent} onDone={() => { /* keep sheet open to show success */ }} />
    </Sheet>
  );
}
