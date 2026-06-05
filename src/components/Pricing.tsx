'use client'
import { motion } from 'framer-motion'
import { openWhatsApp, serviceMessage } from '@/utils/whatsapp'

const packages = [
  {
    name: 'Precious Memories',
    price: '₹9,000',
    desc: 'Perfect for a single milestone session',
    features: [
      '1 session type',
      '1 hour session',
      '15 edited images',
      'Online gallery',
      'Digital downloads',
    ],
    popular: false,
    color: 'blush',
  },
  {
    name: 'Storybook',
    price: '₹15,000',
    desc: 'Our most loved package — the complete story',
    features: [
      '2 session types',
      '2 hour session',
      '30 edited images',
      'Prints included',
      'Online gallery',
      'Rush editing available',
    ],
    popular: true,
    color: 'lavender',
  },
  {
    name: 'Legacy Collection',
    price: '₹25,000',
    desc: 'The ultimate heirloom experience',
    features: [
      'All session types',
      '4 hour session',
      '60 edited images',
      'Premium album',
      'Same-week delivery',
      'Fine art prints',
      'VIP priority booking',
    ],
    popular: false,
    color: 'sky',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 py-24 px-6 animated-gradient">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-2xl text-blush mb-3"
          >
            Investment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-warm-text"
          >
            Choose Your <span className="text-gradient">Package</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className={`relative glass rounded-3xl p-8 transition-shadow duration-300 ${
                pkg.popular ? 'shadow-xl shadow-lavender/20 ring-2 ring-lavender/40' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-lavender to-blush text-dark text-xs font-sans font-medium">
                  Most Popular
                </div>
              )}

              <h3 className="font-serif text-2xl text-warm-text mb-1">{pkg.name}</h3>
              <p className="font-sans text-sm text-muted mb-4">{pkg.desc}</p>
              <p className="font-serif text-4xl text-warm-text font-semibold mb-6">{pkg.price}</p>

              <ul className="space-y-2.5 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sans text-sm text-warm-text">
                    <span className="text-blush">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openWhatsApp(serviceMessage(pkg.name))}
                className={`w-full py-3 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-blush to-lavender text-dark hover:shadow-lg hover:shadow-blush/30'
                    : 'glass border border-blush/30 text-warm-text hover:border-blush'
                }`}
              >
                Book {pkg.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Full pricing guide */}
        <div className="text-center">
          <button
            onClick={() => openWhatsApp("Hi Sandy! Could you send me the full pricing guide? 🌸")}
            className="px-8 py-3 rounded-full glass border border-blush/30 font-sans text-sm text-warm-text hover:border-blush transition-all duration-300"
          >
            Get Full Pricing Guide ↗
          </button>
        </div>
      </div>
    </section>
  )
}
