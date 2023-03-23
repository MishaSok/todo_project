import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppDispatch } from '../index'
import { RootState } from '../Reducers/RootReducer'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
