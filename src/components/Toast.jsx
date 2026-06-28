import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

// Accessible toast: aria-live, auto-dismiss handled by parent.
export default function Toast({ toast }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass pointer-events-auto flex items-center gap-3 rounded-full border border-champagne/30 px-5 py-3 shadow-2xl"
            role="status"
          >
            <CheckCircle2 size={18} className="text-success" />
            <span className="text-sm text-bone">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
