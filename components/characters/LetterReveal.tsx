'use client';

import { motion } from 'framer-motion';
import styles from './LetterReveal.module.css';

interface LetterRevealProps {
  image: string;
  caption?: string;
}

/**
 * A small envelope that opens and lets a letter slide out and up,
 * revealing an image (and an optional short caption). Used for the
 * "yes" moment instead of a static reaction image.
 */
export function LetterReveal({ image, caption }: LetterRevealProps) {
  return (
    <div className={styles.wrap}>
      <motion.svg
        viewBox="0 0 200 140"
        className={styles.envelope}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* envelope body */}
        <rect x="10" y="30" width="180" height="100" rx="8" fill="var(--paper)" stroke="var(--hairline)" strokeWidth="1.5" />
        {/* inner fold seam, always visible */}
        <path d="M10 38 L100 95 L190 38" fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
        {/* flap: flips open from pointing down to pointing up/back */}
        <motion.path
          fill="var(--paper)"
          stroke="var(--charcoal-soft)"
          strokeWidth="1.5"
          initial={{ d: 'M10 30 L100 85 L190 30 Z' }}
          animate={{ d: 'M10 30 L100 -35 L190 30 Z' }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        />
      </motion.svg>

      <motion.div
        className={styles.letter}
        initial={{ y: 12, opacity: 0, scale: 0.92 }}
        animate={{ y: -78, opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className={styles.letterImage} />
        {caption && <p className={styles.letterCaption}>{caption}</p>}
      </motion.div>
    </div>
  );
}