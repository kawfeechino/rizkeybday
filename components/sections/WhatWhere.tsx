import styles from './WhatWhere.module.css';

const ITEMS = [
  {
    label: 'venue',
    name: 'Parqal',
    detail: 'Doors at 7 — confirm the exact time closer to the date.',
  },
  {
    label: 'restaurant',
    name: '[restaurant name]',
    detail: 'Reservation under [name].',
  },
  {
    label: 'attire',
    name: 'black, mostly',
    detail: 'Smart casual — nothing formal.',
  },
];

export function WhatWhere() {
  return (
    <section className={styles.container}>
      {/* Location */}
      <div className={styles.block}>
        <h2 className={styles.label}>where</h2>
        <div className={styles.imageWrapper}>
          <img src="/parqal.jpg" alt="Parqal" className={styles.image} />
        </div>
        <p className={styles.text}>Parqal</p>
      </div>

      {/* Dinner */}
      <div className={styles.block}>
        <h2 className={styles.label}>dinner</h2>
        <div className={styles.imageWrapper}>
          <img src="/gianetto.jpg" alt="Gianetto" className={styles.image} />
        </div>
        <p className={styles.text}>Gianetto</p>
      </div>

      {/* Attire */}
      <div className={styles.block}>
        <h2 className={styles.label}>attire</h2>
        <div className={styles.imageWrapper}>
          {/* Black block matching the photo frame styling */}
          <div className={styles.image} style={{ backgroundColor: '#1a1a1a', width: '100%', height: '100%' }} />
        </div>
        <p className={styles.text}>Black</p>
      </div>
    </section>
  );
}
