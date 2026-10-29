import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTrendingTracks, searchTracks } from '@/features/home/api/homeApi.js'

export const getTracks = createAsyncThunk(
  'home/getTracks',
  async (query, { rejectWithValue, signal }) => {
    try {
      const normalizedQuery = typeof query === 'string' ? query.trim() : ''
      return normalizedQuery
        ? await searchTracks(normalizedQuery, { signal })
        : await getTrendingTracks({ signal })
    } catch (error) {
      if (signal.aborted) throw error
      return rejectWithValue(
        error.response?.data?.message || 'Could not load tracks right now. Please try again.',
      )
    }
  },
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    tracks: [],
    status: 'idle',
    error: null,
    currentRequestId: null,
  },
  reducers: {
    clearTracksError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTracks.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
        state.currentRequestId = action.meta.requestId
      })
      .addCase(getTracks.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        state.tracks = action.payload
        state.status = 'ready'
        state.currentRequestId = null
      })
      .addCase(getTracks.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        state.status = action.meta.aborted ? 'idle' : 'failed'
        state.error = action.meta.aborted
          ? null
          : action.payload || action.error.message || 'Could not load tracks right now.'
        state.currentRequestId = null
      })
  },
})

export const { clearTracksError } = homeSlice.actions
export default homeSlice.reducer
