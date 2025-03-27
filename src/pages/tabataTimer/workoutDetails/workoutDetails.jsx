import { useSelector, useDispatch } from "react-redux"
import { startTimer } from "../../../redux/slices/workoutTimerSlice"

export const WorkoutDetails = () => {
    const dispatch = useDispatch()
    const { selectedProgram  } = useSelector((state) => state.workoutTimer.timer)

    const handleStart = () => {
        dispatch(startTimer())
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
        <div>
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
            <button onClick={handleStart} disabled={!selectedProgram}>Старт!</button>
        </div>
    )
}