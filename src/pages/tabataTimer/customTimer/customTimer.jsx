import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startTimer, setCustomTimer } from '../../../redux/slices/workoutTimerSlice'
import { InputField } from '../../../components/ui/input/input'
import { Button } from '../../../components/ui/button/button'
import { controlStartSound, initializeStartSound } from '../../../components/services/soundPlayer'
import styles from './customTimer.module.css'

export const CustomTimer = () => {
  const dispatch = useDispatch();
  const { workTime, restTime, rounds } = useSelector((state) => state.workoutTimer.timer.customSettings)

  const [customWorkTime, setCustomWorkTime] = useState(workTime)
  const [customRestTime, setCustomRestTime] = useState(restTime)
  const [customRounds, setCustomRounds] = useState(rounds)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(setCustomTimer({ 
        workTime: customWorkTime, 
        restTime: customRestTime, 
        rounds: customRounds 
    }))
    dispatch(startTimer())

    initializeStartSound()
    controlStartSound('play')
  };

  const handleWorkTimeChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    setCustomWorkTime(value)
  }

  const handleRestTimeChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    setCustomRestTime(value)
  }

  const handleRoundsChange = (e) => {
    const value = e.target.value === '' ? '' : Number(e.target.value)
    setCustomRounds(value)
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
          value={customWorkTime} 
          onChange={handleWorkTimeChange} 
        />
        <InputField 
          label='Время отдыха (сек): '
          value={customRestTime} 
          onChange={handleRestTimeChange} 
        />
        <InputField 
          label='Количество раундов: '
          value={customRounds} 
          onChange={handleRoundsChange} 
        />
        <Button type='submit'>Сохранить и начать</Button>
      </form>
    </>
  )
}
