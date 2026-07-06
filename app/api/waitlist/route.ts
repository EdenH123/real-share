import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Waitlist / interest capture — the POC's core signal.
 * Records who signed up, how much they said they'd invest (non-binding,
 * illustrative preview — never a real transaction), and which property
 * triggered it. Forwards to POC_WEBHOOK_URL (e.g. a Google Apps Script that
 * appends to a Sheet) when configured; always logs; best-effort file append
 * for local/dev.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { email, name, market, locale, amount, propertyId, tokens, src, anon } = body;

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const entry = {
    type: "signup",
    email,
    name: typeof name === "string" ? name.slice(0, 80) : "",
    market: typeof market === "string" ? market.slice(0, 20) : "",
    locale: typeof locale === "string" ? locale.slice(0, 5) : "",
    // Stated, non-binding interest — the "willing to put money in" signal.
    amountEur: typeof amount === "number" && isFinite(amount) ? Math.round(amount) : (typeof amount === "string" ? amount.slice(0, 20) : ""),
    propertyId: typeof propertyId === "string" ? propertyId.slice(0, 40) : "",
    tokens: typeof tokens === "number" && isFinite(tokens) ? Math.round(tokens) : "",
    src: typeof src === "string" ? src.slice(0, 40) : "",
    anon: typeof anon === "string" ? anon.slice(0, 40) : "",
    at: new Date().toISOString(),
  };

  console.log("[waitlist] signup", JSON.stringify(entry));

  // Forward to the founder's sheet/webhook when configured.
  const webhook = process.env.POC_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      /* logged above regardless */
    }
  }

  // Best-effort local file append (works in dev / disk-backed hosts).
  try {
    const dir = process.env.WAITLIST_DIR || path.join(process.cwd(), "data");
    const file = path.join(dir, "waitlist.json");
    await fs.mkdir(dir, { recursive: true });
    let list: unknown[] = [];
    try {
      list = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      /* new file */
    }
    list.push(entry);
    await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
  } catch {
    try {
      const file = path.join(os.tmpdir(), "realshare-waitlist.json");
      let list: unknown[] = [];
      try {
        list = JSON.parse(await fs.readFile(file, "utf8"));
      } catch {
        /* new file */
      }
      list.push(entry);
      await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
    } catch {
      /* acknowledged anyway — captured in logs/webhook */
    }
  }

  return NextResponse.json({ ok: true });
}
