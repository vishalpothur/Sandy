'use client'
import { useEffect, useRef, useState } from 'react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type Image = { id: number; src: string; title: string; category: string; aspect: string }

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: {
  images: Image[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [currentIndex])

  const handlePrev = () => {
    if (animating) return
    setDirection(-1); setAnimating(true)
    setTimeout(() => { onPrev(); setAnimating(false) }, 250)
  }
  const handleNext = () => {
    if (animating) return
    setDirection(1); setAnimating(true)
    setTimeout(() => { onNext(); setAnimating(false) }, 250)
  }

  const img = images[currentIndex]
  if (!img) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (delta > 50) handlePrev(); else if (delta < -50) handleNext()
        touchStartX.current = null
      }}
    >
      <button onClick={onClose} className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white transition-all duration-200" aria-label="Close">
        <FiX size={20} />
      </button>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/50">
        {currentIndex + 1} / {images.length}
      </div>
      <button onClick={handlePrev} className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white transition-all duration-200" aria-label="Previous">
        <FiChevronLeft size={24} />
      </button>
      <div className="relative max-w-[85vw] max-h-[80vh] flex items-center justify-center transition-all duration-250"
        style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction * -30}px)` : 'translateX(0)' }}>
        <img
          key={currentIndex}
          src={img.src.replace('w=800', 'w=1400')}
          alt={img.title}
          className="max-w-full max-h-[78vh] object-contain"
          onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
        />
      </div>
      <button onClick={handleNext} className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center border border-white/20 text-white/70 hover:text-white transition-all duration-200" aria-label="Next">
        <FiChevronRight size={24} />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-blush text-sm tracking-widest font-light">{img.title}</p>
        <p className="text-white/40 text-xs tracking-wider mt-1">{img.category}</p>
      </div>
    </div>
  )
}
