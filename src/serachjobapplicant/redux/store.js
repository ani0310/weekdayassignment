import { configureStore } from '@reduxjs/toolkit'
import  jobsSlice  from './joblistslice'

export const store = configureStore({
  reducer: jobsSlice,
})