import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data:[],
  
}

export const jobsSlice = createSlice({
  name: 'joblist',
  initialState,
  reducers: {
    AddJobs: (state,action) => {
      state.data = action.payload
    },
    AddJobsOnScroll: (state,action) => {
      const arr=state.data
      state.data =arr.push(action.payload)
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { AddJobs,AddJobsOnScroll} = jobsSlice.actions

export default jobsSlice.reducer
