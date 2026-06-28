import { motion } from 'framer-motion'

// The marques we represent — a quiet, static wall of wordmarks
// (real brand logos intentionally avoided; wordmarks in the display serif).
const brands = [
  'Ferrari',
  'Lamborghini',
  'Porsche',
  'McLaren',
  'Aston Martin',
  'Bentley',
  'Bugatti',
  'Koenigsegg',
  'Pagani',
  'Rolls-Royce',
]

export default function BrandStrip() {
  return (
    <section className="border-b border-line/60 bg-coal/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-10 text-center"
        >
          An authorized house for the world&rsquo;s most coveted marques
        </motion.p>

        {/* Hairline-divided grid: gap-px over a line-colored backdrop
            renders crisp 1px separators between cells. */}
        <div className="overflow-hidden rounded-2xl border border-line/70 bg-line/60">
          <div className="grid grid-cols-2 gap-px lg:grid-cols-5">
            {brands.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (i % 5) * 0.06 }}
                className="group flex items-center justify-center bg-coal px-4 py-8 transition-colors duration-300 hover:bg-charcoal sm:py-10"
              >
                <span className="font-display text-lg tracking-wide text-silver transition-colors duration-300 group-hover:text-champagne sm:text-xl">
                  {b}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
