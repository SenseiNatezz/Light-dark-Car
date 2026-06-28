import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { useTheme } from '../theme'

export default function Footer({ onBook }) {
  const { theme } = useTheme()
  const accentImg = theme === 'dark' ? '/media/hero-car-faint.png' : '/media/hero-car-light.png'
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line/60 bg-coal/40">
      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grain relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-charcoal to-ink p-8 sm:p-14"
        >
          {/* Faint AI-generated luxury car, bleeding in from the right edge */}
          <img
            src={accentImg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 bottom-0 hidden h-full w-2/3 object-cover object-left opacity-25 [mask-image:linear-gradient(to_left,black,transparent)] sm:block"
          />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--color-champagne), transparent 70%)' }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.05]">
                Your next car is <span className="text-gradient-gold italic">waiting.</span>
              </h2>
              <p className="mt-4 text-silver">
                Reserve online or book a private viewing at the atelier. Either way, the experience
                is entirely yours.
              </p>
            </div>
            <button
              onClick={onBook}
              className="group flex shrink-0 items-center gap-3 rounded-full bg-champagne px-8 py-4 font-semibold text-ink transition-all duration-300 hover:bg-champagne-soft hover:shadow-[0_0_40px_-8px_var(--color-champagne)]"
            >
              Book a Viewing
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer columns */}
      <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
        <div className="grid gap-10 border-t border-line/60 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="Apex Motors home">
              <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
                <path d="M16 4 L28 28 H22.5 L16 14 L9.5 28 H4 Z" fill="var(--color-champagne)" />
              </svg>
              <span className="font-display text-xl tracking-wide">
                Apex<span className="text-champagne">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
              The art of the extraordinary. A privately curated collection of the world’s finest
              automobiles since 1998.
            </p>
          </div>

          <FooterCol
            title="Explore"
            links={[
              ['Collection', '#collection'],
              ['The Apex Standard', '#experience'],
              ['Client stories', '#clients'],
            ]}
          />

          <div>
            <h4 className="font-display text-lg">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-silver">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-champagne" />
                <a href="tel:+18005552739" className="hover:text-bone">+1 800 555 APEX</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-champagne" />
                <a href="mailto:concierge@apexmotors.com" className="hover:text-bone">concierge@apexmotors.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-champagne" />
                <span>12 Berkeley Square<br />Mayfair, London</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg">Atelier hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-silver">
              <li className="flex justify-between"><span className="text-ash">Mon – Fri</span> 9:00 – 19:00</li>
              <li className="flex justify-between"><span className="text-ash">Saturday</span> 10:00 – 17:00</li>
              <li className="flex justify-between"><span className="text-ash">Sunday</span> By appointment</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-7 text-sm text-ash sm:flex-row">
          <span>© {new Date().getFullYear()} Apex Motors. All rights reserved.</span>
          <span>A demonstration experience · No real transactions are processed.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div>
      <h4 className="font-display text-lg">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} onClick={(e) => go(e, href)} className="text-silver transition-colors hover:text-bone">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
