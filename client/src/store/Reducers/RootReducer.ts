import { combineReducers } from '@reduxjs/toolkit'
import foldersSlice from './FoldersReducer/FoldersSlice'
import tasksSlice from './TasksReducer/TasksReducer'

const rootReducer = combineReducers({
  foldersSlice,
  tasksSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
