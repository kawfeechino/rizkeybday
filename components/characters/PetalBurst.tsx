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

type TulipSide = 'left' | 'right';

function TulipGraphic() {
  return (
    <svg
      className={styles.tulipGraphic}
      viewBox="0 0 180 240"
      aria-hidden="true"
    >
      {/* stem */}
      <path
        d="M88 112 C88 148 84 184 82 222"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* left leaf */}
      <path
        d="M84 172 C53 151 31 157 24 183 C48 187 69 184 84 172Z"
        fill="var(--sage)"
      />

      {/* right leaf */}
      <path
        d="M84 191 C109 166 132 168 146 190 C121 199 101 201 84 191Z"
        fill="var(--sage)"
      />

      {/* main tulip */}
      <path
        d="M47 95 C40 61 55 32 75 21 C78 47 87 61 90 70 C94 53 106 36 130 24 C138 56 130 86 107 105 C94 116 65 113 47 95Z"
        fill="var(--butter)"
      />

      {/* left petal */}
      <path
        d="M47 95 C43 78 45 58 54 43 C62 57 72 66 90 70 C88 91 74 103 58 106 C54 104 50 100 47 95Z"
        fill="#E9C94F"
      />

      {/* right petal */}
      <path
        d="M90 70 C94 52 106 35 130 24 C136 48 130 74 116 92 C108 101 99 106 89 107 C89 93 90 82 90 70Z"
        fill="#F2D66F"
      />
    </svg>
  );
}

export function PetalBurst({ trigger }: { trigger: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [showTulip, setShowTulip] = useState(false);
  const [tulipSide, setTulipSide] = useState<TulipSide>('right');

  const reduced = useReducedMotion();

  useEffect(() => {
    if (!trigger || reduced) return;

    const colors = ['var(--butter)', 'var(--sage)'];

    // Alternate sides every trigger so the animation feels less repetitive.
    const side: TulipSide = trigger % 2 === 0 ? 'left' : 'right';

    const next: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: trigger * 100 + i,
      left: 40 + Math.random() * 20,
      dx: Math.random() * 220 - 110,
      rot: Math.random() * 360,
      delay: Math.random() * 0.2,
      color: colors[i % colors.length],
    }));

    setTulipSide(side);
    setShowTulip(true);
    setPetals(next);

    // Keep everything alive long enough for the full entrance + exit.
    const timeout = setTimeout(() => {
      setShowTulip(false);
      setPetals([]);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [trigger, reduced]);

  return (
    <div className={styles.host} aria-hidden="true">
      {showTulip && (
        <div
          key={`tulip-${trigger}`}
          className={`${styles.tulipWrap} ${
            tulipSide === 'left'
              ? styles.fromLeft
              : styles.fromRight
          }`}
        >
          <TulipGraphic />
        </div>
      )}

      {petals.map((petal) => (
        <span
          key={petal.id}
          className={styles.petal}
          style={
            {
              left: `${petal.left}%`,
              backgroundColor: petal.color,
              animationDelay: `${petal.delay}s`,
              '--dx': `${petal.dx}px`,
              '--rot': `${petal.rot}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}