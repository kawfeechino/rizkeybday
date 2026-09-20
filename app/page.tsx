'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { InvitationScene } from '@/components/scenes/InvitationScene';
import { PersonalMessage } from '@/components/sections/PersonalMessage';
import { WhatWhere } from '@/components/sections/WhatWhere';
import { Memories } from '@/components/sections/Memories';
import { LockedVideo } from '@/components/sections/LockedVideo';
import { FinalMessage } from '@/components/sections/FinalMessage';

// TODO: replace with her actual name before shipping.
const HER_NAME = '[her name]';

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <main>
      <AnimatePresence mode="wait">
        {!entered && (
          <InvitationScene key="invitation" name={HER_NAME} onContinue={() => setEntered(true)} />
        )}
      </AnimatePresence>
      {entered && (
        <>
          <PersonalMessage />
          <WhatWhere />
          <Memories />
          <LockedVideo />
          <FinalMessage />
        </>
      )}
    </main>
  );
}
