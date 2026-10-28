import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import audiusApi from '@/config/audiusApi.js'

export const loadTrack = createAsyncThunk(
  'player/loadTrack',
  async (trackId, { rejectWithValue }) => {
    try {
      const { data } = await audiusApi.get(`/tracks/${encodeURIComponent(trackId)}`)
      const track = data.data
      return {
        ...track,
        streamUrl: audiusApi.getUri({
          url: `/tracks/${encodeURIComponent(trackId)}/stream`,
        }),
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Could not load this track.',
      )
    }
  },
)



const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: null,
    isPlaying: false,
    status: 'idle',
    error: null,
    currentRequestId: null,
  },
  reducers: {
    setPlaying(state, action) {
      state.isPlaying = action.payload
    },
    clearTrack(state) {
      state.currentTrack = null
      state.isPlaying = false
      state.status = 'idle'
      state.error = null
      state.currentRequestId = null
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTrack.pending, (state, action) => {
        state.currentRequestId = action.meta.requestId
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadTrack.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        state.currentTrack = action.payload
        state.isPlaying = false
        state.status = 'ready'
        state.currentRequestId = null
      })
      .addCase(loadTrack.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        state.status = 'failed'
        state.error = action.payload || 'Could not load this track.'
        state.currentRequestId = null
      })
  },
})

export const { setPlaying, clearTrack } = playerSlice.actions





export default playerSlice.reducer
