import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: []
    }),
    actions: {
        addTask(task) {
            const newTask = { ...task, id: Date.now() }
            this.tasks.unshift(newTask)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },

        loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || []
            this.tasks = tasks
        },

        updateTask(updatedTask) {
            const index = this.tasks.findIndex(task => task.id === updatedTask.id)
            if (index !== -1) {
                this.tasks[index] = updatedTask
                localStorage.setItem('tasks', JSON.stringify(this.tasks))
            }
        },

        deleteTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
    }
})
