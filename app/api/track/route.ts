import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Funnel event sink. Logs every event and forwards it to the webhook
 * (POC_WEBHOOK_URL — e.g. a Google Apps Script that appends to a Sheet)
 * when configured. Never fails the client.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const entry = {
    type: "event",
    event: String(body.event ?? "").slice(0, 40),
    props: body.props ?? {},
    anon: String(body.anon ?? "").slice(0, 40),
    src: String(body.src ?? "").slice(0, 40),
    locale: String(body.locale ?? "").slice(0, 5),
    path: String(body.path ?? "").slice(0, 120),
    at: String(body.at ?? new Date().toISOString()).slice(0, 30),
  };

  console.log("[track]", JSON.stringify(entry));

  const webhook = process.env.POC_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch {
      /* webhook down — the log line above still has the event */
    }
  }

  return NextResponse.json({ ok: true });
}
