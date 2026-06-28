import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, CreditCard, Truck, Landmark, Loader2, ShieldCheck } from 'lucide-react'
import CarMedia from './CarMedia'
import { formatPrice } from '../data/cars'

const STEPS = ['Details', 'Delivery', 'Payment', 'Done']

const empty = {
  name: '',
  email: '',
  phone: '',
  delivery: 'atelier',
  payment: 'finance',
}

export default function CheckoutFlow({ car, onClose, onComplete }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (car) {
      setStep(0)
      setForm(empty)
      setErrors({})
      setProcessing(false)
    }
  }, [car])

  useEffect(() => {
    if (!car) return
    const onKey = (e) => e.key === 'Escape' && !processing && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [car, onClose, processing])

  const deposit = useMemo(() => (car ? Math.round(car.price * 0.1) : 0), [car])

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validateDetails = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a contactable phone number.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 0 && !validateDetails()) return
    if (step === 2) {
      // Simulate payment processing (front-end demo only).
      setProcessing(true)
      setTimeout(() => {
        setProcessing(false)
        setStep(3)
        onComplete?.(car)
      }, 1700)
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

  if (!car) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`Purchase ${car.name}`}
      >
        <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={() => !processing && onClose()} />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex max-h-[94dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-coal sm:rounded-3xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-line/70 p-5">
            <div className="h-14 w-20 overflow-hidden rounded-lg">
              <CarMedia car={car} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wider text-champagne">{car.brand}</p>
              <h3 className="truncate font-display text-xl">{car.name}</h3>
            </div>
            <button
              onClick={() => !processing && onClose()}
              disabled={processing}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-bone transition-colors hover:bg-graphite disabled:opacity-40"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Progress */}
          {step < 3 && (
            <div className="flex gap-2 px-5 pt-5">
              {STEPS.slice(0, 3).map((label, i) => (
                <div key={label} className="flex-1">
                  <div
                    className={`h-1 rounded-full transition-colors duration-500 ${
                      i <= step ? 'bg-champagne' : 'bg-graphite'
                    }`}
                  />
                  <span className={`mt-2 block text-[0.65rem] uppercase tracking-wider ${i <= step ? 'text-silver' : 'text-ash'}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <h4 className="font-display text-2xl">Your details</h4>
                    <Field label="Full name" error={errors.name}>
                      <input
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="Alexander Sterling"
                        className="apex-input"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="you@domain.com"
                        className="apex-input"
                      />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder="+1 (___) ___-____"
                        className="apex-input"
                      />
                    </Field>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-display text-2xl">Delivery</h4>
                    <Choice
                      active={form.delivery === 'atelier'}
                      onClick={() => set('delivery', 'atelier')}
                      icon={Landmark}
                      title="Collect at the atelier"
                      sub="Private handover · Mayfair, London · Complimentary"
                    />
                    <Choice
                      active={form.delivery === 'enclosed'}
                      onClick={() => set('delivery', 'enclosed')}
                      icon={Truck}
                      title="Enclosed delivery"
                      sub="White-glove transport to your address · From $3,500"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h4 className="font-display text-2xl">Secure your reservation</h4>
                    <Choice
                      active={form.payment === 'finance'}
                      onClick={() => set('payment', 'finance')}
                      icon={Landmark}
                      title="Bespoke finance"
                      sub="Tailored terms arranged by our private office"
                    />
                    <Choice
                      active={form.payment === 'card'}
                      onClick={() => set('payment', 'card')}
                      icon={CreditCard}
                      title="Refundable deposit"
                      sub={`${formatPrice(deposit)} to reserve · 100% refundable for 72h`}
                    />
                    <div className="flex items-start gap-2 rounded-xl border border-line bg-charcoal/60 p-3.5 text-xs text-silver">
                      <ShieldCheck size={16} className="mt-0.5 shrink-0 text-success" />
                      This is a demonstration checkout. No payment is taken and no card details
                      are collected.
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="py-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15"
                    >
                      <Check size={40} className="text-success" />
                    </motion.div>
                    <h4 className="mt-6 font-display text-3xl">Reservation confirmed</h4>
                    <p className="mx-auto mt-3 max-w-sm text-silver">
                      Your {car.brand} {car.name} is reserved, {form.name.split(' ')[0] || 'and ready'}.
                      A private client manager will contact you at {form.email} within the hour.
                    </p>
                    <div className="mx-auto mt-6 w-full max-w-xs rounded-xl border border-line bg-charcoal/60 p-4 text-left text-sm">
                      <Row k="Vehicle" v={`${car.brand} ${car.name}`} />
                      <Row k="Reference" v={`APX-${car.id.slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`} />
                      <Row k="Handover" v={form.delivery === 'atelier' ? 'Atelier collection' : 'Enclosed delivery'} />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer actions */}
          {step < 3 ? (
            <div className="flex items-center gap-3 border-t border-line/70 p-5">
              {step > 0 && (
                <button
                  onClick={back}
                  disabled={processing}
                  className="rounded-full border border-line px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-graphite disabled:opacity-40"
                >
                  Back
                </button>
              )}
              <button
                onClick={next}
                disabled={processing}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3 font-semibold text-ink transition-all duration-300 hover:bg-champagne-soft disabled:opacity-70"
              >
                {processing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Processing…
                  </>
                ) : step === 2 ? (
                  'Confirm reservation'
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          ) : (
            <div className="border-t border-line/70 p-5">
              <button
                onClick={onClose}
                className="w-full rounded-full bg-champagne px-6 py-3 font-semibold text-ink transition-colors hover:bg-champagne-soft"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>

      <style>{`
        .apex-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-line);
          background: var(--color-charcoal);
          padding: 0.8rem 1rem;
          color: var(--color-bone);
          font-size: 1rem;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .apex-input::placeholder { color: var(--color-ash); }
        .apex-input:focus {
          outline: none;
          border-color: var(--color-champagne);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-champagne) 22%, transparent);
        }
      `}</style>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-silver">{label}</span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-danger" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}

function Choice({ active, onClick, icon: Icon, title, sub }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors duration-300 ${
        active ? 'border-champagne bg-champagne/10' : 'border-line hover:border-champagne/40'
      }`}
    >
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${active ? 'bg-champagne text-ink' : 'bg-graphite text-champagne'}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="font-medium text-bone">{title}</div>
        <div className="text-sm text-ash">{sub}</div>
      </div>
      <div className={`grid h-5 w-5 place-items-center rounded-full border ${active ? 'border-champagne bg-champagne' : 'border-line'}`}>
        {active && <Check size={13} className="text-ink" />}
      </div>
    </button>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between border-b border-line/60 py-1.5 last:border-0">
      <span className="text-ash">{k}</span>
      <span className="text-bone">{v}</span>
    </div>
  )
}
