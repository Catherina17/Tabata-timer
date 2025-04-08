import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSound, addSound } from '../../redux/slices/workoutTimerSlice'
import startSound from '../../assets/sounds/startSound.mp3'
import workingSound from '../../assets/sounds/workingSound.mp3'
import restSound from '../../assets/sounds/restSound.mp3'
import endSound from '../../assets/sounds/endSound.mp3'

export const useAudioPlayer = (id) => {
    const dispatch = useDispatch()
    const audioRef = useRef(null)
    const sound = useSelector((state) => state.workoutTimer.sounds.find((s) => s.id === id))
    const soundsInState = useSelector((state) => state.workoutTimer.sounds)

    useEffect(() => {
        const sounds = [
          { id: 'start', src: startSound },
          { id: 'working', src: workingSound },
          { id: 'rest', src: restSound },
          { id: 'end', src: endSound },
        ]
    
        sounds.forEach((sound) => {
            if (!soundsInState.some((s) => s.id === sound.id)) {
                dispatch(addSound(sound))
            }
        })
      }, [dispatch, soundsInState])

    useEffect(() => {
        if (sound) {
            console.log("Создание аудио для звука:", sound)
            audioRef.current = new Audio(sound.src)
            audioRef.current.volume = sound.volume

            return () => {
                if (audioRef.current) {
                    audioRef.current.pause()
                    audioRef.current.src = ''
                    audioRef.current = null
                    console.log("Аудио ресурс освобожден.")
                }
            }   
        }
    }, [sound])

    useEffect(() => {
        if (!audioRef.current || !sound) return

        if (sound.isPlaying) {
            console.log("Воспроизведение звука:", sound.id)
            audioRef.current.play().catch(error => {
                console.error("Ошибка воспроизведения аудио:", error)
            })
        } else {
            console.log("Пауза звука:", sound.id)
            audioRef.current.pause()
        }
    }, [sound])

    const handleToggleSound = () => {
        console.log("Переключение звука:", id)
        dispatch(toggleSound(id))
    }

    return {
        isPlaying: sound?.isPlaying,
        handleToggleSound,
    }
}