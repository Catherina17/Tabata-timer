import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AUDIO_LIST } from '../../constants/constants.jsx';

export const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const currentAudio = useSelector((state) => state.workoutTimer.timer.currentAudio);

  const createAudioObject = useCallback(() => {
    if (currentAudio && currentAudio.id) {
      const audioSrc = AUDIO_LIST[currentAudio.id];
      audioRef.current = new Audio(audioSrc);
    }
  }, [currentAudio.id]);

  const clearAudio = useCallback(() => {
    if (audioRef.current && audioRef.current.played) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [currentAudio.id])

  const pauseAudio = useCallback(() => {

    setTimeout(() => {
      currentAudio.isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }, 0);
  }, [currentAudio.isPlaying]);

  useEffect(() => {
    createAudioObject();
    return clearAudio;
  }, [currentAudio.id, createAudioObject])

  useEffect(() => {
    if(audioRef.current)
      pauseAudio()
  }, [currentAudio.isPlaying, audioRef.current]);
};