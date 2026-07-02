"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { MARKETS } from "@/lib/seed";
import { CheckCircle2, Mail } from "lucide-react";
import { IconMedallion } from "@/components/ui/IconMedallion";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function WaitlistForm({
  onDone,
  compact = false,
}: {
  onDone?: () => void;
  compact?: boolean;
}) {
  const { t, locale } = useI18n();
  const { waitlist, setWaitlist } = useStore();
  const [email, setEmail] = useState(waitlist?.email ?? "");
  const [name, setName] = useState(waitlist?.name ?? "");
  const [market, setMarket] = useState<string>(waitlist?.market ?? "budapest");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    waitlist ? "done" : "idle"
  );
  const [error, setError] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError(t("waitlist.errorEmail"));
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, market, locale }),
      });
      if (!res.ok) throw new Error("bad status");
      setWaitlist({ email, name, market });
      setStatus("done");
      onDone?.();
    } catch {
      setStatus("error");
      setError(t("waitlist.error"));
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center animate-scale-in">
        <IconMedallion icon={CheckCircle2} size={56} tone="teal" className="!bg-positive" />
        <h3 className="font-display text-xl font-semibold text-ink">
          {t("waitlist.successTitle")}
        </h3>
        <p className="max-w-xs text-sm text-muted">
          {t("waitlist.successBody", { email })}
        </p>
        {onDone && (
          <Button variant="secondary" size="md" onClick={onDone} className="mt-2">
            {t("common.done")}
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {!compact && (
        <div className="flex items-center gap-3">
          <IconMedallion icon={Mail} size={44} />
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              {t("waitlist.title")}
            </h3>
            <p className="text-xs text-muted">{t("waitlist.subtitle")}</p>
          </div>
        </div>
      )}

      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-ink">
          {t("waitlist.email")}
        </span>
        <input
          type="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("waitlist.emailPlaceholder")}
          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-ink outline-none placeholder:text-muted/60 focus:border-teal"
          dir="ltr"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-ink">
          {t("waitlist.name")}
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("waitlist.namePlaceholder")}
          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-ink outline-none placeholder:text-muted/60 focus:border-teal"
        />
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          {t("waitlist.market")}
        </span>
        <div className="flex flex-wrap gap-2">
          {MARKETS.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setMarket(m.id)}
              className={
                "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors " +
                (market === m.id
                  ? "bg-teal text-white"
                  : "bg-tint text-muted hover:text-ink")
              }
            >
              {t(m.nameKey)}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm font-medium text-negative">{error}</p>}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? t("waitlist.submitting") : t("waitlist.submit")}
      </Button>
      <p className="text-center text-[11px] text-muted">{t("waitlist.privacy")}</p>
    </form>
  );
}
