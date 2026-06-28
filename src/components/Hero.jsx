import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, ChevronRight } from 'lucide-react'
import { cars } from '../data/cars'
import { useTheme } from '../theme'

const featured = cars[0] // Aventador SVJ

// AI-generated (Higgsfield) cinematic assets, served from /public/media.
// Light theme gets the bright airy clip; dark theme the night drive-in.
const HERO_MEDIA = {
  light: { video: '/media/hero-car-light-drivein.mp4', poster: '/media/hero-car-light.png' },
  dark: { video: '/media/hero-car-drivein.mp4', poster: '/media/hero-car-faint.png' },
}

const word = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.09 },
  }),
}

export default function Hero({ onExplore, onView }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { theme } = useTheme()
  const media = HERO_MEDIA[theme] || HERO_MEDIA.light
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const headline = ['The', 'Art', 'of', 'the', 'Extraordinary']

  return (
    <section id="top" ref={ref} className="grain relative min-h-dvh overflow-hidden">
      {/* Cinematic backdrop — looping drive-in video, with the faint car image
          as poster + reduced-motion fallback (perf + accessibility). */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        {reduce ? (
          <img
            src={media.poster}
            alt={`${featured.brand} ${featured.name}`}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <video
            key={theme}
            className="h-full w-full object-cover object-center"
            src={media.video}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex min-h-dvh max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow mb-6 block"
        >
          Exotic & Luxury · Established 1998
        </motion.span>

        <h1 className="max-w-4xl text-[clamp(2.8rem,9vw,7rem)] font-medium leading-[0.95] tracking-tight">
          {headline.map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i}
                variants={word}
                initial="hidden"
                animate="show"
                className={`inline-block ${w === 'Extraordinary' ? 'text-gradient-gold italic' : ''}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-silver"
        >
          A privately curated collection of the world’s most coveted automobiles —
          acquired, authenticated, and delivered with absolute discretion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <button
            onClick={onExplore}
            className="group flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-4 font-semibold text-ink transition-all duration-300 hover:bg-champagne-soft hover:shadow-[0_0_40px_-8px_var(--color-champagne)]"
          >
            Explore the Collection
            <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onView(featured)}
            className="rounded-full border border-line bg-coal/40 px-7 py-4 font-medium text-bone backdrop-blur-sm transition-colors duration-300 hover:border-champagne/60 hover:bg-coal"
          >
            View Featured · {featured.name}
          </button>
        </motion.div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-line/60 pt-7"
        >
          {[
            ['1,400+', 'Cars delivered'],
            ['38', 'Countries served'],
            ['100%', 'Authenticated'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-2xl text-bone sm:text-3xl">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ash">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={onExplore}
        style={{ opacity: fade }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ash md:flex"
        aria-label="Scroll to collection"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={16} className="text-champagne" />
      </motion.button>
    </section>
  )
}
