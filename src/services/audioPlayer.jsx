import { AUDIO_LIST } from '../constants/constants.jsx'

const audioInstances = {};

export const audioPlayer = (phase, action) => {
  if (!audioInstances[phase]) {
    audioInstances[phase] = new Audio(AUDIO_LIST[phase])
  }

  const audio = audioInstances[phase]
  if (!audio) return

  switch (action) {
    case 'play':
      audio.currentTime = 0;
      audio.play().catch((error) =>
        console.error(`Ошибка при воспроизведении фазы ${phase}:`, error)
      )
      break;
    case 'pause':
      audio.pause()
      break;
    case 'resume':
      audio.play().catch((error) =>
        console.error(`Ошибка при воспроизведении фазы ${phase}:`, error)
      )
      break;
    default:
      break;
  }
}