"use client";

import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { SEED_VOTES } from "@/lib/seed";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Info, Gavel, Check, Clock } from "lucide-react";

const FOR = "#2E7D5B"; // positive
const TRACK = "#D8E0E5"; // hairline

/** Simulated exit (sale) vote for a property in `exitVote` status. */
export function VoteCard({ propertyId }: { propertyId: string }) {
  const { t } = useI18n();
  const { votes, castVote, ready } = useStore();

  const proposal = SEED_VOTES.find((v) => v.propertyId === propertyId);
  if (!proposal) return null;

  const myVote = ready ? votes[propertyId] : undefined;
  // Client-side nudge: a "for" vote bumps the tally by 2 points (demo only).
  const forPct = Math.min(100, proposal.forPct + (myVote === "for" ? 2 : 0));

  return (
    <Card variant="navy" className="p-5">
      {/* sim badge */}
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold">
        <Info size={12} />
        {t("vote.simBadge")}
      </div>

      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-gold">
          <Gavel size={22} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold text-white">
            {t("vote.headline")}
          </h3>
          <div className="mt-0.5 flex items-center gap-1 text-xs text-white/70">
            <Clock size={12} />
            {t("vote.deadline", { days: proposal.deadlineDays })}
          </div>
        </div>
      </div>

      {/* threshold bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="num font-semibold text-white">
            {forPct}% {t("vote.forLabel")}
          </span>
          <span className="num text-white/70">{t("vote.threshold")}</span>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.14)" }}>
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${forPct}%`, background: FOR }}
          />
          {/* ⅔ supermajority threshold marker */}
          <div
            className="absolute inset-y-0 w-0.5 bg-gold"
            style={{ insetInlineStart: `${proposal.threshold}%` }}
            aria-hidden
          />
        </div>
        <div
          className="mt-1 text-[10px] font-semibold text-gold"
          style={{ marginInlineStart: `min(calc(${proposal.threshold}% - 12px), calc(100% - 40px))` }}
        >
          ⅔
        </div>
      </div>

      {/* actions or recorded state */}
      {myVote ? (
        <div className="mt-4 flex items-center gap-2 rounded-card bg-white/10 px-4 py-3">
          <Check size={18} className="shrink-0 text-positive" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">{t("vote.recorded")}</div>
            <div className="text-xs text-white/70">
              {myVote === "for" ? t("vote.yourVoteSell") : t("vote.yourVoteHold")}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <Button
            variant="gold"
            size="md"
            className="flex-1"
            onClick={() => castVote(propertyId, "for")}
          >
            {t("vote.sell")}
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="flex-1 !bg-white/10 !text-white"
            onClick={() => castVote(propertyId, "against")}
          >
            {t("vote.hold")}
          </Button>
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-white/55">{t("vote.note")}</p>
    </Card>
  );
}
