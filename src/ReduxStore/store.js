import { configureStore } from '@reduxjs/toolkit'
import useReducer from './newsDetail'
export const store = configureStore({
  reducer: {
    news: useReducer,
    newss:useReducer


  },
})