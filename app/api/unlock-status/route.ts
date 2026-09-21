import { NextResponse } from 'next/server';

// Never cache this route — otherwise Vercel's edge/data cache can keep
// serving a stale "still locked" response past the target time.
export const dynamic = 'force-dynamic';

// Asia/Manila is UTC+8 year-round (no DST observed), so a fixed offset
// in the ISO string is reliable without needing a timezone library.
// Set the real value via the UNLOCK_AT_ISO env var — see README.md.
const UNLOCK_AT = process.env.UNLOCK_AT_ISO ?? '2026-10-02T00:00:00+08:00';

export async function GET() {
  const now = Date.now();
  const target = new Date(UNLOCK_AT).getTime();
  const unlocked = now >= target;

  return NextResponse.json(
    { unlocked, msRemaining: Math.max(target - now, 0) },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
