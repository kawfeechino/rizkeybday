'use client';

import { useEffect, useState } from 'react';

interface UnlockStatus {
  unlocked: boolean;
  msRemaining: number;
}

/**
 * Source of truth is the server (see app/api/unlock-status/route.ts) —
 * never the visitor's own system clock. Polls once on mount, re-checks
 * shortly after the target time is expected to pass, and re-checks again
 * whenever the tab regains focus (in case it sat in the background for a
 * while).
 */
export function useUnlockStatus() {
  const [status, setStatus] = useState<UnlockStatus | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch('/api/unlock-status', { cache: 'no-store' });
        const data: UnlockStatus = await res.json();
        if (cancelled) return;
        setStatus(data);
        if (!data.unlocked) {
          timer = setTimeout(check, Math.min(data.msRemaining + 2000, 60_000));
        }
      } catch {
        // network hiccup — try again shortly rather than getting stuck locked
        if (!cancelled) timer = setTimeout(check, 15_000);
      }
    }

    check();
    document.addEventListener('visibilitychange', check);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', check);
    };
  }, []);

  return status;
}
