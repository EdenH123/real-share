"use client";

import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { useInstallPrompt } from "@/lib/hooks";
import { Card } from "@/components/ui/Card";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { Download, Share, X } from "lucide-react";

/**
 * Home install prompt. Shows the native install flow when the browser fired
 * `beforeinstallprompt`; on iOS Safari (no event) it shows the same card with
 * a "Share → Add to Home Screen" hint. Dismissal persists in the store.
 */
export function InstallPromptCard() {
  const { t } = useI18n();
  const { ready, installDismissed, dismissInstall } = useStore();
  const { canInstall, isIOS, isStandalone, promptInstall } = useInstallPrompt();

  if (!ready || installDismissed || isStandalone) return null;

  const showIosHint = isIOS && !canInstall;
  if (!canInstall && !showIosHint) return null;

  return (
    <Card variant="navy" className="relative overflow-hidden p-4">
      <div className="absolute -end-8 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
      <button
        onClick={dismissInstall}
        aria-label={t("install.dismiss")}
        className="press absolute end-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full text-white/60 hover:text-white"
      >
        <X size={16} />
      </button>
      <div className="relative flex items-center gap-3 pe-6">
        <IconMedallion icon={Download} size={44} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold text-white">
            {t("install.title")}
          </h3>
          <p className="mt-0.5 text-xs leading-relaxed text-white/70">
            {t("install.body")}
          </p>
        </div>
      </div>
      {showIosHint ? (
        <div className="relative mt-3 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-white/80">
          <Share size={15} className="shrink-0 text-gold" />
          <span>{t("install.iosHint")}</span>
        </div>
      ) : (
        <button
          onClick={promptInstall}
          className="press relative mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-navy transition-all active:scale-[.97]"
        >
          <Download size={16} />
          {t("install.cta")}
        </button>
      )}
    </Card>
  );
}
