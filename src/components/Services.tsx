'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { openWhatsApp, serviceMessage } from '@/utils/whatsapp'

const services = [
  {
    title: 'Maternity Photography',
    desc: 'Elegant portraits celebrating the beauty of pregnancy. A timeless keepsake of this magical chapter.',
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80',
    color: 'lavender',
  },
  {
    title: 'Newborn Photography',
    desc: 'Gentle, safe newborn sessions capturing those fleeting first days with tenderness and artistry.',
    image: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80',
    color: 'blush',
  },
  {
    title: 'Baby Milestones',
    desc: 'First smile, first crawl, first steps — every milestone beautifully preserved as your baby grows.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
    color: 'peach',
  },
  {
    title: 'Kids Photography',
    desc: 'Playful, candid sessions that capture the pure joy, curiosity, and spirit of your little ones.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    color: 'sky',
  },
  {
    title: 'Family Portraits',
    desc: 'Warm, authentic family portraits that celebrate love and connection across generations.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    color: 'lavender',
  },
  {
    title: 'Cake Smash Sessions',
    desc: 'The most delicious milestone! First birthday cake smash sessions full of joy, mess, and magic.',
    image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80',
    color: 'blush',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-script text-2xl text-blush mb-3"
          >
            What We Create
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-warm-text"
          >
            Signature Photography
            <br />
            <span className="text-gradient">Experiences</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: '4/5' }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Content */}
              <div className="absolute bottom-0 p-6 w-full">
                <h3 className="font-serif text-white text-2xl mb-2">{service.title}</h3>

                {/* Hover reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={hovered === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{service.desc}</p>
                  <button
                    onClick={() => openWhatsApp(serviceMessage(service.title))}
                    className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-sans hover:bg-white/30 transition-all duration-200"
                  >
                    Book {service.title.split(' ')[0]} Session
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
