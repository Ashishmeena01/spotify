import '@/App.css'
import AppRouter from '@/app/routes/AppRouter.jsx'
import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)

  console.log('App rendered')
  return (
    <>
      <div className="text-white">{count}</div>
      <button className="text-white" onClick={() => setCount(count + 1)}>Increment</button>
      <button className="text-white" onClick={() => setCount(count - 1)}>Decrement</button>
      <AppRouter/>
    </>
  )
}

export default App
