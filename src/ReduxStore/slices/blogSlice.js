import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//--Posts--//
const fetchPosts = createAsyncThunk('post/posts', async (pageNumber, { rejectWithValue }) => {
  console.log(pageNumber)
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10`)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const blogSlice = createSlice({
  name: 'post',
  initialState: { posts: [], isLoading: false },

  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.isLoading = false
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload
      state.isLoading = true
    },
    [fetchPosts.rejected]: (state, { error }) => {
      console.log(error.message)
      state.isLoading = true
    },
  },
})

export { blogSlice, fetchPosts }
