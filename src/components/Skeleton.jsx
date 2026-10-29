import './skeleton.css'

function Skeleton({ className = '', width, height, circle = false }) {
  return (
    <span
      className={`skeleton${circle ? ' skeleton--circle' : ''}${className ? ` ${className}` : ''}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function TrackGridSkeleton({ count = 8 }) {
  return (
    <div className="track-grid" role="status" aria-label="Loading tracks">
      {Array.from({ length: count }, (_, index) => (
        <div className="track-card track-card--skeleton" key={index} aria-hidden="true">
          <Skeleton className="skeleton--artwork" />
          <Skeleton className="skeleton--title" height="14px" />
          <Skeleton className="skeleton--artist" height="12px" />
          <Skeleton className="skeleton--button" height="36px" />
        </div>
      ))}
      <span className="sr-only">Loading tracks...</span>
    </div>
  )
}

export function TrackPageSkeleton() {
  return (
    <section className="track-page" role="status" aria-label="Loading track">
      <div className="track-page__hero track-page__hero--skeleton" aria-hidden="true">
        <Skeleton className="track-page__artwork-skeleton" />
        <div className="track-page__text-skeleton">
          <Skeleton width="56px" height="12px" />
          <Skeleton width="min(360px, 65vw)" height="38px" />
          <Skeleton width="180px" height="16px" />
          <Skeleton width="150px" height="40px" />
        </div>
      </div>
      <div className="track-page__details" aria-hidden="true">
        <Skeleton width="180px" height="22px" />
        <Skeleton className="track-page__description-skeleton" height="14px" />
        <Skeleton className="track-page__description-skeleton" height="14px" />
      </div>
      <span className="sr-only">Loading track...</span>
    </section>
  )
}

export default Skeleton
