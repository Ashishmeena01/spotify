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
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTrack.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadTrack.fulfilled, (state, action) => {
        state.currentTrack = action.payload
        state.isPlaying = false
        state.status = 'ready'
      })
      .addCase(loadTrack.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Could not load this track.'
      })
  },
})

export const { setPlaying, clearTrack, add1Track } = playerSlice.actions
export default playerSlice.reducer
