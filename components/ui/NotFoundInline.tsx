"use client";

import { useI18n } from "@/lib/i18n";
import { ButtonLink } from "./Button";
import { Header } from "@/components/layout/Header";
import { SearchX } from "lucide-react";
import { IconMedallion } from "./IconMedallion";

export function NotFoundInline() {
  const { t } = useI18n();
  return (
    <div>
      <Header back showBell={false} />
      <div className="flex flex-col items-center gap-4 px-6 py-24 text-center">
        <IconMedallion icon={SearchX} size={64} tone="navy" />
        <h1 className="font-display text-xl font-semibold text-ink">
          {t("error.notFound")}
        </h1>
        <p className="text-sm text-muted">{t("error.notFoundBody")}</p>
        <ButtonLink href="/" variant="secondary" size="md">
          {t("error.backHome")}
        </ButtonLink>
      </div>
    </div>
  );
}
