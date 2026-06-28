import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const quotes = [
  {
    text: 'The most seamless purchase of my life. The car arrived flawless, and the handover felt like a private event, not a transaction.',
    name: 'Jonathan H.',
    role: 'Collector · Monaco',
  },
  {
    text: 'I booked a viewing on a Thursday and drove home in my dream Porsche by Saturday. Apex anticipated every question before I asked it.',
    name: 'Priya N.',
    role: 'Entrepreneur · Dubai',
  },
  {
    text: 'They sourced a car I had been chasing for three years. Discreet, knowledgeable, and genuinely passionate. I won’t buy anywhere else.',
    name: 'Marcus T.',
    role: 'Private client · New York',
  },
]

export default function Testimonials() {
  return (
    <section id="clients" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">In Their Words</span>
        <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05]">
          Trusted by the <span className="text-gradient-gold italic">most discerning.</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className="flex flex-col rounded-2xl border border-line bg-charcoal p-7"
          >
            <div className="flex gap-1 text-champagne" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 font-display text-lg italic leading-relaxed text-bone">
              “{q.text}”
            </blockquote>
            <figcaption className="mt-6 border-t border-line/70 pt-4">
              <div className="font-medium text-bone">{q.name}</div>
              <div className="text-sm text-ash">{q.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
