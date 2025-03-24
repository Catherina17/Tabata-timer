
import { useSelector } from 'react-redux'
import { InitialTimer } from './initialTimer/initialTimer'
import { WorkoutTimer } from './workoutTimer/workoutTimer'

export const TabataTimer = () => {
  const { isStarted } = useSelector((state) => state.workoutTimer.timer)

  return (
    <>
      {!isStarted && <InitialTimer/>}
      {isStarted && <WorkoutTimer />}
    </>
  );
};