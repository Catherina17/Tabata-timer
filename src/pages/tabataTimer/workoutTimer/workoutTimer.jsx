import { useWorkoutTimer } from '../../../hooks/useWorkoutTimer/useWorkoutTimer'
import { Button } from '../../../components/ui/button/button'
import styles from './WorkoutTimer.module.css'

export const WorkoutTimer = () => {
  const { 
    time, 
    rounds, 
    currentRound, 
    phase, 
    isRunning, 
    isWorkoutCompleted, 
    formatTime, 
    handleStart, 
    handleStop, 
    handleReset 
  } = useWorkoutTimer()

  const phaseStates = {
    preparation: 'Готовимся',
    workout: 'Работаем',
    default: 'Отдыхаем',
  }

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerContent}>
        <h1>ТАБАТА ТАЙМЕР</h1>
        <h2 className={styles.title}>
          {phaseStates[phase] || phaseStates.default}
        </h2>
        <h3>Время:</h3>
        <div className={styles.timerValue}>{formatTime(time)}</div>
        <div className={styles.roundInfo}>
          <h3>Раунд:</h3>
          <div className={styles.round}>{currentRound}/{rounds}</div>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={handleReset}>Вернуться к выбору</Button>
          <Button onClick={handleStop} disabled={!isRunning}>Пауза</Button>
          {!isRunning && !isWorkoutCompleted && (
            <Button onClick={handleStart}>Продолжить</Button>
          )}
        </div>
      </div>
    </div>
  )
}