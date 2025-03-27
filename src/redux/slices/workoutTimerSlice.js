import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { workoutAPI } from '../../api/workoutAPI'

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
    phase: '', 
    isRunning: false,
    isStarted: false,
    selectedProgram: null,
    customSettings: {
      workTime: 10,
      restTime: 3,
      rounds: 4
    }
  }
}

const workoutTimerSlice = createSlice({
  name: 'workoutTimer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.timer.isRunning = true

      if (!state.timer.isStarted) {
        state.timer.isStarted = true
        state.timer.phase = 'preparation'
        state.timer.time = 10
      } 

      if (!state.timer.selectedProgram) {
        state.timer.rounds = state.timer.customSettings.rounds;
      }
    },
    stopTimer: (state) => {
      state.timer.isRunning = false
    },
    setCustomTimer: (state, action) => {
      const { workTime, restTime, rounds } = action.payload;
      state.timer.selectedProgram = null;
      state.timer.customSettings = {
        workTime,
        restTime,
        rounds
      };
    },
    resetTimer: (state) => {
      state.timer.time = state.timer.selectedProgram 
        ? state.timer.selectedProgram.workTime 
        : state.timer.customSettings.workTime
      state.timer.currentRound = 1
      state.timer.phase = 'preparation'
      state.timer.isRunning = false
      state.timer.isStarted = false
    },
    selectProgram: (state, action) => {
      state.timer.selectedProgram = action.payload
      state.timer.time = action.payload.workTime
      state.timer.rounds = action.payload.cycles
      state.timer.currentRound = 1
      state.timer.phase = 'preparation'
    },
    tick: (state) => {
      if (state.timer.isRunning && state.timer.time > 0) {
        state.timer.time -= 1

        if (state.timer.phase === 'preparation' && state.timer.time === 0) {
          state.timer.phase = 'workout'
          state.timer.time = state.timer.selectedProgram 
            ? state.timer.selectedProgram.workTime 
            : state.timer.customSettings.workTime
          return
        }

        if (state.timer.phase === 'workout' && state.timer.time === 0) {
          state.timer.currentRound++
          state.timer.phase = 'rest'
          state.timer.time = state.timer.selectedProgram 
            ? state.timer.selectedProgram.restTime 
            : state.timer.customSettings.restTime
          return
        } 
        
        if (state.timer.phase === 'rest' && state.timer.time === 0) {
          if (state.timer.currentRound <= state.timer.rounds) {
            state.timer.phase = 'workout'
            state.timer.time = state.timer.selectedProgram 
              ? state.timer.selectedProgram.workTime 
              : state.timer.customSettings.workTime
            return
          }
          
          state.timer.isRunning = false
        }
      }
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
  },
})

export const { startTimer, stopTimer, setCustomTimer, resetTimer, tick, selectProgram } = workoutTimerSlice.actions
export default workoutTimerSlice.reducer
