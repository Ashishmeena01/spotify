import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import { loadTrack } from '@/features/player/state/playerSlice.js'
import { toggleSavedTrack } from '@/features/library/state/librarySlice.js'
import { TrackPageSkeleton } from '@/components/Skeleton.jsx'

function TrackPage() {
  console.log('TrackPage rendered')
  const { trackId } = useParams()
  const dispatch = useDispatch()
  const { currentTrack, status, error } = useSelector((state) => state.player)
  const isSaved = useSelector((state) => state.library.savedTracks.some((item) => String(item.id) === trackId))
  const track = String(currentTrack?.id) === trackId ? currentTrack : null

  useEffect(() => {
    const request = dispatch(loadTrack(trackId))
    return () => request.abort()
  }, [dispatch, trackId])

  if (status === 'loading' && !track) {
    return <TrackPageSkeleton />
  }

  if (status === 'failed' && !track) {
    return (
      <section className="track-page">
        <p role="alert">{error || 'This track could not be loaded.'}</p>
        <Link to="/">Back to discovery</Link>
      </section>
    )
  }

  if (!track) return null

  const artwork = track.artwork?.['1000x1000'] || track.artwork?.['480x480']

  return (
    <section className="track-page" aria-labelledby="track-title">
      <div className="track-page__hero">
        {artwork ? (
          <img src={artwork} alt="" />
        ) : (
          <div className="track-page__artwork-placeholder" aria-hidden="true" />
        )}
        <div>
          <p>Track</p>
          <h1 id="track-title">{track.title}</h1>
          <p>{track.user?.name || 'Unknown artist'}</p>
          <button className="track-page__save" type="button" onClick={() => dispatch(toggleSavedTrack(track))}>
            {isSaved ? 'Remove from library' : 'Save to library'}
          </button>
        </div>
      </div>
      <div className="track-page__details">
        <h2>About this track</h2>
        {track.description ? <p>{track.description}</p> : <p>No description available.</p>}
        {track.genre && <span>{track.genre}</span>}
      </div>
    </section>
  )
}

export default TrackPage
