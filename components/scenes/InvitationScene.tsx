'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cat } from '../characters/Cat';
import { PetalBurst } from '../characters/PetalBurst';
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

  // Locks scroll and pins the scene to the full viewport height while it's
  // showing — see the `.scene-lock` rule in globals.css.
  useEffect(() => {
    document.body.classList.add('scene-lock');
    return () => document.body.classList.remove('scene-lock');
  }, []);

  function handleYes() {
    setStep('yes');
    setBurstKey((k) => k + 1);
    setTimeout(onContinue, 1300);
  }

  return (
    <div className={`${styles.scene} ${step === 'no' ? styles.dim : ''}`}>
      <PetalBurst trigger={burstKey} />

      <AnimatePresence mode="wait">
        {step === 'prompt' && (
          <motion.div
            key="prompt"
            className={styles.panel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.scene, delay: 0.3 }}
          >
            <h1 className={styles.headline}>
              happy birthday,
              <br />
              {name}
            </h1>
            <div className={styles.buttons}>
              <Button variant="solid" onClick={handleYes}>
                yes
              </Button>
              <Button variant="outline" onClick={() => setStep('no')}>
                no, sorry
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'yes' && (
          <motion.div
            key="yes"
            className={styles.panel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.scene }}
          >
            <Cat pose="curious" />
            <h1 className={styles.headline}>knew it.</h1>
          </motion.div>
        )}

        {step === 'no' && (
          <motion.div
            key="no"
            className={styles.panel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.scene }}
          >
            <Cat pose="sad" />
            <h1 className={`${styles.headline} ${styles.headlineLight}`}>oh.</h1>
            <p className={styles.subline}>the birthday girl said no.</p>
            <Button variant="invert" onClick={() => setStep('prompt')}>
              try again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {step === 'prompt' && (
        <div className={styles.corner}>
          <Cat pose="idle" />
        </div>
      )}
    </div>
  );
}
