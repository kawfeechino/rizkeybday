'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './Memories.module.css';

// TODO: swap these for shorter, more personal captions when you have a
// moment — three to six words works best (e.g. "one of my favorites").
const MEMORIES = [
  { id: 1, src: '/pb1.MP4', caption: 'March 30, 2026' },
  { id: 2, src: '/pb2.MP4', caption: 'April 19, 2026' },
  { id: 3, src: '/pb3.MP4', caption: 'July 1, 2026' },
  { id: 4, src: '/pb4.mp4', caption: 'May 15, 2026' },
  { id: 5, src: '/gradpb.mp4', caption: 'July 15, 2026' },
];

export function Memories() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className={styles.container}>
      <div className={styles.strip}>
        {MEMORIES.map((item, i) => (
          <div
            key={item.id}
            className={styles.frame}
            style={
              {
                '--rot': `${i % 2 === 0 ? -2 : 2}deg`,
                '--ty': `${i % 3 === 0 ? 0 : 14}px`,
              } as CSSProperties
            }
            onClick={() => setActiveVideo(item.src)}
          >
            <video src={item.src} autoPlay loop muted playsInline className={styles.image} />
            <p className={styles.caption}>{item.caption}</p>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div className={styles.modalOverlay} onClick={() => setActiveVideo(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setActiveVideo(null)}>
              ✕
            </button>
            <video src={activeVideo} controls autoPlay className={styles.fullVideo} />
          </div>
        </div>
      )}
    </section>
  );
}