'use client'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'
import { openWhatsApp, serviceMessage } from '@/utils/whatsapp'

const quickLinks = ['Home', 'Work', 'Services', 'About', 'Contact']
const services = [
  'Kids Photography',
  'Maternity Photography',
  'Newborn Photography',
  'Family Portraits',
]

export default function Footer() {
  function scrollTo(id: string) {
    const map: Record<string, string> = {
      Home: '#hero',
      Work: '#portfolio',
      Services: '#services',
      About: '#about',
      Contact: '#footer',
    }
    const el = document.querySelector(map[id] || `#${id.toLowerCase()}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="relative overflow-hidden bg-dark text-white/70">
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-script text-[20vw] text-white leading-none"
          style={{ opacity: 0.03 }}
        >
          SANDY
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-script text-4xl text-white mb-1">Sandy</p>
            <p className="font-sans text-xs tracking-widest text-white/40 uppercase mb-4">
              Photography
            </p>
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-xs">
              Capturing the magic of little ones — beautifully, gently, and forever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-white/40 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-white/40 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => openWhatsApp(serviceMessage(s))}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-white/40 mb-5">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-blush transition-all"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-blush transition-all"
              >
                <FaFacebookF size={16} />
              </a>
              <button
                onClick={() => openWhatsApp()}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-green-400 transition-all"
              >
                <FaWhatsapp size={16} />
              </button>
            </div>
            <p className="font-sans text-sm text-white/50 mb-1">📍 India</p>
            <p className="font-sans text-sm text-white/50">📧 sandy@sandyphotography.in</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Sandy Photography. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/30">Made with ❤️ in India</p>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <motion.button
        onClick={() => openWhatsApp(serviceMessage('Photography'))}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-xl hover:bg-green-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" />
        <FaWhatsapp size={26} className="text-white relative z-10" />
      </motion.button>
    </footer>
  )
}
