'use client';

import { useState } from 'react';
import styles from './Memories.module.css';

const MEMORIES = [
  { id: 1, src: '/pb1.MP4', caption: 'Memory 1' },
  { id: 2, src: '/pb2.MP4', caption: 'Memory 2' },
  { id: 3, src: '/pb3.MP4', caption: 'Memory 3' },
  { id: 4, src: '/pb4.mp4', caption: 'Memory 4' },
  { id: 5, src: '/gradpb.mp4', caption: 'Graduation' }
];

export function Memories() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className={styles.container}>
      <div className={styles.gallery}>
        {MEMORIES.map((item) => (
          <div 
            key={item.id} 
            className={styles.memoryCard} 
            onClick={() => setActiveVideo(item.src)}
            style={{ cursor: 'pointer' }}
          >
            {/* Fits inside the original design's image frame */}
            <video 
              src={item.src} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className={styles.image} 
              style={{ objectFit: 'cover' }}
            />
            <p className={styles.caption}>{item.caption}</p>
          </div>
        ))}
      </div>

      {/* Popup Lightbox Modal */}
      {activeVideo && (
        <div className={styles.modalOverlay} onClick={() => setActiveVideo(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setActiveVideo(null)}>
              ✕
            </button>
            <video 
              src={activeVideo} 
              controls 
              autoPlay 
              className={styles.fullVideo} 
            />
          </div>
        </div>
      )}
    </section>
  );
}