import React from 'react'
import { Link } from 'react-router'

function Error() {
  console.log('NotFound page rendered')
  return (
    <main className="text-center text-white">
      <h1>Page not found</h1>
      <p>That page doesn’t exist.</p>
      <Link to="/">Go to home</Link>
    </main>
  )
}

export default Error
