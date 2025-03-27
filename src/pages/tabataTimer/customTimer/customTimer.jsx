import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, setCustomTimer } from '../../../redux/slices/workoutTimerSlice';
import { InputField } from '../../../components/ui/input/input';

export const CustomTimer = () => {
  const dispatch = useDispatch();
  const { workTime, restTime, rounds } = useSelector((state) => state.workoutTimer.timer.customSettings);

  // Локальное состояние для хранения пользовательских настроек
  const [customWorkTime, setCustomWorkTime] = useState(workTime);
  const [customRestTime, setCustomRestTime] = useState(restTime);
  const [customRounds, setCustomRounds] = useState(rounds);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCustomTimer({ workTime: customWorkTime, restTime: customRestTime, rounds: customRounds }));
    dispatch(startTimer());
  };

    return (
        <div>
            <h2>Настройте свою тренировку</h2>
            <form onSubmit={handleSubmit}>
                <InputField 
                    label="Время работы (сек): " 
                    value={customWorkTime} 
                    onChange={(e) => setCustomWorkTime(Number(e.target.value))} 
                />
                <InputField 
                    label="Время отдыха (сек): " 
                    value={customRestTime} 
                    onChange={(e) => setCustomRestTime(Number(e.target.value))} 
                />
                <InputField 
                    label="Количество раундов: " 
                    value={customRounds} 
                    onChange={(e) => setCustomRounds(Number(e.target.value))} 
                />
                <button type="submit">Сохранить и начать</button>
            </form>
        </div>
    );
};
