import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProgram, fetchWorkoutPrograms } from '../../../redux/slices/workoutTimerSlice'
import { WorkoutDetails } from '../workoutDetails/workoutDetails';
import { CustomTimer } from '../customTimer/customTimer';

export const InitialTimer = () => {
  const dispatch = useDispatch()
  const { workoutPrograms, loading } = useSelector((state) => state.workoutTimer)
  const [showCustomTimer, setShowCustomTimer] = useState(false)

  useEffect(() => {
    dispatch(fetchWorkoutPrograms())
  }, [dispatch])

  const handleSelectProgram = (program) => {
    dispatch(selectProgram(program))
    setShowCustomTimer(false)
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
      <div onClick={() => setShowCustomTimer(true)}>Настроить самостоятельно</div>
      {showCustomTimer ? (
        <CustomTimer />
      ) : (
        <WorkoutDetails />
      )}
    </div>
  );
};
