'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PetalBurst } from '../characters/PetalBurst';
import { LetterOpen } from '../characters/LetterOpen';
import { Button } from '../ui/Button';
import { DURATION } from '@/lib/motion';
import styles from './InvitationScene.module.css';

type Step = 'prompt' | 'yes' | 'no';

interface InvitationSceneProps {
  name: string;
  onContinue: () => void;
}

export function InvitationScene({ name, onContinue }: InvitationSceneProps) {
  const [step, setStep] = useState<Step>('prompt');
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    document.body.classList.add('scene-lock');

    return () => document.body.classList.remove('scene-lock');
  }, []);

  function handleYes() {
    setStep('yes');
    setBurstKey((k) => k + 1);

    // Give the letter-opening animation enough time to finish.
    setTimeout(onContinue, 2400);
  }

  return (
    <div className={`${styles.scene} ${step === 'no' ? styles.dim : ''}`}>
      <PetalBurst trigger={burstKey} />

      <AnimatePresence mode="wait">

        {/* =====================================================
            INVITATION
        ====================================================== */}

        {step === 'prompt' && (
          <motion.div
            key="prompt"
            className={styles.promptLayout}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: DURATION.scene,
              delay: 0.3,
            }}
          >
            <div className={styles.panel}>

              {/* Bigger birthday Smiski */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/smiski%20hbd.PNG"
                alt=""
                className={styles.banner}
              />

              <h1 className={styles.headline}>
                happy birthday,
                <br />
                cariña
              </h1>

              <div className={styles.buttons}>
                <Button variant="solid" onClick={handleYes}>
                  yes
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setStep('no')}
                >
                  no, sorry
                </Button>
              </div>
            </div>

            {/* Large personal photo on the right */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/darlingpic.png"
              alt=""
              className={styles.darling}
            />
          </motion.div>
        )}

        {/* =====================================================
            YES
        ====================================================== */}

        {step === 'yes' && (
          <motion.div
            key="yes"
            className={styles.yesPanel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: DURATION.scene,
            }}
          >
            <LetterOpen
              image="/shinchanbouquet.png"
              alt=""
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/smiskiconfetti.PNG"
              alt=""
              className={styles.cheer}
            />
          </motion.div>
        )}

        {/* =====================================================
            NO
        ====================================================== */}

        {step === 'no' && (
          <motion.div
            key="no"
            className={styles.noPanel}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: DURATION.scene,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/crying-pocoyo.gif"
              alt=""
              className={styles.cryingPocoyo}
            />

            <h1 className={`${styles.headline} ${styles.headlineLight}`}>
              oh.
            </h1>

            <p className={styles.noMessage}>
              plsplsplspslpslpslps ill make it worth your time
            </p>

            <Button
              variant="invert"
              onClick={() => setStep('prompt')}
            >
              try again
            </Button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}