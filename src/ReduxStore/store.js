import { configureStore } from '@reduxjs/toolkit'

import { blogSlice } from './slices/blogSlice'

export const store = configureStore({
  reducer: { blog: blogSlice.reducer },
})
