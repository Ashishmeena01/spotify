import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'spotify-library'

function readSavedTracks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function persist(tracks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks))
  } catch {
    // Keep the in-memory library available when browser storage is disabled.
  }
}

const librarySlice = createSlice({
  name: 'library',
  initialState: { savedTracks: readSavedTracks() },
  reducers: {
    toggleSavedTrack(state, action) {
      const track = action.payload
      const exists = state.savedTracks.some((item) => String(item.id) === String(track.id))
      state.savedTracks = exists
        ? state.savedTracks.filter((item) => String(item.id) !== String(track.id))
        : [track, ...state.savedTracks]
      persist(state.savedTracks)
    },
  },
})

export const { toggleSavedTrack } = librarySlice.actions
export default librarySlice.reducer
