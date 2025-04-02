import { useDispatch, useSelector } from 'react-redux'
import { startTimer, setCustomTimer } from '../../../redux/slices/workoutTimerSlice'
import { InputField } from '../../../components/ui/input/input'
import { Button } from '../../../components/ui/button/button'
import { controlStartSound, initializeStartSound } from '../../../components/services/soundPlayer'
import styles from './customTimer.module.css'

export const CustomTimer = () => {
  const dispatch = useDispatch()
  const { workTime, restTime, rounds } = useSelector((state) => state.workoutTimer.timer.customSettings)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(setCustomTimer({ 
        workTime, 
        restTime, 
        rounds 
    }))
    dispatch(startTimer())

    initializeStartSound()
    controlStartSound('play')
  }

  const handleWorkTimeChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    dispatch(setCustomTimer({ workTime: value, restTime, rounds }))
  }

  const handleRestTimeChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    dispatch(setCustomTimer({ workTime, restTime: value, rounds }))
  }

  const handleRoundsChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    dispatch(setCustomTimer({ workTime, restTime, rounds: value }))
  }

  return (
    <>
      <h2>Настройте свою тренировку</h2>
      <div className={styles.description}>
        Создайте тренировку, которая соответствует вашим целям и уровню подготовки.
      </div>
      <form onSubmit={handleSubmit}>
        <InputField 
          label='Время работы (сек): ' 
          value={workTime}
          onChange={handleWorkTimeChange} 
        />
        <InputField 
          label='Время отдыха (сек): '
          value={restTime} 
          onChange={handleRestTimeChange} 
        />
        <InputField 
          label='Количество раундов: '
          value={rounds}
          onChange={handleRoundsChange} 
        />
        <Button type='submit'>Сохранить и начать</Button>
      </form>
    </>
  )
}
