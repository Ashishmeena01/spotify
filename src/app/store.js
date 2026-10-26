import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/state/authSlice.js'
import homeReducer from '@/features/home/state/homeSlice.js'
import playerReducer from '@/features/player/state/playerSlice.js'
import libraryReducer from '@/features/library/state/librarySlice.js'
import navbarReducer from '@/features/navbar/state/navbarSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    player: playerReducer,
    library: libraryReducer,
    navbar: navbarReducer,
  },
})

export default store
