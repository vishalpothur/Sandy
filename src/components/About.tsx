'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { openWhatsApp } from '@/utils/whatsapp'

const milestones = [
  { year: '2014', event: 'Started Sandy Photography with a passion for capturing baby moments.' },
  { year: '2017', event: 'Certified in safe newborn posing techniques. Studio opened in Hyderabad.' },
  { year: '2020', event: 'Reached 5,000+ families milestone. Expanded to maternity & family portraits.' },
  { year: '2024', event: '10+ years. 10,000+ memories. Still falling in love with every session.' },
]

export default function About() {
  return (
    <section id="about" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=800&q=80"
                alt="Sandy - Photographer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Double border effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-blush/30 pointer-events-none" />
            </div>
            {/* Outer decorative border */}
            <div className="absolute -inset-3 rounded-3xl border border-lavender/20 pointer-events-none" />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-xl">
              <p className="font-serif text-2xl text-warm-text font-semibold">10+</p>
              <p className="font-sans text-xs text-muted">Years of Love</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-script text-2xl text-blush mb-4">Behind The Lens</p>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-text mb-6 leading-tight">
              Hi, I&apos;m Sandy!
              <br />
              <span className="text-gradient text-3xl md:text-4xl">
                Your Little Ones&apos; Favourite Photographer
              </span>
            </h2>

            <div className="space-y-4 font-sans text-muted leading-relaxed mb-8">
              <p>
                For over a decade, I&apos;ve had the incredible privilege of stepping into the most
                tender moments of families&apos; lives — the quiet awe of a new mother meeting her
                baby for the first time, a toddler&apos;s uncontrollable giggles, the way a family
                looks at each other when they think no one&apos;s watching.
              </p>
              <p>
                My approach is gentle, unhurried, and deeply personal. I believe the best
                photographs aren&apos;t staged — they&apos;re discovered. Every session is crafted
                around your family&apos;s unique story, personality, and the magic that makes you,
                you.
              </p>
              <p>
                Based in India, I photograph across the country — from intimate studio sessions to
                golden-hour outdoor portraits. I am certified in safe newborn posing and bring over
                10 years of experience to every frame.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative pl-8 mb-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-blush via-lavender to-sky" />
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="relative mb-5 last:mb-0"
                >
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-gradient-to-r from-blush to-lavender border-2 border-cream" />
                  <p className="font-sans text-xs text-muted mb-0.5">{m.year}</p>
                  <p className="font-sans text-sm text-warm-text">{m.event}</p>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => openWhatsApp("Hi Sandy! I'd like to receive your portfolio 🌸")}
              className="px-7 py-3 rounded-full glass border border-blush/40 font-sans text-sm text-warm-text hover:border-blush transition-all duration-300"
            >
              Download Portfolio ↗
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
