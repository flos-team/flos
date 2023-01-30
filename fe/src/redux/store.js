import { configureStore } from '@reduxjs/toolkit'
import pageComponent from './pageComponent'

export const store = configureStore({
  reducer: {
    page: pageComponent,
  },
})