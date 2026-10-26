import { createSlice } from '@reduxjs/toolkit'

const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState: {
    currentTrack: null,
  },
  reducers: {
    setCurrentTrack(state, action) {
      state.currentTrack = action.payload
    },
    clearCurrentTrack(state) {
      state.currentTrack = null
    },
  },
})

export const { setCurrentTrack, clearCurrentTrack } = nowPlayingSlice.actions
export default nowPlayingSlice.reducer
