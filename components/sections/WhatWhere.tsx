import styles from './WhatWhere.module.css';

const ITEMS = [
  {
    label: 'where',
    name: 'Parqal',
    detail: 'For the aesthetic shots and food ---and the ig post.',
    image: '/parqal.jpg',
  },
  {
    label: 'what',
    name: 'Gianetto',
    detail: 'Dinner reservation — 8:00PM, 2/10/2024.',
    image: '/gianetto.jpg',
  },
];

export function WhatWhere() {
  return (
    <section className={styles.container}>
      <div className={styles.row}>
        {ITEMS.map((item, i) => (
          <article key={item.name} className={`${styles.card} ${i === 1 ? styles.cardOffset : ''}`}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            <p className={styles.label}>{item.label}</p>
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.detail}>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}