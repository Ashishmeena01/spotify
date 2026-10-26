import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getTrendingTracks } from '@/features/home/api/homeApi.js'

function HomePage() {
  const [tracks, setTracks] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

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

  return (
    <section className="home-section">
      <div className="home-section__heading">
        <p className="home-section__eyebrow">Discover something new</p>
        <h1>Trending on Audius</h1>
        <p>Pick a track to see more and start listening.</p>
      </div>

      {status === 'loading' && <p className="home-section__message">Loading tracks...</p>}
      {status === 'failed' && <p className="home-section__message" role="alert">{error}</p>}

      {status === 'ready' && (
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
      )}
    </section>
  )
}

export default HomePage
