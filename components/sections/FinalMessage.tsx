import { Cat } from '../characters/Cat';
import styles from './FinalMessage.module.css';

// TODO: replace with the real closing message and your own signature.
const CLOSING = ["That's it — that's the whole website.", 'Happy birthday. I love you.'];

export function FinalMessage() {
  return (
    <section>
      <div className={styles.imageContainer}>
        <img src="/shinchanhbd.png" alt="Happy Birthday" className={styles.finalImage} />
      </div>

      <div className={styles.message}>
        <p>Happy birthday. I love you.</p>
        <p className={styles.signOff}>— Kyle</p>
      </div>

      <div className={styles.catContainer}>
        <Cat pose="sleepy" />
      </div>
    </section>
  );
}