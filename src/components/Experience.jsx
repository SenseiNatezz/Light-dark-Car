import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Sparkles, KeyRound } from 'lucide-react'

const items = [
  {
    icon: ShieldCheck,
    title: 'Forensic authentication',
    body: 'Every vehicle passes a 142-point inspection and full provenance check before it earns a place in the collection.',
  },
  {
    icon: KeyRound,
    title: 'Discreet acquisition',
    body: 'Private transactions handled end-to-end by a dedicated client manager — paperwork, escrow, and registration included.',
  },
  {
    icon: Truck,
    title: 'White-glove delivery',
    body: 'Enclosed, climate-controlled transport to any address on earth, or a private handover at our Mayfair atelier.',
  },
  {
    icon: Sparkles,
    title: 'Lifetime concierge',
    body: 'Servicing, storage, and your next acquisition — your relationship with Apex continues long after the keys change hands.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 border-y border-line/60 bg-coal/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">The Apex Standard</span>
            <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05]">
              Beyond the sale, <br />
              <span className="text-gradient-gold italic">an enduring relationship.</span>
            </h2>
            <p className="mt-6 max-w-md text-silver">
              For over twenty-five years we have served collectors, enthusiasts, and the simply
              discerning. Buying with Apex is effortless by design — every detail anticipated,
              every assurance in writing.
            </p>
            <div className="mt-8 flex gap-8">
              {[
                ['25+', 'Years of trust'],
                ['$2.4B', 'Cars placed'],
                ['4.9/5', 'Client rating'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-bone">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-ash">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="group rounded-2xl border border-line bg-charcoal p-6 transition-colors duration-400 hover:border-champagne/40"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-graphite text-champagne transition-colors duration-400 group-hover:bg-champagne group-hover:text-ink">
                  <it.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{it.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
