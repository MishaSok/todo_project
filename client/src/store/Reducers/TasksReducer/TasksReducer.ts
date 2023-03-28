import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TaskType = {
  id: number
  name: string
  completed: boolean
  folderName: string
  timeToday: string
  timeTotal: string
}

interface TaskState {
  tasks: TaskType[]
}

const initialState: TaskState = {
  tasks: [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TaskType[]>) {
      state.tasks = action.payload
    },
    addTask(state, action: PayloadAction<TaskType>) {
      state.tasks.push(action.payload)
    },
    removeTask(state, action: PayloadAction<TaskType>) {
      state.tasks.filter((task) => task.id !== action.payload.id)
    },
  },
})

export const { setTasks, addTask, removeTask } = tasksSlice.actions

export default tasksSlice.reducer
