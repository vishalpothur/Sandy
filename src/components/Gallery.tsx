'use client'
import { useState, useEffect, useRef } from 'react'
import Lightbox from './Lightbox'

const allImages = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80', title: 'Golden Afternoon',   category: 'Kids',      aspect: '4/3' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80', title: 'Playful Spirit',     category: 'Kids',      aspect: '3/4' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Little Explorer',    category: 'Kids',      aspect: '1/1' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Giggles & Smiles',   category: 'Kids',      aspect: '4/3' },
  { id: 5,  src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', title: 'Adventure Time',    category: 'Kids',      aspect: '3/4' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80', title: 'Sunshine Days',     category: 'Kids',      aspect: '4/3' },
  { id: 7,  src: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&q=80', title: 'Glowing Mama',      category: 'Maternity', aspect: '3/4' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1583703787657-e84ee23acf05?w=800&q=80', title: 'Beautiful Bump',    category: 'Maternity', aspect: '3/4' },
  { id: 9,  src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80', title: 'Expecting Love',    category: 'Maternity', aspect: '4/3' },
  { id: 10, src: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=800&q=80', title: 'Nine Months',       category: 'Maternity', aspect: '3/4' },
  { id: 11, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Our Wedding Day',   category: 'Weddings',  aspect: '3/4' },
  { id: 12, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', title: 'Together Always',   category: 'Weddings',  aspect: '4/3' },
  { id: 13, src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80', title: 'First Dance',       category: 'Weddings',  aspect: '4/3' },
  { id: 14, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', title: 'Bridal Glow',       category: 'Weddings',  aspect: '3/4' },
  { id: 15, src: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800&q=80', title: 'Forever Begins',    category: 'Weddings',  aspect: '1/1' },
  { id: 16, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', title: 'Celebration Time',  category: 'Events',    aspect: '4/3' },
  { id: 17, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', title: 'Happy Moments',     category: 'Events',    aspect: '3/4' },
  { id: 18, src: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80', title: 'First Birthday',    category: 'Events',    aspect: '1/1' },
  { id: 19, src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80', title: 'Party Magic',       category: 'Events',    aspect: '4/3' },
  { id: 20, src: 'https://images.unsplash.com/photo-1519456264917-42d2b47d2b72?w=800&q=80', title: 'Curious Eyes',      category: 'Kids',      aspect: '3/4' },
  { id: 21, src: 'https://images.unsplash.com/photo-1565087158964-d1b0ab8e77d2?w=800&q=80', title: 'Little Hands',      category: 'Maternity', aspect: '4/3' },
  { id: 22, src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80', title: 'Sunshine Kid',      category: 'Kids',      aspect: '4/3' },
  { id: 23, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', title: 'Wedding Portraits', category: 'Weddings',  aspect: '3/4' },
  { id: 24, src: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=800&q=80', title: 'Sweet Slumber',     category: 'Maternity', aspect: '3/4' },
]

const FILTERS = ['All', 'Kids', 'Maternity', 'Weddings', 'Events']

function GalleryItem({ image, index, onClick }: { image: typeof allImages[0]; index: number; onClick: (img: typeof allImages[0]) => void }) {
  const ref = useRef<HTMLDivElement>(null)

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
    <div ref={ref} className="break-inside-avoid mb-4 overflow-hidden cursor-pointer group relative rounded-xl" style={{ opacity: 0 }} onClick={() => onClick(image)}>
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ aspectRatio: image.aspect }}
          onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-4" style={{ background: 'rgba(232,165,152,0.75)' }}>
          <p className="text-terra text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 font-medium">{image.category}</p>
          <p className="text-warm-brown font-serif text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{image.title}</p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const filtered = activeFilter === 'All' ? allImages : allImages.filter(img => img.category === activeFilter)

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return
    setTransitioning(true)
    setTimeout(() => { setActiveFilter(filter); setTransitioning(false) }, 200)
  }

  const openLightbox = (image: typeof allImages[0]) => {
    setLightboxIndex(filtered.findIndex(img => img.id === image.id))
  }

  return (
    <section id="gallery" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-script text-3xl text-terra mb-2">Our Portfolio</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-warm-brown mb-6">Stories We&apos;ve Told</h2>
          <div className="w-16 h-0.5 bg-blush mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-2 text-sm rounded-full transition-all duration-300 ${activeFilter === filter ? 'bg-terra text-white font-medium' : 'bg-cream-3 text-warm-mid hover:bg-blush-light'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 transition-opacity duration-200 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
          {filtered.map((image, index) => (
            <GalleryItem key={image.id} image={image} index={index} onClick={openLightbox} />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => ((i ?? 0) - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex(i => ((i ?? 0) + 1) % filtered.length)}
        />
      )}
    </section>
  )
}
