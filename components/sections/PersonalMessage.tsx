import styles from './PersonalMessage.module.css';

const LINES = [
  'This is the quiet part before the details.',
  'Happy birthday — I hope today feels exactly like you.',
];

export function PersonalMessage() {
  return (
    <section className={styles.section}>
      {LINES.map((line) => (
        <p key={line} className={styles.line}>
          {line}
        </p>
      ))}
    </section>
  );
}
