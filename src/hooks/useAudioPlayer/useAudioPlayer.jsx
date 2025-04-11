import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAudio } from '../../redux/slices/workoutTimerSlice';
import { AUDIO_LIST } from "../../constants/constants.jsx";

export const useAudioPlayer = () => {
    const dispatch = useDispatch();
    const audioRef = useRef(new Audio());
    const currentAudio = useSelector((state) => state.workoutTimer.currentAudio);
    const currentTimer = useSelector((state) => state.workoutTimer.timer);

    // Эффект для установки текущего аудио при запуске таймера
    useEffect(() => {
        console.log("Текущий таймер:", currentTimer);
        if (currentTimer.isRunning && currentTimer.phase) {
            const audioPayload = {
                id: currentTimer.phase,
                isPlaying: currentTimer.isRunning,
            };
            console.log("Обновление состояния currentAudio:", audioPayload); // Логируем перед отправкой
            dispatch(setAudio(audioPayload));
        }
    }, [dispatch, currentTimer.isRunning, currentTimer.phase]);
    

    // Функция для создания аудио объекта
    const createAudioObject = useCallback(() => {
        if (currentAudio && currentAudio.id) { // Проверка на наличие currentAudio
            const audioSrc = AUDIO_LIST[currentAudio.id];

            if (audioSrc) { // Проверка, существует ли audioSrc
                if (audioRef.current.src !== audioSrc) {
                    audioRef.current.src = audioSrc;
                }

                if (currentAudio.isPlaying) {
                    console.log("Воспроизведение звука:", currentAudio.id);
                    audioRef.current.play().catch(error => {
                        console.error("Ошибка воспроизведения аудио:", error);
                    });
                } else {
                    console.log("Пауза звука:", currentAudio.isPlaying);
                    audioRef.current.pause();
                }
            }
        } 
    }, [currentAudio]); // Добавляем currentAudio как зависимость

    // Функция для очистки аудио
    const clearAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
            console.log("Аудио ресурс освобожден.");
        }
    };

    // Эффект для обработки текущего аудио
    useEffect(() => {
        console.log("Текущий аудио объект:", currentAudio);
        createAudioObject(); // Теперь вызываем createAudioObject, и он сам проверит currentAudio

        return () => {
            clearAudio();
        };
    }, [currentAudio, createAudioObject]);

    return {
        isPlaying: currentAudio?.isPlaying,
    };
};
