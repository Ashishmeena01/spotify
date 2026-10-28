import '@/App.css'
import AppRouter from '@/app/routes/AppRouter.jsx'
import { clearTrack, setPlaying } from '@/features/player/state/playerSlice'
import store from './store'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  store.dispatch({
    "type": "player/loadTrack/fulfilled",
    "payload":'dfsjfjlk'
  })

  return (
    <AppRouter />
  )
}

export default App
