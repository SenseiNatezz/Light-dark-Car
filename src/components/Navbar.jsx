import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'
import { useTheme } from '../theme'

function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line text-bone transition-colors hover:border-champagne/60 hover:text-champagne ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

const links = [
  { label: 'Collection', href: '#collection' },
  { label: 'Experience', href: '#experience' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'glass border-b border-line/70' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2.5"
            aria-label="Apex Motors home"
          >
            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
              <path d="M16 4 L28 28 H22.5 L16 14 L9.5 28 H4 Z" fill="var(--color-champagne)" />
            </svg>
            <span className="font-display text-xl tracking-wide">
              Apex<span className="text-champagne">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="group relative text-sm font-medium text-silver transition-colors hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+18005552739"
              className="hidden items-center gap-2 text-sm text-silver transition-colors hover:text-bone lg:flex"
            >
              <Phone size={15} className="text-champagne" />
              +1 800 555 APEX
            </a>
            <ThemeToggle />
            <button
              onClick={onBook}
              className="hidden rounded-full bg-champagne px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-champagne-soft hover:shadow-[0_0_30px_-6px_var(--color-champagne)] sm:block"
            >
              Book a Viewing
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-bone md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col bg-coal p-6"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-xl">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.button
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    onClick={() => go(l.href)}
                    className="border-b border-line/60 py-4 text-left font-display text-2xl text-bone"
                  >
                    {l.label}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-3">
                <button
                  onClick={() => {
                    setOpen(false)
                    onBook()
                  }}
                  className="flex-1 rounded-full bg-champagne py-3.5 text-center font-semibold text-ink"
                >
                  Book a Viewing
                </button>
                <ThemeToggle className="h-12 w-12 shrink-0" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
