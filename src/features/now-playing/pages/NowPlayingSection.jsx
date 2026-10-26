import { useSelector } from 'react-redux'

function NowPlayingSection() {
  const currentTrack = useSelector((state) => state.player.currentTrack)

  if (!currentTrack) {
    return (
      <aside className="now-playing-section" aria-label="Now playing">
        <p>No song is playing</p>
      </aside>
    )
  }

  return (
    <aside className="now-playing-section" aria-label="Now playing">
      <h2>Now playing</h2>
      {currentTrack.artwork?.['480x480'] && (
        <img className="now-playing-section__artwork" src={currentTrack.artwork['480x480']} alt="" />
      )}
      <h3>{currentTrack.title}</h3>
      <p>{currentTrack.user?.name || 'Unknown artist'}</p>
    </aside>
  )
}

export default NowPlayingSection
