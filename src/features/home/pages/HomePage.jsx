import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { getTrendingTracks, searchTracks } from '@/features/home/api/homeApi.js'

function HomePage() {
  const [searchParams] = useSearchParams()
  const [tracks, setTracks] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [searchStatus, setSearchStatus] = useState('idle')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(null)
      setSearchStatus('idle')
      return undefined
    }

    const controller = new AbortController()
    setSearchResults(null)
    setSearchStatus('loading')
    const timer = window.setTimeout(() => {
      searchTracks(query.trim(), { signal: controller.signal })
        .then((items) => {
          setSearchResults(items)
          setSearchStatus('ready')
        })
        .catch((searchError) => {
          if (searchError.name === 'CanceledError') return
          setSearchStatus('failed')
        })
    }, 250)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  useEffect(() => {
    let isMounted = true

    getTrendingTracks()
      .then((items) => {
        if (!isMounted) return
        setTracks(items)
        setStatus('ready')
      })
      .catch(() => {
        if (!isMounted) return
        setError('We could not load tracks right now. Please try again.')
        setStatus('failed')
      })

    return () => {
      isMounted = false
    }
  }, [])

  const visibleTracks = searchResults ?? tracks

  return (
    <section className="home-section">
      <div className="home-section__heading">
        <p className="home-section__eyebrow">Discover something new</p>
        <h1>Trending on Audius</h1>
        <p>Pick a track to see more and start listening.</p>
        <label className="home-section__filter">
          <span>Search tracks</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search songs or artists" />
        </label>
      </div>

      {status === 'loading' && !query && <p className="home-section__message" role="status">Loading tracks...</p>}
      {status === 'failed' && <p className="home-section__message" role="alert">{error}</p>}
      {searchStatus === 'loading' && <p className="home-section__message" role="status">Searching tracks...</p>}
      {searchStatus === 'failed' && <p className="home-section__message" role="alert">Search is unavailable right now. Try again.</p>}

      {(searchResults || (status === 'ready' && !query)) && (
        visibleTracks.length === 0 ? <p className="home-section__message">No tracks found.</p> :
        <div className="track-grid">
          {visibleTracks.map((track) => {
            const artwork = track.artwork?.['480x480'] || track.artwork?.['150x150']
            const artist = track.user?.name || 'Unknown artist'

            return (
              <Link
                className="track-card"
                key={track.id}
                to={`/tracks/${track.id}`}
                aria-label={`Open ${track.title} by ${artist}`}
              >
                {artwork ? (
                  <img className="track-card__artwork" src={artwork} alt="" loading="lazy" />
                ) : (
                  <div className="track-card__artwork track-card__artwork--empty" aria-hidden="true" />
                )}
                <h2 title={track.title}>{track.title}</h2>
                <p title={artist}>{artist}</p>
                <span className="track-card__play">Open track</span>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default HomePage
