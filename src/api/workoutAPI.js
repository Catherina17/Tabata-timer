export const workoutAPI = {
    async fetchWorkoutPrograms() {
        try {
            const response = await fetch('https://run.mocky.io/v3/4172c113-6932-4c28-b419-5e01c2fdabba')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            return data.workoutPrograms
        } catch (error) {
            console.error('Ошибка при получении программ тренировок:', error)
            return []
        }
    },
};

// {
//     "workoutPrograms": [
//       {
//         "id": 1,
//         "name": "Утренняя тренировка",
//         "description": "Энергичная утренняя тренировка для бодрости на весь день.",
//         "cycles": 8,
//         "workTime": 20,
//         "restTime": 10
//       },
//       {
//         "id": 2,
//         "name": "Интенсивная тренировка",
//         "description": "Высокоинтенсивная тренировка для максимального сжигания калорий.",
//         "cycles": 10,
//         "workTime": 25,
//         "restTime": 5
//       },
//       {
//         "id": 3,
//         "name": "Вечерняя тренировка",
//         "description": "Расслабляющая вечерняя тренировка для снятия стресса.",
//         "cycles": 6,
//         "workTime": 30,
//         "restTime": 15
//       }
//     ]
//   }