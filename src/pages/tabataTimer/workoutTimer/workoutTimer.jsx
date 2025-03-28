import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startTimer, stopTimer, resetTimer, tick } from '../../../redux/slices/workoutTimerSlice'
import { controlStartSound } from '../../../components/services/soundPlayer'
import { Button } from '../../../components/ui/button/button'

export const WorkoutTimer = () => {
    const dispatch = useDispatch()
    const { time, rounds, currentRound, phase, isRunning } = useSelector((state) => state.workoutTimer.timer)

    useEffect(() => {
        let interval

        if (isRunning) {
            interval = setInterval(() => {
                dispatch(tick());
            }, 1000);
        }

        return () => clearInterval(interval)
    }, [isRunning, dispatch])

    const handleStart = () => {
        dispatch(startTimer())
        controlStartSound('resume')
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

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>ТАБАТА ТАЙМЕР</h1>
            <h2>
                {phase === 'preparation' ? 'Готовимся' : phase === 'workout' ? 'Работаем' : 'Отдыхаем'}
            </h2>
            <h3>Время: {formatTime(time)}</h3>
            {phase === 'workout' && (
                <div>
                    <h4>Раунд: {currentRound}/{rounds}</h4>
                </div>
            )}
            <Button onClick={handleReset}>Вернуться к выбору</Button>
            <Button onClick={handleStop} disabled={!isRunning}>Пауза</Button>
            {!isRunning && <Button onClick={handleStart}>Продолжить</Button>}
        </div>
    )
}