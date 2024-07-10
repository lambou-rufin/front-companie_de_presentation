import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

//À utiliser dans toute votre application au lieu de simples 'useDispatch' et 'useSelector'
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()