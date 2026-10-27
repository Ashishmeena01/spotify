import { Link, Outlet } from 'react-router'
import '@/features/auth/auth.css'

function AuthLayout() {
  return (
    <main className="auth-shell">
      <header className="auth-header">
        <Link className="auth-brand" to="/" aria-label="Spotify home">
          <svg className="auth-brand__mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="currentColor" />
            <path d="M7.2 12.1c5.6-1.7 12.7-.9 17.2 1.8M8.2 16.5c4.7-1.3 10.9-.6 14.7 1.7M9.2 20.5c3.8-1 8.6-.4 11.8 1.4" fill="none" stroke="#121212" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
          <span>Spotify</span>
        </Link>
      </header>
      <Outlet />
      <footer className="auth-footer">
        Spotify · Made for music fans
      </footer>
    </main>
  )
}

export default AuthLayout
