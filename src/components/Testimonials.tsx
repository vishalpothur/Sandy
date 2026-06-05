'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Mother of two',
    quote: 'Sandy captured our newborn\'s first days so beautifully. We cry happy tears every time we look at these photos. Truly magical work that we\'ll treasure forever.',
    stars: 5,
  },
  {
    name: 'Ananya & Rohan Mehta',
    role: 'First-time parents',
    quote: 'Our maternity shoot was an experience in itself — Sandy made me feel radiant and comfortable throughout. The images look like they belong in a magazine.',
    stars: 5,
  },
  {
    name: 'Deepa Krishnan',
    role: 'Mom of 3-year-old Aarav',
    quote: 'Aarav\'s cake smash session was the most fun we\'ve ever had! Sandy has this incredible ability to bring out genuine joy in kids. Every shot is pure gold.',
    stars: 5,
  },
  {
    name: 'Sunita & Vikram Patel',
    role: 'Family of four',
    quote: 'Our family portraits are breathtaking. Sandy captured the essence of our family — the love, the laughter, the little moments in between. Worth every rupee.',
    stars: 5,
  },
  {
    name: 'Meera Nair',
    role: 'Mom of baby Ishaan',
    quote: 'I was nervous about a newborn session but Sandy was so gentle and patient. Ishaan slept through everything! The photos are absolutely dreamy.',
    stars: 5,
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [paused])

  const t = testimonials[index]

  return (
    <section className="relative z-10 py-24 px-6 bg-cream-warm/40">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-2xl text-blush mb-3"
        >
          Client Love
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-warm-text mb-12"
        >
          What Families <span className="text-gradient">Say</span>
        </motion.h2>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 md:p-12 shadow-xl"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-2xl" style={{ color: '#D9B8FF' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-xl md:text-2xl text-warm-text italic leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <p className="font-sans font-medium text-warm-text">{t.name}</p>
                <p className="font-sans text-sm text-muted">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-warm-text transition-colors text-xl"
            >
              ‹
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 h-2.5 bg-blush' : 'w-2.5 h-2.5 bg-muted/30'
                }`}
              />
            ))}
            <button
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-warm-text transition-colors text-xl"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
