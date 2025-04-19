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
    const audioPayload = {
      id: currentTimer.phase,
      isPlaying: currentTimer.isRunning,
    }
    dispatch(setAudio(audioPayload))
  }, [dispatch, currentTimer.phase, currentTimer.isRunning])
    
  const createAudioObject = useCallback(() => {    
    if (currentAudio && currentAudio.id) { 
      const audioSrc = AUDIO_LIST[currentAudio.id];

      if (audioSrc) { 
        if (audioRef.current.src !== audioSrc) {
          audioRef.current.src = audioSrc;
        }

        if (currentAudio.isPlaying) {
          audioRef.current.play().catch((error) => {  
            console.log('Ошибка воспроизведения аудио:', error);
          });
        } else {
          audioRef.current.pause();
        }
      }
    }
  }, [currentAudio.id, currentAudio.isPlaying])
  
  const clearAudio = () => {
    // audioRef.current = new Audio();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  }

  useEffect(() => {
    createAudioObject();
    return () => {
      clearAudio();
    }
  }, [currentAudio, createAudioObject])

  return {
    isPlaying: currentAudio?.isPlaying
  }
}