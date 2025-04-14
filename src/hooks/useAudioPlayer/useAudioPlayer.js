import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAudio } from '../../redux/slices/workoutTimerSlice'
import { AUDIO_LIST } from "../../constants/constants.jsx"

export const useAudioPlayer = () => {
  const dispatch = useDispatch()
  const audioRef = useRef(new Audio())
  const currentAudio = useSelector((state) => state.workoutTimer.currentAudio)
  const currentTimer = useSelector((state) => state.workoutTimer.timer)

  /* 
  этот useEffect срабатывает при монтировании компонента, при отправке данных в редакс и
  при изменении состояния запуска таймера currentTimer.
  Он нужен чтобы синхронизировать состояние аудио с состоянием таймера, т.е. если таймер запущен 
  и определена фаза, нужно проигрывать соответствующий звук.
  */
  useEffect(() => {
    console.log("Текущий таймер:", currentTimer)
    /* если таймер запущен и есть текущая фаза, создаётся объект audioPayload с названием текущей фазы
    и состоянием запуска таймера (true/false). 
    */
    if (currentTimer.isRunning && currentTimer.phase) { 
      const audioPayload = {
        id: currentTimer.phase,
        isPlaying: currentTimer.isRunning,
      }

      console.log("Обновление состояния currentAudio:", audioPayload)

      dispatch(setAudio(audioPayload))
      /* Далее с помощью dispatch эти данные отправляются в редакс, а setAudio обновляет initial state. */
    }
  }, [dispatch, currentTimer])
    
  /* эта функция отвечает за воспроизведение и остановку нужного звука
  useCallback нужен, чтобы функция не пересоздавалась при каждом рендере, а лишь при изменении currentAudio.
  */
  const createAudioObject = useCallback(() => {
    /* 
    если currentAudio существует и у него есть id, то мы обращаемся к нужному звуку в AUDIO_LIST 
    по currentAudio.id (он здесь выступает в роли ключа, ведь название id соответсвует ключу в AUDIO_LIST). 
    */
    if (currentAudio && currentAudio.id) { 
      const audioSrc = AUDIO_LIST[currentAudio.id]

      /* если ключ существует, то.. */
      if (audioSrc) { 
        /* 
        если текущий звук не равен audioSrc (клююч другой), то мы обновляем текущий звук.
        */
        if (audioRef.current.src !== audioSrc) {
          audioRef.current.src = audioSrc
        }

        /* если звук воспроизведён, то он играет, если нет - останавливается */
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

  /*
  если текущий звук существует, то он становится на паузу и путь очищается.
  */
  const clearAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      console.log("Аудио ресурс освобожден.")
    }
  }

  /*
  эффект срабатывает при изменении состояния currentAudio и функции createAudioObject. В этих случаяъ
  вызывается функция createAudioObject(). Но т.к. эффект - асинхронный, то если обновление функции 
  будет быстрее, то будет вызвана clearAudio().
  */
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