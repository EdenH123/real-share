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
 * Waitlist capture — the one genuinely functional backend touchpoint.
 * Validates the email and records the signup.
 *
 * Persistence is best-effort to a JSON file (works in local/dev and on any
 * host with a writable disk). On read-only/serverless hosts the write is
 * skipped gracefully — swap in a form service or DB (e.g. Resend, Supabase,
 * a Google Sheet webhook) for durable production storage. See README.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { email, name, market, locale } = body;

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const entry = {
    email,
    name: typeof name === "string" ? name : "",
    market: typeof market === "string" ? market : "",
    locale: typeof locale === "string" ? locale : "",
    at: new Date().toISOString(),
  };

  // Server-side record (always visible in logs).
  console.log("[waitlist] signup", entry);

  // Best-effort durable append.
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
    // Fallback to the OS temp dir; if that also fails, we still succeed
    // (the signup is captured in logs) so the UX never breaks.
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
      /* logged above; acknowledge anyway */
    }
  }

  return NextResponse.json({ ok: true });
}
