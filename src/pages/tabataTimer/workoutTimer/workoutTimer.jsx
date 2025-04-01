import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startTimer, stopTimer, resetTimer, tick } from '../../../redux/slices/workoutTimerSlice'
import { controlStartSound } from '../../../components/services/soundPlayer'
import { Button } from '../../../components/ui/button/button'
import styles from './WorkoutTimer.module.css'

export const WorkoutTimer = () => {
    const dispatch = useDispatch()
    const { time, rounds, currentRound, phase, isRunning } = useSelector((state) => state.workoutTimer.timer)

    useEffect(() => {
        let interval

        if (isRunning) {
            interval = setInterval(() => {
                dispatch(tick())
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [isRunning, dispatch])

    const handleStart = () => {
        dispatch(startTimer())

        if (phase === 'preparation') {
            return controlStartSound('resume')
        }
    }

    const handleStop = () => {
        dispatch(stopTimer())
        controlStartSound('pause')
    }

    const handleReset = () => {
        dispatch(resetTimer())
        controlStartSound('pause')
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    const isWorkoutCompleted = !isRunning && currentRound >= rounds && time === 0

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timerContent}>
                <h1>ТАБАТА ТАЙМЕР</h1>
                <h2 className={styles.title}>
                    {phase === 'preparation' ? 'Готовимся' : phase === 'workout' ? 'Работаем' : 'Отдыхаем'}
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
