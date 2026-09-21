'use client';

import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';
import styles from './LetterOpen.module.css';

interface LetterOpenProps {
  image: string;
  alt?: string;
}

/**
 * A small envelope fades in, its flap swings open, and a photo slides up
 * out of it, growing to become the centered focal point while the
 * envelope fades away underneath. Meant to be used once — see the yes
 * state in InvitationScene.
 */
export function LetterOpen({ image, alt = '' }: LetterOpenProps) {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.envelope}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.7, times: [0, 0.18, 0.62, 1], ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 200 140" className={styles.body} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="20" width="192" height="116" rx="10" fill="var(--paper)" stroke="currentColor" strokeWidth="2" />
          <path d="M4 24 L100 96 L196 24" stroke="currentColor" strokeWidth="2" />
        </svg>
        <motion.div
          className={styles.flap}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -155 }}
          transition={{ delay: 0.3, duration: 0.55, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 192 76" className={styles.flapSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2 L96 68 L192 2 Z" fill="var(--paper)" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.photoStage}
        initial={{ opacity: 0, scale: 0.55, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: -10 }}
        transition={{ delay: 0.7, duration: 0.6, ease: EASE_OUT }}
      >
        <div className={styles.photoCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} className={styles.photoImg} />
        </div>
      </motion.div>
    </div>
  );
}