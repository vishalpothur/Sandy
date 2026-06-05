'use client'
import { motion } from 'framer-motion'
import { openWhatsApp, serviceMessage } from '@/utils/whatsapp'

const steps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We chat about your vision, style, and what moments matter most. No pressure — just a warm conversation.',
  },
  {
    num: '02',
    title: 'Planning',
    desc: 'We handle everything: location, outfits, props, and timing — so you can focus on enjoying the experience.',
  },
  {
    num: '03',
    title: 'Session',
    desc: 'A relaxed, fun, completely guided photography experience. We bring out genuine smiles and real moments.',
  },
  {
    num: '04',
    title: 'Editing',
    desc: 'Your images are carefully edited to perfection with our signature style, typically within 2 weeks.',
  },
  {
    num: '05',
    title: 'Delivery',
    desc: 'A beautiful online gallery and premium prints delivered to your door. Your memories, forever preserved.',
  },
]

export default function Journey() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-2xl text-blush mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-warm-text"
          >
            Your <span className="text-gradient">Journey</span> With Us
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-5 gap-6 md:gap-4 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-blush via-lavender to-sky opacity-40" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass rounded-2xl p-6 text-center relative"
            >
              {/* Step number */}
              <div className="text-5xl font-serif font-semibold text-gradient mb-4 leading-none">
                {step.num}
              </div>
              <h3 className="font-serif text-xl text-warm-text mb-2">{step.title}</h3>
              <p className="font-sans text-sm text-muted leading-relaxed mb-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => openWhatsApp(serviceMessage('Photography Session'))}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blush to-lavender text-dark font-sans font-medium hover:shadow-xl hover:shadow-blush/30 transition-all duration-300"
          >
            Start Your Journey →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
