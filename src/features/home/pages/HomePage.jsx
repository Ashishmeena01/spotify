import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getTracks } from '@/features/home/state/homeSlice.js'
import { TrackGridSkeleton } from '@/components/Skeleton.jsx'

function HomePage() {
  console.log('HomePage rendered')
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { tracks, status, error } = useSelector((state) => state.home)
  const [query, setQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  useEffect(() => {
    const normalizedQuery = query.trim()
    let request
    const timer = window.setTimeout(() => {
      request = dispatch(getTracks(normalizedQuery))
    }, normalizedQuery ? 250 : 0)

    return () => {
      window.clearTimeout(timer)
      request?.abort()
    }
  }, [dispatch, query])

  return (
    <section className="home-section">
      <div className="home-section__heading">
        <p className="home-section__eyebrow">Discover something new</p>
        <h1>Trending on Audius</h1>
        <p>Pick a track to see more and start listening.</p>
        <label className="home-section__filter">
          <span>Search tracks</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search songs or artists"
          />
        </label>
      </div>

      {status === 'loading' && <TrackGridSkeleton />}
      {status === 'failed' && <p className="home-section__message" role="alert">{error}</p>}

      {status === 'ready' && (
        tracks.length === 0 ? (
          <p className="home-section__message">
            {query.trim() ? `No tracks found for “${query.trim()}”.` : 'No trending tracks are available right now.'}
          </p>
        ) : (
          <div className="track-grid">
            {tracks.map((track) => {
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
        )
      )}
    </section>
  )
}

export default HomePage
