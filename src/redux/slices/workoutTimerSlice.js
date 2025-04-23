import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { workoutAPI } from '../../api/workoutAPI'
import { audioPlayer } from '../../services/audioPlayer'

export const fetchWorkoutPrograms = createAsyncThunk(
  'workout/fetchPrograms',
  async () => {
    const data = await workoutAPI.fetchWorkoutPrograms()
    return data
  }
)

const initialState = {
  workoutPrograms: [], 
  loading: false, 
  timer: { 
    time: 10, 
    rounds: 0, 
    currentRound: 1, 
    phase: 'preparation', 
    isRunning: false, 
    isStarted: false, 
    selectedProgram: null, 
    customSettings: { 
      workTime: 10,
      restTime: 3, 
      rounds: 4,
    },
  },
}

const workoutTimerSlice = createSlice({
  name: 'workoutTimer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.timer.isRunning = true;

      if (!state.timer.isStarted) {
        state.timer.isStarted = true
        state.timer.phase = 'preparation'
        state.timer.time = 10
        audioPlayer('preparation', 'play')
      }

      if (!state.timer.selectedProgram) {
        state.timer.rounds = state.timer.customSettings.rounds
      }

      if (state.timer.isStarted && state.timer.phase === 'preparation') {
        return audioPlayer('preparation', 'resume')
      }
    },
    stopTimer: (state) => {
      state.timer.isRunning = false
      audioPlayer('preparation', 'pause')
    },
    resetTimer: (state) => {
      state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime
      state.timer.currentRound = 1
      state.timer.phase = 'preparation'
      state.timer.isRunning = false
      state.timer.isStarted = false
      audioPlayer('preparation', 'pause')
    },
    tick: (state) => {
      if (!state.timer.isRunning || state.timer.time <= 0) return

      state.timer.time -= 1

      if (state.timer.time === 0) {
        switch (state.timer.phase) {
          case 'preparation':
            state.timer.phase = 'workout'
            state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime
            audioPlayer('workout', 'play')
            break;

          case 'workout':
            if (state.timer.currentRound < state.timer.rounds) {
              state.timer.currentRound++
              state.timer.phase = 'rest'
              state.timer.time = state.timer.selectedProgram?.restTime || state.timer.customSettings.restTime
              audioPlayer('rest', 'play')
            } else {
              state.timer.isRunning = false
              state.timer.phase = 'end'
              audioPlayer('end', 'play')
            }
            break;

          case 'rest':
            state.timer.phase = 'workout'
            state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime
            audioPlayer('workout', 'play')
            break;
        }
      }
    },
    setCustomTimer: (state, action) => {
      state.timer.selectedProgram = null
      state.timer.customSettings = action.payload
    },

    selectProgram: (state, action) => {
      state.timer.selectedProgram = action.payload
      state.timer.time = action.payload.workTime
      state.timer.rounds = action.payload.cycles
      state.timer.currentRound = 1
      state.timer.phase = 'preparation'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkoutPrograms.pending, (state) => {
      state.loading = true
    });
    builder.addCase(fetchWorkoutPrograms.fulfilled, (state, action) => {
      state.workoutPrograms = action.payload
      state.loading = false
    });
    builder.addCase(fetchWorkoutPrograms.rejected, (state) => {
      state.loading = false
    });
  },
})

export const { startTimer, setCustomTimer, stopTimer, selectProgram, resetTimer, tick } = workoutTimerSlice.actions
export default workoutTimerSlice.reducer