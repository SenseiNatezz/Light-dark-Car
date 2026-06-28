import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Gauge, TrendingUp, Cog, Calendar, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import CarMedia from './CarMedia'
import { formatPrice } from '../data/cars'

const sheet = {
  hidden: { y: '100%' },
  show: { y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { y: '100%', transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

export default function CarDetail({ car, onClose, onBuy, onBook }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setIdx(0)
  }, [car])

  // Escape route + scroll lock (accessibility: escape-routes).
  useEffect(() => {
    if (!car) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [car, onClose])

  const specRows = car
    ? [
        { icon: Zap, label: 'Power', value: car.specs.power },
        { icon: Gauge, label: '0–60 mph', value: car.specs.zeroTo60 },
        { icon: TrendingUp, label: 'Top Speed', value: car.specs.topSpeed },
        { icon: Cog, label: 'Engine', value: car.specs.engine },
      ]
    : []

  const move = (dir) =>
    car && setIdx((i) => (i + dir + car.images.length) % car.images.length)

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${car.brand} ${car.name} details`}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            variants={sheet}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-line bg-coal sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-bone backdrop-blur-sm transition-colors hover:bg-graphite"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
              {/* Gallery */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden md:h-full md:aspect-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <CarMedia
                        car={car}
                        src={car.images[idx]}
                        loading="eager"
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/60 to-transparent md:bg-gradient-to-r" />

                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={() => move(-1)}
                        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-bone backdrop-blur-sm transition-colors hover:bg-ink"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => move(1)}
                        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-bone backdrop-blur-sm transition-colors hover:bg-ink"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {car.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIdx(i)}
                            aria-label={`View image ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === idx ? 'w-6 bg-champagne' : 'w-1.5 bg-bone/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-champagne">{car.brand}</span>
                  <span className="h-1 w-1 rounded-full bg-ash" />
                  <span className="text-xs uppercase tracking-wider text-ash">{car.type}</span>
                </div>
                <h2 className="mt-2 font-display text-4xl leading-tight">{car.name}</h2>
                <p className="mt-3 text-silver">{car.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {specRows.map((s) => (
                    <div key={s.label} className="rounded-xl border border-line bg-charcoal/60 p-3.5">
                      <s.icon size={16} className="text-champagne" />
                      <div className="mt-2 text-[0.7rem] uppercase tracking-wider text-ash">{s.label}</div>
                      <div className="font-display text-lg text-bone">{s.value}</div>
                    </div>
                  ))}
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {[
                    ['Drivetrain', car.drivetrain],
                    ['Transmission', car.transmission],
                    ['Mileage', car.mileage],
                    ['Exterior', car.color],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b border-line/60 pb-2">
                      <dt className="text-ash">{k}</dt>
                      <dd className="text-bone">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-center gap-2 text-sm text-silver">
                  <ShieldCheck size={16} className="text-success" />
                  Independently inspected · 142-point certification
                </div>

                {/* Price + CTAs */}
                <div className="mt-auto pt-7">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-ash">Asking price</div>
                      <div className="font-display text-3xl text-bone tabular-nums">{formatPrice(car.price)}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => onBuy(car)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3.5 font-semibold text-ink transition-all duration-300 hover:bg-champagne-soft hover:shadow-[0_0_34px_-8px_var(--color-champagne)]"
                    >
                      Reserve & Purchase
                    </button>
                    <button
                      onClick={() => onBook(car)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium text-bone transition-colors duration-300 hover:border-champagne/60 hover:bg-charcoal"
                    >
                      <Calendar size={17} className="text-champagne" />
                      Book a Viewing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
