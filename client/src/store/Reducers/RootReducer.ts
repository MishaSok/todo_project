import { combineReducers } from '@reduxjs/toolkit'
import foldersSlice from '../Reducers/FoldersReducer/FoldersSlice'

const rootReducer = combineReducers({
  foldersStore: foldersSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
