import { useState, useEffect, useRef } from 'react'
import Lightbox from './Lightbox'

const allImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', title: 'Golden Hour Vows', category: 'Weddings', aspect: '3/4' },
  { id: 2, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Sacred Union', category: 'Weddings', aspect: '4/3' },
  { id: 3, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', title: 'First Dance', category: 'Weddings', aspect: '3/4' },
  { id: 4, src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80', title: 'Eternal Promise', category: 'Weddings', aspect: '4/3' },
  { id: 5, src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', title: 'Inner Light', category: 'Portraits', aspect: '3/4' },
  { id: 6, src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80', title: 'Quiet Strength', category: 'Portraits', aspect: '3/4' },
  { id: 7, src: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80', title: 'Golden Hour', category: 'Portraits', aspect: '1/1' },
  { id: 8, src: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=800&q=80', title: 'Serene Gaze', category: 'Portraits', aspect: '3/4' },
  { id: 9, src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', title: 'Editorial Vision', category: 'Fashion', aspect: '4/3' },
  { id: 10, src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', title: 'High Fashion', category: 'Fashion', aspect: '3/4' },
  { id: 11, src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', title: 'Avant-Garde', category: 'Fashion', aspect: '3/4' },
  { id: 12, src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80', title: 'Couture Dream', category: 'Fashion', aspect: '4/3' },
  { id: 13, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title: 'Grand Opening', category: 'Events', aspect: '4/3' },
  { id: 14, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', title: 'Celebration', category: 'Events', aspect: '4/3' },
  { id: 15, src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80', title: 'Corporate Summit', category: 'Events', aspect: '3/4' },
  { id: 16, src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', title: 'Live Music', category: 'Events', aspect: '4/3' },
  { id: 17, src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', title: 'Mountain Serenity', category: 'Travel', aspect: '4/3' },
  { id: 18, src: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80', title: 'Ocean Horizon', category: 'Travel', aspect: '4/3' },
  { id: 19, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', title: 'Alpine Light', category: 'Travel', aspect: '3/4' },
  { id: 20, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', title: 'Desert Dusk', category: 'Travel', aspect: '4/3' },
  { id: 21, src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', title: 'Together Always', category: 'Weddings', aspect: '3/4' },
  { id: 22, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', title: 'Natural Beauty', category: 'Portraits', aspect: '3/4' },
  { id: 23, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80', title: 'Runway Ready', category: 'Fashion', aspect: '3/4' },
  { id: 24, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', title: 'After Party', category: 'Events', aspect: '4/3' },
]

const FILTERS = ['All', 'Weddings', 'Portraits', 'Fashion', 'Events', 'Travel']

function GalleryItem({ image, index, onClick }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${(index % 8) * 0.07}s`
          el.classList.add('fade-in-up')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="break-inside-avoid mb-4 overflow-hidden cursor-pointer group relative"
      style={{ opacity: 0 }}
      onClick={() => onClick(image)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ aspectRatio: image.aspect }}
          onLoad={(e) => e.target.classList.add('loaded')}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-start justify-end p-4">
          <p className="text-[10px] tracking-widest text-gold uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {image.category}
          </p>
          <p className="text-white font-serif text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            {image.title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [transitioning, setTransitioning] = useState(false)

  const filtered = activeFilter === 'All' ? allImages : allImages.filter(img => img.category === activeFilter)

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveFilter(filter)
      setTransitioning(false)
    }, 200)
  }

  const openLightbox = (image) => {
    const idx = filtered.findIndex(img => img.id === image.id)
    setLightboxIndex(idx)
  }

  return (
    <section id="gallery" className="py-24 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-ultra text-gold font-light uppercase mb-4">Portfolio</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-white mb-6">Selected Work</h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-2 text-xs tracking-widest transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gold text-[#080808] font-semibold'
                  : 'border border-white/20 text-white/60 hover:border-gold hover:text-gold'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div
          className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 transition-opacity duration-200 ${
            transitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filtered.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              onClick={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % filtered.length)}
        />
      )}
    </section>
  )
}
