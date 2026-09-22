'use client';

import { useEffect, useRef, useState } from 'react';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.15;

    const tryPlay = () => {
      audio.play().catch(() => {
        // Browser blocked autoplay.
        // We'll try again after the user's first interaction.
      });
    };

    tryPlay();

    const startAfterInteraction = () => {
      audio.play().catch(() => {});
    };

    window.addEventListener('click', startAfterInteraction, { once: true });
    window.addEventListener('touchstart', startAfterInteraction, { once: true });

    return () => {
      window.removeEventListener('click', startAfterInteraction);
      window.removeEventListener('touchstart', startAfterInteraction);
    };
  }, []);

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/blossom.mp3"
        loop
        preload="auto"
      />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          border: '1px solid rgba(38, 35, 32, 0.15)',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          boxShadow: '0 4px 16px rgba(38, 35, 32, 0.12)',
        }}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </>
  );
}