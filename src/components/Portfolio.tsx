'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Lightbox from './Lightbox'

type Category = 'All' | 'Maternity' | 'Newborn' | 'Babies' | 'Kids' | 'Family'

const CATEGORIES: Category[] = ['All', 'Maternity', 'Newborn', 'Babies', 'Kids', 'Family']

interface Photo {
  src: string
  alt: string
  category: Exclude<Category, 'All'>
}

const PHOTOS: Photo[] = [
  { src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80', alt: 'Maternity glow', category: 'Maternity' },
  { src: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80', alt: 'Sleeping newborn', category: 'Newborn' },
  { src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', alt: 'Happy kid', category: 'Kids' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', alt: 'Family portrait', category: 'Family' },
  { src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80', alt: 'Baby milestone', category: 'Babies' },
  { src: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&q=80', alt: 'Maternity portrait', category: 'Maternity' },
  { src: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80', alt: 'Cake smash', category: 'Babies' },
  { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80', alt: 'Family moment', category: 'Family' },
  { src: 'https://images.unsplash.com/photo-1537365587684-f432bf3f4c2d?w=800&q=80', alt: 'Kids playing', category: 'Kids' },
  { src: 'https://images.unsplash.com/photo-1467903894768-41f24a837e3a?w=800&q=80', alt: 'Newborn hands', category: 'Newborn' },
  { src: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=800&q=80', alt: 'Baby smile', category: 'Babies' },
  { src: 'https://images.unsplash.com/photo-1504473383-e4d2b1c0c7c4?w=800&q=80', alt: 'Maternity forest', category: 'Maternity' },
  { src: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?w=800&q=80', alt: 'Family love', category: 'Family' },
  { src: 'https://images.unsplash.com/photo-1518978608299-2dc3c13ec2cb?w=800&q=80', alt: 'Little explorer', category: 'Kids' },
  { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80', alt: 'Newborn wrapped', category: 'Newborn' },
  { src: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800&q=80', alt: 'Baby curiosity', category: 'Babies' },
]

export default function Portfolio() {
  const [active, setActive] = useState<Category>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = active === 'All' ? PHOTOS : PHOTOS.filter((p) => p.category === active)

  return (
    <section id="portfolio" className="relative z-10 py-24 px-6 bg-cream-light/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-2xl text-blush mb-3"
          >
            Our Gallery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-warm-text"
          >
            Moments We&apos;ve <span className="text-gradient">Preserved</span>
          </motion.h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? 'bg-gradient-to-r from-blush to-lavender text-dark shadow-lg'
                  : 'glass text-muted hover:text-warm-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(i)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: i % 5 === 0 ? '4/5' : '1/1' }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-300 flex items-end p-4">
                  <p className="text-white font-sans text-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {photo.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          src={filtered[lightbox].src}
          alt={filtered[lightbox].alt}
          onClose={() => setLightbox(null)}
          onPrev={lightbox > 0 ? () => setLightbox(lightbox - 1) : undefined}
          onNext={lightbox < filtered.length - 1 ? () => setLightbox(lightbox + 1) : undefined}
        />
      )}
    </section>
  )
}
