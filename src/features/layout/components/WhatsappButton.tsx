'use client'

import { useSocketSettings } from '@/src/providers/SocketSettingsProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

export function WhatsappButton() {
  const { settings } = useSocketSettings()
  const phoneNumber = settings.whatsappNumber

  if (!phoneNumber) return null

  // Remove any non-numeric characters from the phone number for the link
  const cleanNumber = phoneNumber.replace(/\D/g, '')

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
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
