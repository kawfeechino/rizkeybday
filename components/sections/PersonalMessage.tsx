import styles from './PersonalMessage.module.css';

const LINES = [
  'Cheers to the first of many more birthdays together, mahal. Forever grateful to be the one to receive your love. '
];

export function PersonalMessage() {
  return (
    <section className={styles.section}>
      <img src="/smiskimodel.PNG" alt="" className={styles.figure} />
      <br/>
      {LINES.map((line) => (
        <p key={line} className={styles.line}>
          {line}
        </p>
      ))}
    </section>
  );
}