import { Cat } from '../characters/Cat';
import styles from './FinalMessage.module.css';

export function FinalMessage() {
  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <img src="/shinchanhbd.png" alt="Happy Birthday" className={styles.finalImage} />
      </div>

      <div className={styles.message}>
        <p>Happies of Birthdays, mi amor~ je t'aime.</p>
        <p className={styles.signOff}>— Kyle</p>
      </div>

      <div className={styles.catContainer}>
        <img 
          src="/tagaytay.GIF" 
          alt="Tagaytay" 
          style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '8px' }} 
        />
      </div>
    </section>
  );
}