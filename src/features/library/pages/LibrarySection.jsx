import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { toggleSavedTrack } from '@/features/library/state/librarySlice.js'

function LibrarySection() {
  const dispatch = useDispatch()
  const savedTracks = useSelector((state) => state.library.savedTracks)

  return (
    <section className="library-section" aria-label="Your library">
      <h2>Your Library</h2>
      {savedTracks.length === 0 ? (
        <p className="home-section__message">Save tracks to find them here.</p>
      ) : (
        <ul className="library-list">
          {savedTracks.map((track) => (
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
    </section>
  )
}

export default LibrarySection
