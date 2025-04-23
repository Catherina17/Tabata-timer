import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import workoutTimerReducer, { startTimer, tick } from '../redux/slices/workoutTimerSlice'
import { TabataTimer } from '../pages/tabataTimer/tabataTimer'
import { WorkoutTimer } from '../pages/tabataTimer/workoutTimer/workoutTimer'
import '@testing-library/jest-dom'

globalThis.Audio = vi.fn(() => ({
  play: vi.fn(() => Promise.resolve()),
  pause: vi.fn(),
  currentTime: 0,
}))

const getInitialState = (overrides = {}) => ({
  workoutPrograms: [],
  loading: false,
  timer: {
    time: 10,
    rounds: 4,
    currentRound: 1,
    phase: 'preparation',
    isRunning: false,
    isStarted: false,
    selectedProgram: {
      id: 1,
      name: 'Test Workout',
      description: 'Test Desc',
      workTime: 10,
      restTime: 5,
      cycles: 4,
    },
    customSettings: {
      workTime: 10,
      restTime: 5,
      rounds: 4,
    },
    ...overrides,
  },
})

describe('Workout Timer - integration and reduction tests', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: { workoutTimer: workoutTimerReducer },
      preloadedState: {
        workoutTimer: structuredClone(getInitialState()),
      },
    })

    vi.spyOn(store, 'dispatch')
  })

  describe('Components: Tabata Timer/Workout Timer', () => {
    it('Starts the timer when the "START" button is pressed.', () => {
      render(
        <Provider store={store}>
          <TabataTimer />
        </Provider>
      )

      const startButton = screen.getByText(/СТАРТ!/i)
      fireEvent.click(startButton)

      expect(store.dispatch).toHaveBeenCalledWith(startTimer())
    })

    it('Stops the timer when the "PAUSE" button is pressed', () => {
      store = configureStore({
        reducer: { workoutTimer: workoutTimerReducer },
        preloadedState: {
          workoutTimer: getInitialState({ isRunning: true, isStarted: true }),
        },
      })

      render(
        <Provider store={store}>
          <WorkoutTimer />
        </Provider>
      )

      const pauseButton = screen.getByText(/Пауза/i)
      fireEvent.click(pauseButton)

      const state = store.getState()
      expect(state.workoutTimer.timer.isRunning).toBe(false)
    })
  })

  describe('Redeser: workoutTimerSlice → tick', () => {
    it('Reduces the time if the timer is running', () => {
      const state = getInitialState({ time: 10, isRunning: true })
      const next = workoutTimerReducer(state, tick())
      expect(next.timer.time).toBe(9)
    })

    it('Does nothing if the timer is not running.', () => {
      const state = getInitialState({ isRunning: false })
      const next = workoutTimerReducer(state, tick())
      expect(next.timer.time).toBe(state.timer.time)
    })

    it('Switches from "preparation" to "workout" if time = 0', () => {
      const state = getInitialState({ phase: 'preparation', time: 1, isRunning: true })
      const next = workoutTimerReducer(state, tick())
      expect(next.timer.phase).toBe('workout')
      expect(next.timer.time).toBe(10)
    })

    it('Switches to "rest" after "workout", if not the last round', () => {
      const state = getInitialState({ phase: 'workout', currentRound: 1, time: 1, isRunning: true })
      const next = workoutTimerReducer(state, tick())
      expect(next.timer.phase).toBe('rest')
      expect(next.timer.currentRound).toBe(2)
      expect(next.timer.time).toBe(5)
    })

    it('Completes the training on the last round', () => {
      const state = getInitialState({ phase: 'workout', currentRound: 4, time: 1, isRunning: true })
      const next = workoutTimerReducer(state, tick())
      expect(next.timer.phase).toBe('end')
      expect(next.timer.isRunning).toBe(false)
    })

    it('Switches from "rest" to "workout"', () => {
      const state = getInitialState({ phase: 'rest', time: 1, isRunning: true })
      const next = workoutTimerReducer(state, tick())
      expect(next.timer.phase).toBe('workout')
      expect(next.timer.time).toBe(10)
    })
  })
})
