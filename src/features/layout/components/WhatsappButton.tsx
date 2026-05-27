'use client'

import { useSocketSettings } from '@/src/providers/SocketSettingsProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa'

export function WhatsappButton() {
  const { settings } = useSocketSettings()
  const phoneNumber = settings.whatsappNumber

  if (!phoneNumber) return null

  // Remove any non-numeric characters from the phone number for the link
  const cleanNumber = phoneNumber.replace(/\D/g, '')

  const handleBackToTop = () => {
    try {
      const selector = 'main, [data-first-section], section'
      const first = document.querySelector<HTMLElement>(selector)

      if (first) {
        first.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
        <button
          onClick={handleBackToTop}
          aria-label="Back to top"
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-(--ui-danger) bg-white text-(--ui-danger) shadow-md hover:bg-(--ui-danger) hover:text-white transition-colors"
        >
          <FaArrowUp />
        </button>

        <motion.a
          href={`https://wa.me/${cleanNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:bg-[#128C7E] active:scale-95"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="text-3xl" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
          </span>
        </motion.a>
      </div>
    </AnimatePresence>
  )
}
