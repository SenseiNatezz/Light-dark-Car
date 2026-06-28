import { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandStrip from './components/BrandStrip'
import Collection from './components/Collection'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import CarDetail from './components/CarDetail'
import CheckoutFlow from './components/CheckoutFlow'
import BookingFlow from './components/BookingFlow'
import Toast from './components/Toast'

export default function App() {
  const [detailCar, setDetailCar] = useState(null) // car shown in detail overlay
  const [buyCar, setBuyCar] = useState(null) // car in checkout flow
  const [booking, setBooking] = useState({ open: false, car: null })
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const notify = useCallback((message) => {
    setToast({ id: Date.now(), message })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 4000)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const scrollToCollection = () =>
    document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' })

  // Open booking from anywhere; optional specific car.
  const openBooking = (car = null) => {
    setDetailCar(null)
    setBooking({ open: true, car })
  }

  const openBuy = (car) => {
    setDetailCar(null)
    setBuyCar(car)
  }

  return (
    <>
      <Navbar onBook={() => openBooking()} />

      <main>
        <Hero onExplore={scrollToCollection} onView={setDetailCar} />
        <BrandStrip />
        <Collection onView={setDetailCar} />
        <Experience />
        <Testimonials />
      </main>

      <Footer onBook={() => openBooking()} />

      {/* Overlays */}
      <CarDetail
        car={detailCar}
        onClose={() => setDetailCar(null)}
        onBuy={openBuy}
        onBook={openBooking}
      />

      <CheckoutFlow
        car={buyCar}
        onClose={() => setBuyCar(null)}
        onComplete={(car) => notify(`${car.brand} ${car.name} reserved — we’ll be in touch shortly.`)}
      />

      <BookingFlow
        car={booking.car}
        open={booking.open}
        onClose={() => setBooking({ open: false, car: null })}
        onComplete={() => notify('Viewing confirmed — a confirmation email is on its way.')}
      />

      <Toast toast={toast} />
    </>
  )
}
