import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Gauge, Zap, ArrowUpRight } from 'lucide-react'
import CarMedia from './CarMedia'
import { formatPrice } from '../data/cars'

const CarCard = forwardRef(function CarCard({ car, index, onView }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      onClick={() => onView(car)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-charcoal transition-colors duration-500 hover:border-champagne/40"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <CarMedia
          car={car}
          alt={`${car.year} ${car.brand} ${car.name}`}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent opacity-90" />

        {car.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-champagne/40 bg-ink/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-champagne backdrop-blur-sm">
            {car.badge}
          </span>
        )}

        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs text-silver backdrop-blur-sm">
          {car.year}
        </span>

        {/* reveal action chip on hover */}
        <div className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-champagne text-ink opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-champagne">{car.brand}</p>
            <h3 className="mt-1 font-display text-2xl leading-tight">{car.name}</h3>
          </div>
          <span className="rounded-md bg-graphite px-2.5 py-1 text-xs text-silver">{car.type}</span>
        </div>

        <p className="mt-3 line-clamp-1 text-sm text-ash">{car.tagline}</p>

        <div className="mt-5 flex items-center gap-5 border-t border-line/70 pt-4 text-sm text-silver">
          <span className="flex items-center gap-1.5">
            <Zap size={15} className="text-champagne" /> {car.specs.power}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge size={15} className="text-champagne" /> {car.specs.zeroTo60}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-xl text-bone tabular-nums">{formatPrice(car.price)}</span>
          <span className="text-sm font-medium text-champagne transition-colors group-hover:text-champagne-soft">
            View details
          </span>
        </div>
      </div>
    </motion.article>
  )
})

export default CarCard
