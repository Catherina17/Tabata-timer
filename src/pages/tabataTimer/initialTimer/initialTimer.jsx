import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startTimer, selectProgram, fetchWorkoutPrograms } from '../../../redux/slices/workoutTimerSlice'

export const InitialTimer = () => {
  const dispatch = useDispatch()
  const { workoutPrograms, loading } = useSelector((state) => state.workoutTimer)
  const { selectedProgram } = useSelector((state) => state.workoutTimer.timer)

  useEffect(() => {
    dispatch(fetchWorkoutPrograms())
  }, [dispatch])

  const handleStart = () => {
    dispatch(startTimer())
  }

  const handleSelectProgram = (program) => {
    dispatch(selectProgram(program))
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const calculateTotalTime = (program) => {
    if (!program) return 0

    const workTime = program.workTime || 0
    const restTime = program.restTime || 0
    const cycles = program.cycles || 0

    const preparationTime = 10
    return preparationTime + cycles * (workTime + restTime)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>ТАБАТА ТАЙМЕР</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {workoutPrograms.length > 0 ? (
          workoutPrograms.map((program) => (
            <li key={program.id}>
              <span 
                style={{ cursor: 'pointer', color: 'blue' }} 
                onClick={() => handleSelectProgram(program)}
              >
                {program.name}
              </span>
            </li>
          ))
        ) : (
          <p>Нет доступных программ.</p>
        )}
      </ul>
      <h2>Тренировка</h2>
      {selectedProgram ? (
        <>
          <h3>{selectedProgram.name}</h3>
          <p>{selectedProgram.description}</p>
        </>
      ) : (
        <p>Выберите тренировку или настройте её самостоятельно</p>
      )}
      <p>Время раундов: {selectedProgram ? formatTime(selectedProgram.workTime) : '00:00'}</p>
      <p>Количество раундов: {selectedProgram ? selectedProgram.cycles : '0'}</p>
      <p>Время отдыха: {selectedProgram ? formatTime(selectedProgram.restTime) : '00:00'}</p>
      <p>Общее время: {formatTime(calculateTotalTime(selectedProgram))}</p>
      <button onClick={handleStart} disabled={!selectedProgram}>Старт</button>
    </div>
  );
};
