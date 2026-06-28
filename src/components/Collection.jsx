import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CarCard from './CarCard'
import { cars, filters } from '../data/cars'

export default function Collection({ onView }) {
  const [active, setActive] = useState('All')

  const visible = useMemo(
    () => (active === 'All' ? cars : cars.filter((c) => c.type === active)),
    [active],
  )

  return (
    <section id="collection" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">The Collection</span>
          <h2 className="mt-4 max-w-xl text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05]">
            Eight machines. <span className="text-gradient-gold italic">Zero compromise.</span>
          </h2>
          <p className="mt-4 max-w-md text-silver">
            Each car is hand-selected, independently inspected, and ready for immediate
            acquisition or a private viewing at our atelier.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter collection by category">
          {filters.map((f) => {
            const on = active === f
            return (
              <button
                key={f}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(f)}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  on
                    ? 'border-champagne text-ink'
                    : 'border-line text-silver hover:border-champagne/50 hover:text-bone'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-champagne"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {f}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div layout className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} onView={onView} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-ash">No vehicles in this category right now.</p>
      )}
    </section>
  )
}
