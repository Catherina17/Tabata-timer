import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAudio } from '../../redux/slices/workoutTimerSlice'
import { AUDIO_LIST } from "../../constants/constants.jsx"

export const useAudioPlayer = () => {
  const dispatch = useDispatch()
  const audioRef = useRef(new Audio())
  const currentAudio = useSelector((state) => state.workoutTimer.currentAudio)
  const currentTimer = useSelector((state) => state.workoutTimer.timer)

  useEffect(() => {
    console.log("Текущий таймер:", currentTimer)
    if (currentTimer.isRunning && currentTimer.phase) {
      const audioPayload = {
        id: currentTimer.phase,
        isPlaying: currentTimer.isRunning,
      }

      console.log("Обновление состояния currentAudio:", audioPayload)
      dispatch(setAudio(audioPayload))
    }
  }, [dispatch, currentTimer.isRunning, currentTimer.phase])
    

  const createAudioObject = useCallback(() => {
    if (currentAudio && currentAudio.id) { 
      const audioSrc = AUDIO_LIST[currentAudio.id]

      if (audioSrc) { 
        if (audioRef.current.src !== audioSrc) {
          audioRef.current.src = audioSrc
        }

        if (currentAudio.isPlaying) {
          console.log("Воспроизведение звука:", currentAudio.id)
          audioRef.current.play().catch(error => {
            console.error("Ошибка воспроизведения аудио:", error)
          })
        } else {
          console.log("Пауза звука:", currentAudio.isPlaying)
          audioRef.current.pause()
        }
      }
    } 
  }, [currentAudio])

  const clearAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      console.log("Аудио ресурс освобожден.")
    }
  }

  useEffect(() => {
    console.log("Текущий аудио объект:", currentAudio)
    createAudioObject()
    return () => {
      clearAudio()
    }
  }, [currentAudio, createAudioObject])

  return {
    isPlaying: currentAudio?.isPlaying
  }
}