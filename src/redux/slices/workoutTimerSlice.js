import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { workoutAPI } from '../../api/workoutAPI';
import startSound from '../../assets/sounds/startSound.mp3';
import workingSound from '../../assets/sounds/workingSound.mp3';
import restSound from '../../assets/sounds/restSound.mp3';
import endSound from '../../assets/sounds/endSound.mp3';

export const fetchWorkoutPrograms = createAsyncThunk(
  'workout/fetchPrograms',
  async () => {
    const data = await workoutAPI.fetchWorkoutPrograms();
    return data;
  }
);

const handleAudio = (audio, action) => {
  switch (action) {
    case 'play':
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.error("Error playing start sound:", error);
      });
      break;
    case 'pause':
      audio.pause();
      break;
    case 'resume':
      audio.play().catch(error => {
        console.error("Error resuming start sound:", error);
      });
      break;
    default:
      break;
  }
};

const initialState = {
  workoutPrograms: [],
  loading: false,
  timer: {
    time: 10,
    rounds: 0,
    currentRound: 1,
    phase: '',
    isRunning: false,
    isStarted: false,
    selectedProgram: null,
    customSettings: {
      workTime: 10,
      restTime: 3,
      rounds: 4,
    },
  },
  sounds: {
    startAudio: null,
    workingAudio: null,
    restAudio: null,
    endAudio: null,
  },
  // sounds: {
  //   startAudio: new Audio(startSound),
  //   workingAudio: new Audio(workingSound),
  //   restAudio: new Audio(restSound),
  //   endAudio: new Audio(endSound),
  // },
  // sounds: {
  //   startSound: startSound,
  //   workingSound: workingSound,
  //   restSound: restSound,
  //   endSound: endSound,
  // },
};

const workoutTimerSlice = createSlice({
  name: 'workoutTimer',
  initialState,
  reducers: {
    initializeSounds: (state) => {
      state.sounds.startAudio = new Audio(startSound);
      state.sounds.workingAudio = new Audio(workingSound);
      state.sounds.restAudio = new Audio(restSound);
      state.sounds.endAudio = new Audio(endSound);
    },
    startTimer: (state) => {
      state.timer.isRunning = true;

      if (!state.timer.isStarted) {
        state.timer.isStarted = true;
        state.timer.phase = 'preparation';
        state.timer.time = 10; 
        handleAudio(state.sounds.startAudio, 'play');
      } else {
        handleAudio(state.sounds.startAudio, 'resume');
      }

      if (!state.timer.selectedProgram) {
        state.timer.rounds = state.timer.customSettings.rounds;
      }
    },
    stopTimer: (state) => {
      state.timer.isRunning = false;
      handleAudio(state.sounds.startAudio, 'pause'); 
    },
    resetTimer: (state) => {
      state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime;
      state.timer.currentRound = 1;
      state.timer.phase = 'preparation';
      state.timer.isRunning = false;
      state.timer.isStarted = false;
      handleAudio(state.sounds.startAudio, 'pause');
    },
    setCustomTimer: (state, action) => {
      state.timer.selectedProgram = null;
      state.timer.customSettings = action.payload;
    },
    selectProgram: (state, action) => {
      state.timer.selectedProgram = action.payload;
      state.timer.time = action.payload.workTime;
      state.timer.rounds = action.payload.cycles;
      state.timer.currentRound = 1;
      state.timer.phase = 'preparation';
    },
    tick: (state) => {
      if (!state.timer.isRunning || state.timer.time <= 0) return;

      state.timer.time -= 1;

      if (state.timer.time === 0) {
        switch (state.timer.phase) {
          case 'preparation':
            state.timer.phase = 'workout';
            state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime;
            handleAudio(state.sounds.workingAudio, 'play');
            break;
          case 'workout':
            if (state.timer.currentRound < state.timer.rounds) {
              state.timer.currentRound++;
              state.timer.phase = 'rest';
              state.timer.time = state.timer.selectedProgram?.restTime || state.timer.customSettings.restTime;
              handleAudio(state.sounds.restAudio, 'play'); 
            } else {
              state.timer.isRunning = false;
              handleAudio(state.sounds.endAudio, 'play'); 
            }
            break;
          case 'rest':
            state.timer.phase = 'workout';
            state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime;
            handleAudio(state.sounds.workingAudio, 'play'); 
            break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkoutPrograms.pending, (state) => {
      state.loading = true;
    });
    
    builder.addCase(fetchWorkoutPrograms.fulfilled, (state, action) => {
      state.workoutPrograms = action.payload;
      state.loading = false;
    });
  },
});

export const { initializeSounds, startTimer, setCustomTimer, stopTimer, selectProgram, resetTimer, tick } = workoutTimerSlice.actions;
export default workoutTimerSlice.reducer;