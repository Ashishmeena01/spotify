import { Link } from 'react-router'

function NavbarSection() {
  return (
    <nav className="navbar-section" aria-label="Main navigation">
      <Link className="navbar-brand" to="/" aria-label="Spotify home">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="currentColor" />
          <path d="M7.2 12.1c5.6-1.7 12.7-.9 17.2 1.8M8.2 16.5c4.7-1.3 10.9-.6 14.7 1.7M9.2 20.5c3.8-1 8.6-.4 11.8 1.4" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
        <span>Spotify</span>
      </Link>

      <div className="navbar-start">
        <Link className="navbar-home" to="/" aria-label="Home">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m3.5 10.8 8.5-7 8.5 7v9.1a1.6 1.6 0 0 1-1.6 1.6h-4.2v-6.2H9.3v6.2H5.1a1.6 1.6 0 0 1-1.6-1.6z" fill="currentColor" />
          </svg>
        </Link>

        <form className="navbar-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <svg className="navbar-search__icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m16 16 4.3 4.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
          <input type="search" aria-label="Search" placeholder="What do you want to play?" />
          <span className="navbar-search__divider" aria-hidden="true" />
          <button type="button" className="navbar-search__browse" aria-label="Browse">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 4h14v16H5zM9 8h6M9 12h6M9 16h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </button>
        </form>
      </div>

      <div className="navbar-actions">
        <Link className="navbar-signup" to="/register">Sign up</Link>
        <Link className="navbar-login" to="/login">Log in</Link>
      </div>
    </nav>
  )
}

export default NavbarSection
