'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import MagneticButton from './MagneticButton'
import { openWhatsApp, serviceMessage } from '@/utils/whatsapp'

const headline = ['Every Tiny Moment.', 'Beautifully Preserved', 'Forever.']

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  function scrollToPortfolio() {
    const el = document.querySelector('#portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1920&q=90"
          alt="Beautiful maternity photography"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark/70 via-dark/40 to-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
      </div>

      {/* Mouse glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-75"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217,184,255,0.12), transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Script label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-script text-2xl md:text-3xl text-blush mb-6"
        >
          Welcome to Sandy Photography
        </motion.p>

        {/* Headline words */}
        <h1 className="font-serif text-[11vw] sm:text-[8vw] md:text-[7vw] leading-none text-white mb-6">
          {headline.map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4 + li * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-sans text-white/70 text-base md:text-lg max-w-xl mx-auto mb-10"
        >
          Award-winning kids, maternity &amp; family photography crafted to capture the moments
          that become your greatest treasures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <MagneticButton
            onClick={() => openWhatsApp(serviceMessage('Photography'))}
            className="px-8 py-4 rounded-full font-sans font-medium bg-gradient-to-r from-blush to-lavender text-dark text-base hover:shadow-xl hover:shadow-blush/30 transition-all duration-300"
          >
            Book a Session
          </MagneticButton>
          <MagneticButton
            onClick={scrollToPortfolio}
            className="px-8 py-4 rounded-full font-sans font-medium glass text-white text-base border border-white/30 hover:border-white/60 transition-all duration-300"
          >
            View Portfolio
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/50 font-sans text-xs tracking-widest"
        >
          <span>✦ 10,000+ Memories</span>
          <span>✦ 500+ Families</span>
          <span>✦ 4.9★ Rated</span>
          <span>✦ 10+ Years</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
