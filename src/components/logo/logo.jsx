import styles from './logo.module.css'

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.alarmClock}>
        <div className={styles.switchButton}></div> 
        <div className={styles.clockFace}>
          <div className={styles.hand}></div>
        </div>
        <div className={styles.bellArm}></div>
      </div>
      <div className={styles.text}>
        <h2>Tabata-таймер</h2>
      </div>
    </div>
  )
}
