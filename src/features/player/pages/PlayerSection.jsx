import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlaying } from '@/features/player/state/playerSlice.js'

function PlayerIcon({ name }) {
  const paths = {
    play: <path d="m8 5 12 7-12 7z" fill="currentColor" />,
    pause: <path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor" />,
    previous: <path d="M6 5h2v14H6zm13 0v14L9 12z" fill="currentColor" />,
    next: <path d="M16 5h2v14h-2zM5 5v14l10-7z" fill="currentColor" />,
    volume: <><path d="M3 9v6h4l5 4V5L7 9z" fill="currentColor" /><path d="M16 9a5 5 0 0 1 0 6m2-9a9 9 0 0 1 0 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></>,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainingSeconds}`
}

function PlayerSection() {
  const dispatch = useDispatch()
  const audioRef = useRef(null)
  const { currentTrack, isPlaying, status, error } = useSelector((state) => state.player)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [playbackError, setPlaybackError] = useState('')

  useEffect(() => {
    setCurrentTime(0)
    setDuration(0)
    setPlaybackError('')

    const audio = audioRef.current
    if (!currentTrack || !audio) return

    audio.play().catch(() => {
      setPlaybackError('Press play to start this track.')
    })
  }, [currentTrack?.id, currentTrack?.streamUrl])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume, currentTrack?.id])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    if (audio.paused) {
      try {
        setPlaybackError('')
        await audio.play()
      } catch {
        setPlaybackError('Playback could not start. Try again.')
      }
    } else {
      audio.pause()
    }
  }

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value)
    setVolume(nextVolume)
    if (audioRef.current) audioRef.current.volume = nextVolume
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <footer className="player-bar" aria-label="Audio player">
      <div className="player-bar__track">
        {currentTrack?.artwork?.['150x150'] ? (
          <img src={currentTrack.artwork['150x150']} alt="" />
        ) : (
          <div className="player-bar__artwork-placeholder" aria-hidden="true" />
        )}
        <div className="player-bar__metadata">
          <strong title={currentTrack?.title}>{currentTrack?.title || 'Choose a track'}</strong>
          <span title={currentTrack?.user?.name}>{currentTrack?.user?.name || 'Your player is ready'}</span>
        </div>
      </div>

      <div className="player-bar__main">
        <div className="player-bar__buttons">
          <button className="player-bar__icon-button player-bar__subtle" type="button" disabled aria-label="Previous track">
            <PlayerIcon name="previous" />
          </button>
          <button
            className="player-bar__play-button"
            type="button"
            onClick={togglePlayback}
            disabled={!currentTrack || status === 'loading'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <PlayerIcon name={isPlaying ? 'pause' : 'play'} />
          </button>
          <button className="player-bar__icon-button player-bar__subtle" type="button" disabled aria-label="Next track">
            <PlayerIcon name="next" />
          </button>
        </div>

        <div className="player-bar__timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            aria-label="Seek"
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            style={{ '--player-progress': `${progress}%` }}
            disabled={!currentTrack || !duration}
            onChange={(event) => {
              const time = Number(event.target.value)
              setCurrentTime(time)
              if (audioRef.current) audioRef.current.currentTime = time
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
        {(status === 'loading' || error || playbackError) && (
          <span className="player-bar__status" role={error || playbackError ? 'alert' : 'status'}>
            {status === 'loading' ? 'Loading track...' : error || playbackError}
          </span>
        )}
      </div>

      <div className="player-bar__extras">
        <PlayerIcon name="volume" />
        <input
          aria-label="Volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          style={{ '--player-progress': `${volume * 100}%` }}
          onChange={handleVolumeChange}
        />
      </div>

      <audio
        ref={audioRef}
        key={currentTrack?.id || 'empty'}
        src={currentTrack?.streamUrl || undefined}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => dispatch(setPlaying(true))}
        onPause={() => dispatch(setPlaying(false))}
        onEnded={() => {
          dispatch(setPlaying(false))
          setCurrentTime(0)
        }}
        onError={() => {
          if (currentTrack) setPlaybackError('This track could not be played.')
        }}
      />
    </footer>
  )
}

export default PlayerSection
