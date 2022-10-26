import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './states'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})
