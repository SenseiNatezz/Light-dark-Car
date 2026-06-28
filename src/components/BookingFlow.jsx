import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Calendar, Clock, MapPin, Loader2 } from 'lucide-react'

const TIMES = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30']

// Next 14 days, excluding Sundays.
function upcomingDays() {
  const out = []
  const d = new Date()
  while (out.length < 14) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0) out.push(new Date(d))
  }
  return out
}

export default function BookingFlow({ car, open, onClose, onComplete }) {
  const days = useMemo(upcomingDays, [])
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [phase, setPhase] = useState('form') // form | loading | done

  const visible = open || !!car

  useEffect(() => {
    if (visible) {
      setDate(null)
      setTime(null)
      setForm({ name: '', email: '' })
      setErrors({})
      setPhase('form')
    }
  }, [visible, car])

  useEffect(() => {
    if (!visible) return
    const onKey = (e) => e.key === 'Escape' && phase !== 'loading' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [visible, onClose, phase])

  const submit = () => {
    const e = {}
    if (!date) e.date = 'Select a day.'
    if (!time) e.time = 'Select a time.'
    if (form.name.trim().length < 2) e.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    setErrors(e)
    if (Object.keys(e).length) return

    setPhase('loading')
    setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, 1400)
  }

  if (!visible) return null

  const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Book a private viewing"
      >
        <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={() => phase !== 'loading' && onClose()} />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex max-h-[94dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-coal sm:rounded-3xl"
        >
          <div className="flex items-center justify-between border-b border-line/70 p-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-champagne">Private Viewing</p>
              <h3 className="font-display text-xl">{car ? car.name : 'Visit the Atelier'}</h3>
            </div>
            <button
              onClick={() => phase !== 'loading' && onClose()}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-bone transition-colors hover:bg-graphite"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {phase === 'done' ? (
              <div className="py-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15"
                >
                  <Check size={40} className="text-success" />
                </motion.div>
                <h4 className="mt-6 font-display text-3xl">You’re booked in</h4>
                <p className="mx-auto mt-3 max-w-sm text-silver">
                  We look forward to seeing you{form.name ? `, ${form.name.split(' ')[0]}` : ''} on{' '}
                  <span className="text-bone">{date && fmt(date)}</span> at{' '}
                  <span className="text-bone">{time}</span>. A confirmation is on its way to {form.email}.
                </p>
                <div className="mx-auto mt-6 flex w-full max-w-xs items-center gap-2 rounded-xl border border-line bg-charcoal/60 p-3.5 text-sm text-silver">
                  <MapPin size={16} className="shrink-0 text-champagne" />
                  Apex Atelier · 12 Berkeley Square, Mayfair, London
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Date */}
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-silver">
                    <Calendar size={16} className="text-champagne" /> Choose a day
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {days.map((d) => {
                      const on = date && d.toDateString() === date.toDateString()
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => {
                            setDate(d)
                            setErrors((e) => ({ ...e, date: undefined }))
                          }}
                          className={`flex min-w-[64px] shrink-0 flex-col items-center rounded-xl border px-3 py-2.5 transition-colors duration-200 ${
                            on ? 'border-champagne bg-champagne text-ink' : 'border-line text-bone hover:border-champagne/50'
                          }`}
                        >
                          <span className="text-[0.65rem] uppercase tracking-wider opacity-80">
                            {d.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="font-display text-lg leading-tight">{d.getDate()}</span>
                          <span className="text-[0.65rem] opacity-80">
                            {d.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  {errors.date && <span className="text-sm text-danger" role="alert">{errors.date}</span>}
                </div>

                {/* Time */}
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-silver">
                    <Clock size={16} className="text-champagne" /> Choose a time
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {TIMES.map((t) => {
                      const on = time === t
                      return (
                        <button
                          key={t}
                          onClick={() => {
                            setTime(t)
                            setErrors((e) => ({ ...e, time: undefined }))
                          }}
                          className={`rounded-xl border py-2.5 text-sm font-medium transition-colors duration-200 ${
                            on ? 'border-champagne bg-champagne text-ink' : 'border-line text-bone hover:border-champagne/50'
                          }`}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                  {errors.time && <span className="mt-1.5 block text-sm text-danger" role="alert">{errors.time}</span>}
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-silver">Full name</span>
                    <input
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, name: e.target.value }))
                        setErrors((x) => ({ ...x, name: undefined }))
                      }}
                      placeholder="Alexander Sterling"
                      className="apex-input"
                    />
                    {errors.name && <span className="mt-1.5 block text-sm text-danger" role="alert">{errors.name}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-silver">Email</span>
                    <input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, email: e.target.value }))
                        setErrors((x) => ({ ...x, email: undefined }))
                      }}
                      placeholder="you@domain.com"
                      className="apex-input"
                    />
                    {errors.email && <span className="mt-1.5 block text-sm text-danger" role="alert">{errors.email}</span>}
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line/70 p-5">
            {phase === 'done' ? (
              <button
                onClick={onClose}
                className="w-full rounded-full bg-champagne px-6 py-3 font-semibold text-ink transition-colors hover:bg-champagne-soft"
              >
                Done
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={phase === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3 font-semibold text-ink transition-all duration-300 hover:bg-champagne-soft disabled:opacity-70"
              >
                {phase === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Confirming…
                  </>
                ) : (
                  'Confirm viewing'
                )}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
