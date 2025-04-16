import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAudio } from '../../redux/slices/workoutTimerSlice'
import { AUDIO_LIST } from "../../constants/constants.jsx"

export const useAudioPlayer = () => {
  const dispatch = useDispatch()
  const audioRef = useRef(new Audio())
  const currentAudio = useSelector((state) => state.workoutTimer.timer.currentAudio)
  const currentTimer = useSelector((state) => state.workoutTimer.timer)

  useEffect(() => {
    console.log("Текущий таймер:", currentTimer)
    const audioPayload = {
      id: currentTimer.phase,
      isPlaying: currentTimer.isRunning,
    }
    console.log("Обновление состояния currentAudio:", audioPayload)
    dispatch(setAudio(audioPayload))
  }, [dispatch, currentTimer.phase, currentTimer.isRunning])
    
  const createAudioObject = useCallback(() => {
    if (currentAudio && currentAudio.id) { 
      const audioSrc = AUDIO_LIST[currentAudio.id]

      if (audioSrc) { 
        if (audioRef.current.src !== audioSrc) {
          audioRef.current.src = audioSrc
        }
        
        audioRef.current.play()
          .then(() => {
            if (currentAudio.isPlaying) {
              console.log("Аудио воспроизводится:", currentAudio.id)
            } else {
              console.log("Пауза звука, несмотря на успешное воспроизведение.")
              audioRef.current.pause()
            }
          })
          .catch(error => {
            console.error("Ошибка воспроизведения аудио:", error)
          });

      }
    }
  }, [currentAudio.id, currentAudio.isPlaying])

  const clearAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      console.log("Аудио ресурс освобожден.")
    }
  }

  useEffect(() => {
    console.log("Текущий аудио объект:", currentAudio)
    createAudioObject();
    return () => {
      clearAudio();
    }
  }, [currentAudio, createAudioObject])

  return {
    isPlaying: currentAudio?.isPlaying
  }
}
