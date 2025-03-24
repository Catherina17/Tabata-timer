export const workoutAPI = {
    async fetchWorkoutPrograms() {
        try {
            const response = await fetch('https://run.mocky.io/v3/8ec4700e-0c86-45c1-ab55-cd5b80d5ed73')
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
