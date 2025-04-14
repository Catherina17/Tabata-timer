import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, stopTimer, resetTimer, tick } from '../../redux/slices/workoutTimerSlice';

export const useWorkoutTimer = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.workoutTimer.timer.time)
  const rounds = useSelector((state) => state.workoutTimer.timer.rounds)
  const currentRound = useSelector((state) => state.workoutTimer.timer.currentRound)
  const phase = useSelector((state) => state.workoutTimer.timer.phase)
  const isRunning = useSelector((state) => state.workoutTimer.timer.isRunning)

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  const handleStart = () => {
    dispatch(startTimer());
  };

  const handleStop = () => {
    dispatch(stopTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isWorkoutCompleted = !isRunning && currentRound >= rounds && time === 0;

  return { time, rounds, currentRound, phase, isRunning, isWorkoutCompleted, formatTime, handleStart, handleStop, handleReset };
};
