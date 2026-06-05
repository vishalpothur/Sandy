import { useState, useEffect, useRef, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Priya & Arjun',
    type: 'Wedding',
    quote: 'Sandy captured every emotion of our wedding day with breathtaking precision. The photos are beyond our dreams — each frame tells our story perfectly.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=100&q=80',
  },
  {
    name: 'Meera Nair',
    type: 'Portrait',
    quote: "I've never felt so comfortable in front of a camera. Sandy has a magical way of bringing out your true self. The portraits are absolutely ethereal.",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    name: 'Vikram & Deepa',
    type: 'Maternity',
    quote: 'Our maternity shoot was an ethereal experience. Sandy transformed a simple moment into pure art. We will treasure these photographs forever.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
  {
    name: 'Radha Krishnan',
    type: 'Fashion',
    quote: 'Professional, creative, and incredibly talented. The editorial shoot exceeded every expectation. Sandy understands aesthetics like no other photographer I have worked with.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
  },
  {
    name: 'Ananya Sharma',
    type: 'Events',
    quote: 'Our product launch was immortalized perfectly. Every important moment captured with elegance and discretion. The team was thoroughly impressed.',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive(index)
      setAnimating(false)
    }, 300)
  }, [animating])

  const prev = useCallback(() => goTo((active - 1 + testimonials.length) % testimonials.length), [active, goTo])
  const next = useCallback(() => goTo((active + 1) % testimonials.length), [active, goTo])

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
    }, 4000)
  }, [])

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [startInterval])

  const handleMouseEnter = () => clearInterval(intervalRef.current)
  const handleMouseLeave = () => startInterval()

  const t = testimonials[active]

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 px-6 bg-[#080808] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-ultra text-gold font-light uppercase mb-4">Testimonials</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-white">
            Stories of Joy
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main testimonial */}
          <div
            className="text-center px-4 md:px-16 transition-all duration-300"
            style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)' }}
          >
            {/* Quote mark */}
            <p className="font-serif text-8xl text-gold/20 leading-none mb-2 select-none">&ldquo;</p>

            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-white/90 italic leading-relaxed mb-10">
              {t.quote}
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                  onLoad={(e) => e.target.classList.add('loaded')}
                  loading="lazy"
                />
              </div>
              <div className="text-left">
                <p className="text-gold text-sm tracking-wide font-light">{t.name}</p>
                <p className="text-white/30 text-xs tracking-widest uppercase">{t.type}</p>
              </div>
            </div>
          </div>

          {/* Prev/Next */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all duration-200"
            aria-label="Previous"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all duration-200"
            aria-label="Next"
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === active ? 'w-6 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
