"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getProperty } from "@/lib/seed";
import { propTitle } from "@/lib/property";
import { formatEUR, formatPct } from "@/lib/format";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { IconMedallion } from "@/components/ui/IconMedallion";
import { IllustrativeTag } from "@/components/ui/IllustrativeTag";
import { CountUp } from "@/components/ui/CountUp";
import { NotFoundInline } from "@/components/ui/NotFoundInline";
import { WaitlistSheet } from "@/components/waitlist/WaitlistSheet";
import { track } from "@/lib/track";
import {
  Minus,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";

const SETUP_FEE_RATE = 0.02;

export default function InvestPage() {
  const { t, locale } = useI18n();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const p = id ? getProperty(id) : undefined;

  const { addInvestment } = useStore();
  const [tokens, setTokens] = useState(10);
  const [step, setStep] = useState<"amount" | "success">("amount");
  const [waitlist, setWaitlist] = useState(false);

  const maxTokens = p ? Math.min(p.tokenCount, 400) : 400;

  const calc = useMemo(() => {
    if (!p) return null;
    const subtotal = tokens * p.tokenPrice;
    const fee = subtotal * SETUP_FEE_RATE;
    const total = subtotal + fee;
    const estIncome = subtotal * (p.netYield / 100);
    return { subtotal, fee, total, estIncome };
  }, [p, tokens]);

  if (!p || !calc) return <NotFoundInline />;

  function confirm() {
    addInvestment(p!.id, tokens, p!.tokenPrice);
    // The POC's core signal: a sized, non-binding statement of intent.
    track("invest_intent", {
      property: p!.id,
      tokens,
      amountEur: Math.round(tokens * p!.tokenPrice),
    });
    setStep("success");
  }

  if (step === "success") {
    return (
      <div className="min-h-full">
        <Header back showBell={false} showLang title={t("invest.title")} />
        <div className="flex flex-col items-center px-6 pt-8 text-center">
          <div className="relative grid place-items-center">
            <div className="rs-burst" aria-hidden>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} style={{ "--i": i } as CSSProperties} />
              ))}
            </div>
            <IconMedallion icon={CheckCircle2} size={72} className="!bg-positive" tone="teal" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
            {t("invest.successTitle")}
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted">{t("invest.successBody")}</p>

          <Card className="mt-6 w-full p-4 text-start">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">{propTitle(p, locale)}</span>
              <span className="num font-semibold text-ink">
                <CountUp value={tokens} format={(n) => String(Math.round(n))} /> {t("common.tokens")}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted">{t("invest.total")}</span>
              <span className="num font-display text-lg font-semibold text-ink">
                {formatEUR(calc.total, { decimals: 2 })}
              </span>
            </div>
          </Card>

          <Card variant="navy" className="mt-4 w-full p-4 text-start">
            <div className="flex items-start gap-3">
              <IconMedallion icon={Sparkles} size={40} />
              <p className="text-sm text-white/85">{t("invest.successWaitlist")}</p>
            </div>
          </Card>

          <div className="mt-5 w-full space-y-3">
            <Button size="lg" onClick={() => setWaitlist(true)}>
              {t("invest.registerInterest")}
            </Button>
            <ButtonLink href="/portfolio" variant="secondary" size="lg">
              {t("invest.goToPortfolio")}
            </ButtonLink>
          </div>
        </div>
        <WaitlistSheet
          open={waitlist}
          onClose={() => setWaitlist(false)}
          intent={{
            propertyId: p.id,
            tokens,
            amount: Math.round(calc.total),
          }}
        />
        <div className="h-8" />
      </div>
    );
  }

  return (
    <div className="pb-8">
      <Header back showBell={false} title={t("invest.title")} />

      <div className="space-y-4 px-4">
        {/* sim badge */}
        <div className="flex items-center gap-2 rounded-card bg-gold/12 px-3 py-2 text-xs font-semibold text-gold-text">
          <Info size={15} />
          {t("invest.simBadge")} · {t("invest.previewNote")}
        </div>

        {/* property row */}
        <Card className="flex items-center justify-between p-4">
          <span className="font-display font-semibold text-ink">{propTitle(p, locale)}</span>
          <span className="num text-sm text-muted">
            {formatEUR(p.tokenPrice)} {t("common.perToken")}
          </span>
        </Card>

        {/* amount picker */}
        <Card className="p-5">
          <div className="text-sm font-semibold text-ink">{t("invest.chooseAmount")}</div>

          <div className="mt-4 flex items-center justify-center gap-5">
            <button
              onClick={() => setTokens((n) => Math.max(1, n - 1))}
              className="grid h-11 w-11 place-items-center rounded-full bg-tint text-ink active:scale-95"
              aria-label="minus"
            >
              <Minus size={20} />
            </button>
            <div className="text-center">
              <div className="num font-display text-4xl font-semibold text-ink">{tokens}</div>
              <div className="text-xs text-muted">{t("invest.tokens")}</div>
            </div>
            <button
              onClick={() => setTokens((n) => Math.min(maxTokens, n + 1))}
              className="grid h-11 w-11 place-items-center rounded-full bg-tint text-ink active:scale-95"
              aria-label="plus"
            >
              <Plus size={20} />
            </button>
          </div>

          <input
            type="range"
            className="rs-range mt-5 w-full"
            min={1}
            max={maxTokens}
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
          />
          <div className="mt-2 text-center text-xs text-muted">
            {t("invest.minNote", { price: formatEUR(p.tokenPrice) })}
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {[5, 10, 25, 50].map((q) => (
              <button
                key={q}
                onClick={() => setTokens(Math.min(maxTokens, q))}
                className="rounded-full bg-tint px-3 py-1 text-sm font-semibold text-teal"
              >
                +{q}
              </button>
            ))}
          </div>
        </Card>

        {/* review */}
        <Card className="p-4">
          <div className="text-sm font-semibold text-ink">{t("invest.review")}</div>
          <div className="mt-3 space-y-2.5 text-sm">
            <RowLine label={t("invest.tokenCount")} value={`${tokens}`} />
            <RowLine label={t("invest.tokenPrice")} value={formatEUR(p.tokenPrice)} />
            <RowLine label={t("invest.subtotal")} value={formatEUR(calc.subtotal, { decimals: 2 })} />
            <RowLine label={t("invest.setupFee")} value={formatEUR(calc.fee, { decimals: 2 })} />
            <div className="my-1 h-px bg-hairline" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink">{t("invest.total")}</span>
              <span className="num font-display text-xl font-semibold text-ink">
                {formatEUR(calc.total, { decimals: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-positive/8 px-3 py-2">
              <span className="flex items-center gap-1.5 text-xs text-muted">
                {t("invest.estIncome")}
                <IllustrativeTag />
              </span>
              <span className="num font-semibold text-positive">
                {formatEUR(calc.estIncome, { decimals: 2 })}{t("common.perYear")}
              </span>
            </div>
          </div>
        </Card>

        {/* escrow explainer */}
        <Card variant="tint" className="flex gap-3 p-4">
          <IconMedallion icon={ShieldCheck} size={40} tone="navy" />
          <div>
            <div className="text-sm font-semibold text-ink">{t("invest.escrowTitle")}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted">{t("invest.escrowBody")}</p>
          </div>
        </Card>

        <Button size="lg" onClick={confirm}>
          {t("invest.confirm")}
        </Button>
      </div>
    </div>
  );
}

function RowLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="num font-semibold text-ink">{value}</span>
    </div>
  );
}
