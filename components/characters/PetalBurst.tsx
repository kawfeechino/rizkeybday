'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './PetalBurst.module.css';

interface Petal {
  id: number;
  left: number;
  dx: number;
  rot: number;
  delay: number;
  color: string;
}

/**
 * Increment `trigger` (e.g. a counter in state) each time you want the
 * burst to fire — this is the same asset reused for the yes click and the
 * video unlock, on purpose (see "the tulips" in the design doc).
 */
export function PetalBurst({ trigger }: { trigger: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!trigger || reduced) return;
    const colors = ['var(--butter)', 'var(--sage)'];
    const next: Petal[] = Array.from({ length: 14 }, (_, i) => ({
      id: trigger * 100 + i,
      left: 40 + Math.random() * 20,
      dx: Math.random() * 160 - 80,
      rot: Math.random() * 360,
      delay: Math.random() * 0.15,
      color: colors[i % colors.length],
    }));
    setPetals(next);
    const t = setTimeout(() => setPetals([]), 1400);
    return () => clearTimeout(t);
  }, [trigger, reduced]);

  return (
    <div className={styles.host} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={styles.petal}
          style={
            {
              left: `${p.left}%`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              '--dx': `${p.dx}px`,
              '--rot': `${p.rot}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
