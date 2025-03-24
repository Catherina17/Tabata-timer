import { configureStore } from '@reduxjs/toolkit'
import workoutTimerSlice from './slices/workoutTimerSlice'

export const store = configureStore({
  reducer: {
    workoutTimer: workoutTimerSlice
  },
})