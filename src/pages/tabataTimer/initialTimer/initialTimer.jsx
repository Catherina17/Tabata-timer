import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProgram, fetchWorkoutPrograms } from '../../../redux/slices/workoutTimerSlice'
import { WorkoutDetails } from '../workoutDetails/workoutDetails'
import { CustomTimer } from '../customTimer/customTimer'
import styles from './initialTimer.module.css'

export const InitialTimer = () => {
  const dispatch = useDispatch()
  const { workoutPrograms, loading } = useSelector((state) => state.workoutTimer)
  const [showCustomTimer, setShowCustomTimer] = useState(false)
  const [activeProgram, setActiveProgram] = useState(null)

  useEffect(() => {
    dispatch(fetchWorkoutPrograms())
  }, [dispatch])

  const handleSelectProgram = (program) => {
    dispatch(selectProgram(program))
    setActiveProgram(program.id)
    setShowCustomTimer(false)
  }

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerContent}>
        <h1>ТАБАТА ТАЙМЕР</h1>
        {loading && <p>Loading...</p>}
        <ul>
          {workoutPrograms.length > 0 ? (
            workoutPrograms.map((program) => (
              <li key={program.id}>
                <span 
                  onClick={() => handleSelectProgram(program)} 
                  className={activeProgram === program.id && !showCustomTimer ? styles.active : ''}
                >
                  {program.name}
                </span>
              </li>
            ))
          ) : (
            <p>Нет доступных программ.</p>
          )}
        </ul>
        <div 
          className={`${styles.configureButton} ${showCustomTimer ? styles.active : ''}`} 
          onClick={() => setShowCustomTimer(true)}
        >
          Настроить самостоятельно
        </div>
        {showCustomTimer ? (
          <CustomTimer />
        ) : (
          <WorkoutDetails />
        )}
      </div>
    </div>
  )
}
