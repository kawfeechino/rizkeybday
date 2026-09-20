'use client';

import { motion } from 'framer-motion';
import { IDLE_LOOP } from '@/lib/motion';

export type CatPose = 'idle' | 'peek' | 'curious' | 'sad' | 'sleepy';

interface CatProps {
  pose?: CatPose;
  size?: number;
  className?: string;
  name?: 'carter' | 'charlie'; 
}

export function Cat({ pose = 'idle', size = 72, className, name = 'carter' }: CatProps) {
  const imageSrc = name === 'charlie' ? '/charlie.PNG' : '/carter.PNG';

  return (
    <motion.img
      src={imageSrc}
      alt={`${name} the cat`}
      width={size}
      className={className}
      style={{ objectFit: 'contain' }}
      // Keeps the original subtle idle animation working on your PNGs
      animate={pose === 'idle' ? { rotate: [0, -2, 0, 2, 0] } : { rotate: 0 }}
      transition={pose === 'idle' ? IDLE_LOOP : { duration: 0.3 }}
    />
  );
}