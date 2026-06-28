import { useState } from 'react'

// Image with an on-brand gradient + silhouette fallback so a failed
// network image never looks broken (performance/resilience: image-optimization).
export default function CarMedia({ car, src, alt, className = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)
  const source = src || car.images[0]

  if (failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, ${car.accent}22, transparent 60%), linear-gradient(160deg, #16161a, #0c0c0e)`,
        }}
        role="img"
        aria-label={alt || `${car.brand} ${car.name}`}
      >
        <svg viewBox="0 0 120 48" className="w-1/2 max-w-[220px] opacity-60" aria-hidden="true">
          <path
            d="M6 34 q4-14 22-16 l8-1 q10-9 26-9 q16 0 24 11 l14 2 q12 2 12 12 l-2 4 H14 q-8 0-8-4 Z"
            fill="none"
            stroke={car.accent}
            strokeWidth="1.4"
          />
          <circle cx="34" cy="38" r="6" fill="none" stroke={car.accent} strokeWidth="1.4" />
          <circle cx="92" cy="38" r="6" fill="none" stroke={car.accent} strokeWidth="1.4" />
        </svg>
        <span className="absolute bottom-3 right-4 font-display text-sm tracking-wide text-silver/70">
          {car.brand}
        </span>
      </div>
    )
  }

  return (
    <img
      src={source}
      alt={alt || `${car.year} ${car.brand} ${car.name}`}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
