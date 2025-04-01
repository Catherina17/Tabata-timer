import startSound from '../../assets/sounds/startSound.mp3'
import workingSound from '../../assets/sounds/workingSound.mp3'
import restSound from '../../assets/sounds/restSound.mp3'
import endSound from '../../assets/sounds/endSound.mp3'

let startAudio;

export const initializeStartSound = () => {
    startAudio = new Audio(startSound) 
};

export const controlStartSound = (action) => {
    switch (action) {
        case 'play':
            startAudio.currentTime = 0
            startAudio.play().catch(error => {
                console.error("Error playing start sound:", error)
            });
            break;
        case 'pause':
            startAudio.pause()
            break;
        case 'resume':
            startAudio.play().catch(error => {
                console.error("Error resuming start sound:", error)
            });
            break;
        default:
            break;
    }
};


export const playWorkSound = () => {
    const audio = new Audio(workingSound)
    audio.play().catch(error => {
        console.error("Error playing work sound:", error)
    })
};

export const playRestSound = () => {
    const audio = new Audio(restSound)
    audio.play().catch(error => {
        console.error("Error playing rest sound:", error)
    })
};

export const playEndSound = () => {
    const audio = new Audio(endSound)
    audio.play().catch(error => {
        console.error("Error playing end sound:", error)
    })
};
