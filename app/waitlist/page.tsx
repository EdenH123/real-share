"use client";

import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { Card } from "@/components/ui/Card";

export default function WaitlistPage() {
  const { t } = useI18n();
  return (
    <div className="pb-8">
      <Header back title={t("waitlist.title")} showBell={false} />
      <div className="px-4">
        <Card className="p-5">
          <WaitlistForm />
        </Card>
      </div>
    </div>
  );
}
