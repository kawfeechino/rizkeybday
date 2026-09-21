'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './PetalBurst.module.css';

interface Petal {
  id: number;
  side: 'left' | 'right';
  y: number;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
  color: string;
}

/**
 * Petals fly in from both edges of the screen rather than falling from a
 * center point — a wider sweep, bigger shapes. Same asset reused for the
 * yes click and (later) the video unlock.
 */
export function PetalBurst({ trigger }: { trigger: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!trigger || reduced) return;
    const colors = ['var(--butter)', 'var(--sage)'];
    const next: Petal[] = Array.from({ length: 18 }, (_, i) => {
      const side: 'left' | 'right' = i % 2 === 0 ? 'left' : 'right';
      const travel = 140 + Math.random() * 220;
      return {
        id: trigger * 1000 + i,
        side,
        y: 8 + Math.random() * 78,
        dx: side === 'left' ? travel : -travel,
        dy: -60 + Math.random() * 200,
        rot: Math.random() * 360,
        delay: Math.random() * 0.25,
        color: colors[i % colors.length],
      };
    });
    setPetals(next);
    const t = setTimeout(() => setPetals([]), 1700);
    return () => clearTimeout(t);
  }, [trigger, reduced]);

  return (
    <div className={styles.host} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`${styles.petal} ${p.side === 'left' ? styles.fromLeft : styles.fromRight}`}
          style={
            {
              top: `${p.y}%`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              '--dx': `${p.dx}px`,
              '--dy': `${p.dy}px`,
              '--rot': `${p.rot}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}