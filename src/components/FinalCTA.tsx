'use client'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { openWhatsApp, serviceMessage } from '@/utils/whatsapp'

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-32 px-6 overflow-hidden animated-gradient">
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: '#E8C4C4', filter: 'blur(80px)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: '#D9B8FF', filter: 'blur(80px)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: '#BEE3F8', filter: 'blur(60px)' }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-3xl text-blush mb-4"
        >
          Let&apos;s Create Magic Together
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif text-4xl md:text-6xl text-warm-text mb-6 leading-tight"
        >
          Today&apos;s Tiny Moments Become
          <br />
          <span className="text-gradient">Tomorrow&apos;s Greatest Memories.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="font-sans text-muted text-lg max-w-xl mx-auto mb-12"
        >
          Every giggle, every milestone, every tender moment — beautifully preserved forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() => openWhatsApp(serviceMessage('Photography'))}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blush to-lavender text-dark font-sans font-medium text-base hover:shadow-2xl hover:shadow-blush/30 transition-all duration-300"
          >
            Book Your Session
          </MagneticButton>
          <MagneticButton
            onClick={() => { window.location.href = 'tel:+918099865977' }}
            className="px-10 py-4 rounded-full glass border border-warm-text/20 text-warm-text font-sans font-medium text-base hover:border-blush transition-all duration-300"
          >
            Call Us Now
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
