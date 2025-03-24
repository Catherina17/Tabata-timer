// вариант, где начальные состояния объединены в timer
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
    selectedProgram: null
  }
}

// const initialState = {
//   workoutPrograms: [],
//   loading: false,
//   time: 10,
//   rounds: 0,
//   currentRound: 1,
//   phase: 'preparation', 
//   isRunning: false,
//   isStarted: false,
//   selectedProgram: null,
// }

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
    },
    stopTimer: (state) => {
      state.timer.isRunning = false
    },
    resetTimer: (state) => {
      state.timer.time = state.timer.selectedProgram ? state.timer.selectedProgram.workTime : 10
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
          state.timer.time = state.timer.selectedProgram ? state.timer.selectedProgram.workTime : 20
          return
        }

        if (state.timer.phase === 'workout' && state.timer.time === 0) {
          state.timer.currentRound++
          state.timer.phase = 'rest'
          state.timer.time = state.timer.selectedProgram ? state.timer.selectedProgram.restTime : 10
          return
        } 
        
        if (state.timer.phase === 'rest' && state.timer.time === 0) {
          if (state.timer.currentRound < state.timer.rounds) {
            state.timer.phase = 'workout'
            state.timer.time = state.timer.selectedProgram ? state.timer.selectedProgram.workTime : 20
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

export const { startTimer, stopTimer, resetTimer, tick, selectProgram } = workoutTimerSlice.actions
export default workoutTimerSlice.reducer


// начальный вариант!
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { workoutAPI } from '../../api/workoutAPI'

// export const fetchWorkoutPrograms = createAsyncThunk(
//   'workout/fetchPrograms',
//   async () => {
//     const data = await workoutAPI.fetchWorkoutPrograms()
//     return data
//   }
// )

// const initialState = {
//   workoutPrograms: [],
//   loading: false,
//   time: 10,
//   rounds: 0,
//   currentRound: 1,
//   phase: 'preparation', 
//   isRunning: false,
//   isStarted: false,
//   selectedProgram: null,
// }

// const workoutTimerSlice = createSlice({
//   name: 'workoutTimer',
//   initialState,
//   reducers: {
//     startTimer: (state) => {
//       state.isRunning = true

//       if (!state.isStarted) {
//         state.isStarted = true
//         state.phase = 'preparation'
//         state.time = 10
//       } 
//     },
//     stopTimer: (state) => {
//       state.isRunning = false
//     },
//     resetTimer: (state) => {
//       state.time = state.selectedProgram ? state.selectedProgram.workTime : 10
//       state.currentRound = 1
//       state.phase = 'preparation'
//       state.isRunning = false
//       state.isStarted = false
//     },
//     tick: (state) => {
//       if (state.isRunning && state.time > 0) {
//         state.time -= 1;

//         if (state.phase === 'preparation' && state.time === 0) {
//           state.phase = 'workout';
//           state.time = state.selectedProgram ? state.selectedProgram.workTime : 20
//           return
//         }

//         if (state.phase === 'workout' && state.time === 0) {
//           state.currentRound++
//           state.phase = 'rest'
//           state.time = state.selectedProgram ? state.selectedProgram.restTime : 10
//           return
//         } 
        
//         if (state.phase === 'rest' && state.time === 0) {
//           if (state.currentRound < state.rounds) {
//             state.phase = 'workout'
//             state.time = state.selectedProgram ? state.selectedProgram.workTime : 20
//             return
//           }
          
//           state.isRunning = false
//         }
//       }
//     },
//     selectProgram: (state, action) => {
//       state.selectedProgram = action.payload
//       state.time = action.payload.workTime
//       state.rounds = action.payload.cycles
//       state.currentRound = 1
//       state.phase = 'preparation'
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchWorkoutPrograms.pending, (state) => {
//       state.loading = true
//     }),
//     builder.addCase(fetchWorkoutPrograms.fulfilled, (state, action) => {
//       state.workoutPrograms = action.payload
//       state.loading = false
//     })
//   },
// })

// export const { startTimer, stopTimer, resetTimer, tick, selectProgram } = workoutTimerSlice.actions
// export default workoutTimerSlice.reducer
