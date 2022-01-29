import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPhotos = createAsyncThunk('photos/getPhotos', async (value) => {
  const response = await axios(
    `https://picsum.photos/v2/list?page=3&limit=${value}`,
  )
  return response?.data
})

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    photos: [],
    isLoading: false,
  },
  extraReducers: {
    [getPhotos.pending]: (state) => {
      state.isLoading = true
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.isLoading = false
      state.photos = [...state.photos, ...action.payload]
    },
    [getPhotos.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

export default gallerySlice.reducer
