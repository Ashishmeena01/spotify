import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { toggleSavedTrack } from '@/features/library/state/librarySlice.js'

function LibrarySection() {
  const dispatch = useDispatch()
  const savedTracks = useSelector((state) => state.library.savedTracks)
  const [query, setQuery] = useState('')
  const visibleTracks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return savedTracks
    return savedTracks.filter((track) =>
      `${track.title || ''} ${track.user?.name || ''}`.toLocaleLowerCase().includes(normalizedQuery),
    )
  }, [query, savedTracks])

  return (
    <section className="library-section" aria-label="Your library">
      <h2>Your Library</h2>
      <p className="library-section__count" aria-live="polite">{savedTracks.length} {savedTracks.length === 1 ? 'saved track' : 'saved tracks'}</p>
      {savedTracks.length === 0 ? (
        <div className="library-empty">
          <span aria-hidden="true">♫</span>
          <strong>Your collection starts here</strong>
          <p>Save tracks you love and they’ll show up here.</p>
        </div>
      ) : (
        <>
          <label className="library-section__search">
            <span className="sr-only">Filter saved tracks</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find in your library" />
          </label>
          {visibleTracks.length === 0 ? <p className="home-section__message">No saved tracks match “{query}”.</p> : (
            <ul className="library-list">
              {visibleTracks.map((track) => (
                <li key={track.id} className="library-list__item">
                  <Link to={`/tracks/${track.id}`}>
                    <strong>{track.title}</strong>
                    <span>{track.user?.name || 'Unknown artist'}</span>
                  </Link>
                  <button type="button" aria-label={`Remove ${track.title} from your library`} onClick={() => dispatch(toggleSavedTrack(track))}>×</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

export default LibrarySection
