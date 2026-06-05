'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { openWhatsApp, serviceMessage } from '@/utils/whatsapp'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#footer' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(href: string) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex flex-col items-start"
          >
            <span
              className={`font-script text-3xl leading-none transition-colors duration-300 ${
                scrolled ? 'text-warm-text' : 'text-white'
              }`}
            >
              Sandy
            </span>
            <span
              className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-muted' : 'text-white/70'
              }`}
            >
              Photography
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`font-sans text-sm font-medium tracking-wide transition-colors duration-300 hover:text-blush ${
                  scrolled ? 'text-warm-text' : 'text-white/90'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Book Now CTA */}
          <div className="hidden md:block">
            <MagneticButton
              onClick={() => openWhatsApp(serviceMessage('Photography'))}
              className="px-6 py-2.5 rounded-full font-sans text-sm font-medium bg-gradient-to-r from-blush to-lavender text-dark hover:shadow-lg hover:shadow-blush/30 transition-all duration-300"
            >
              Book Now
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 transition-colors duration-300 ${scrolled ? 'bg-warm-text' : 'bg-white'}`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-6 h-0.5 transition-colors duration-300 ${scrolled ? 'bg-warm-text' : 'bg-white'}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 transition-colors duration-300 ${scrolled ? 'bg-warm-text' : 'bg-white'}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                className="font-serif text-4xl text-warm-text hover:text-blush transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                openWhatsApp(serviceMessage('Photography'))
                setMenuOpen(false)
              }}
              className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-blush to-lavender text-dark font-sans font-medium"
            >
              Book Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
