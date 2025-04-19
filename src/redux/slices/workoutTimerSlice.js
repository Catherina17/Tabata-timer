import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { workoutAPI } from '../../api/workoutAPI'

export const fetchWorkoutPrograms = createAsyncThunk(
  'workout/fetchPrograms',
  async () => {
    const data = await workoutAPI.fetchWorkoutPrograms()
    return data
  }
)

const initialState = {
  workoutPrograms: [], // список тренировок с сервера
  loading: false, // загрузка программ
  timer: { // объект для состояний таймера
    time: 10, // время таймера, оно берётся для его работы
    rounds: 0, // количество всех раундов
    currentRound: 1, // текущий раунд
    phase: 'preparation', // фаза тренировки
    isRunning: false, // запущен ли таймер, работает ли он или на паузе
    isStarted: false, // для инициализации запуска таймера, был ли он запущен в первый раз или нет
    selectedProgram: null, // выбранная программа с тренировками, нужна для инициализации данных о ней
    customSettings: { // объект с состояниями для пользовательской настройки таймреа
      workTime: 10, // время таймера для фазы "работа"
      restTime: 3, // время для фазы "отдыха"
      rounds: 4, // количество раундов
    },
    currentAudio: { // состояние для аудио
      id: 'preparation', // id звука (название текущей фазы)
      isPlaying: false // проигрывается ли звук
    }
  },
  // currentAudio: { // это пробный вариант был
  //   id: null,
  //   isPlaying: false,
  //   volume: 1, 
  // },  // при инициализации null - далее {id: phase, isPlaying: isRunning}  - можно добавить timer
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
        state.timer.time = 5
      }

      if (!state.timer.selectedProgram) {
        state.timer.rounds = state.timer.customSettings.rounds
      }
    },
    stopTimer: (state) => {
      state.timer.isRunning = false
    },
    resetTimer: (state) => {
      state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime
      state.timer.currentRound = 1
      state.timer.phase = 'preparation'
      state.timer.isRunning = false
      state.timer.isStarted = false
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
    tick: (state) => {
      if (!state.timer.isRunning || state.timer.time <= 0) return

      state.timer.time -= 1

      if (state.timer.time === 0) {
        switch (state.timer.phase) {
          case 'preparation':
            state.timer.phase = 'workout'
            state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime
            break;
          case 'workout':
            if (state.timer.currentRound < state.timer.rounds) {
              state.timer.currentRound++
              state.timer.phase = 'rest'
              state.timer.time = state.timer.selectedProgram?.restTime || state.timer.customSettings.restTime
            } else {
              state.timer.phase = 'end'
              state.timer.isRunning = true
            }
            break;
          case 'rest':
            state.timer.phase = 'workout'
            state.timer.time = state.timer.selectedProgram?.workTime || state.timer.customSettings.workTime
            break
        }
      }
    },
    setAudio: (state, action) => {     
      state.timer.currentAudio = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkoutPrograms.pending, (state) => {
      state.loading = true;
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

export const { startTimer, setCustomTimer, stopTimer, selectProgram, resetTimer, tick, setAudio } = workoutTimerSlice.actions
export default workoutTimerSlice.reducer