import '@/App.css'
import AppRouter from '@/app/routes/AppRouter.jsx'
import { useState } from 'react'
import { FakeStorePage } from '@/app/fakeStorePage.jsx'


function App() {
  const [count, setCount] = useState(0)

  console.log('App rendered')
  return (
    <>
      <div className="text-white">{count}</div>
      <button className="text-white" onClick={() => setCount(count + 1)}>Increment</button>
      <button className="text-white" onClick={() => setCount(count - 1)}>Decrement</button>
      {/* <FakeStorePage/> */}
      <AppRouter/>
    </>
  )
}

export default App
