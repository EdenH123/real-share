"use client";

import { Sheet } from "@/components/ui/Sheet";
import { WaitlistForm } from "./WaitlistForm";
import { useI18n } from "@/lib/i18n";

export function WaitlistSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useI18n();
  return (
    <Sheet open={open} onClose={onClose} title={t("waitlist.title")}>
      <WaitlistForm compact onDone={() => { /* keep sheet open to show success */ }} />
    </Sheet>
  );
}
