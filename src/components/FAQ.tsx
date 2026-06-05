'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'How do I book a session?',
    a: 'Simply WhatsApp us or use the Book Now button. We\'ll set up a consultation call to discuss your vision, preferences, and all the details to make your session perfect.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking 4–6 weeks ahead. For newborns, book during your pregnancy (around 28–32 weeks) as the best newborn sessions happen in the first 2 weeks after birth.',
  },
  {
    q: 'What should we wear to our session?',
    a: 'We\'ll send you a full style guide tailored to your session type. We also have a curated wardrobe — maternity gowns and kids outfits — available at no extra cost.',
  },
  {
    q: 'How long until we receive our photos?',
    a: 'You\'ll receive your beautifully edited gallery within 10–14 business days. Legacy Collection clients receive same-week delivery.',
  },
  {
    q: 'Do you travel for sessions?',
    a: 'Yes! We photograph across India. Travel fees apply for locations over 50km from our studio. Contact us to discuss your location.',
  },
  {
    q: 'Are newborn sessions safe?',
    a: 'Absolutely. We follow all industry safety guidelines and are trained and certified in safe newborn posing techniques. Your baby\'s safety is our number one priority.',
  },
  {
    q: 'Can siblings be included?',
    a: 'Of course! We love including siblings and the whole family. Sibling and family shots add such warmth to a session. Just let us know when booking.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes, we offer flexible payment plans to suit your budget. A booking deposit secures your date. Ask us for details when you reach out.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-2xl text-blush mb-3"
          >
            Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-warm-text"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i ? 'border-l-4 border-lavender' : ''
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-sans font-medium text-warm-text pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-blush text-xl flex-shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 font-sans text-sm text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
