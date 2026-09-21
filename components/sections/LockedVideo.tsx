'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUnlockStatus } from '@/hooks/useUnlockStatus';
import { Cat } from '../characters/Cat';
import styles from './LockedVideo.module.css';

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'any moment now';
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (days || hours) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(' ');
}

// TODO: update this label if you change UNLOCK_AT_ISO, so the readable
// date and the real server-side gate stay in sync.
const UNLOCK_LABEL = 'opens oct 2 · 12:00AM';

export function LockedVideo() {
  const status = useUnlockStatus();
  const unlocked = status?.unlocked ?? false;
  const [playing, setPlaying] = useState(false);
  const [shake, setShake] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function nudge() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

  function play() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <section className={styles.section}>
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            layoutId="video-card"
            className={styles.card}
            animate={shake ? { rotate: [0, -2, 2, -2, 0] } : { rotate: 0 }}
            transition={{ duration: 0.4 }}
            onClick={nudge}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/smiskisittingdown.PNG" alt="" className={styles.peek} />
            <div className={styles.glow} />
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={styles.lock}>
              <rect x="6" y="13" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 13V9a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <h3 className={styles.heading}>what 8 months of you felt like</h3>
            <p className={styles.countdown}>
              {status ? formatCountdown(status.msRemaining) : '—'} · {UNLOCK_LABEL}
            </p>
            <div className={styles.company}>
              <Cat name="carter" pose="sleepy" size={56} />
              <Cat name="charlie" pose="idle" size={56} />
            </div>
          </motion.div>
        ) : (
          <motion.div key="unlocked" layoutId="video-card" className={styles.videoCard}>
            <video src="/happybday.mp4" controls className={styles.video} />
            {!playing && (
              <button type="button" onClick={play} aria-label="Play video" className={styles.playButton}>
                <span className={styles.playRing}>
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M5 3.5v11l10-5.5-10-5.5Z" fill="currentColor" />
                  </svg>
                </span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}