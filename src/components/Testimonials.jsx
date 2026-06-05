import { useState, useEffect, useRef, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Priya & Rahul',
    type: 'Newborn Session',
    quote: 'Sandy was SO patient with our 9-day-old. The photos are beyond anything we imagined — we cried happy tears when we saw them! 🥹',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    name: 'Deepa Menon',
    type: 'Maternity Session',
    quote: 'I felt so comfortable and beautiful the entire shoot. Sandy has a magical way of making you forget the camera is even there.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
  {
    name: 'The Sharma Family',
    type: 'Family Session',
    quote: 'Getting three kids under 5 to cooperate sounds impossible — Sandy made it look easy AND fun. The photos are stunning!',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=100&q=80',
  },
  {
    name: 'Ananya Krishnan',
    type: 'Baby Milestones',
    quote: "We've done Leela's 3-month, 6-month AND first birthday with Sandy. We wouldn't trust anyone else with our baby girl's memories.",
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
  },
  {
    name: 'Meera & Vikram',
    type: 'Cake Smash',
    quote: "Arjun's cake smash was the most fun session ever. Sandy captured every messy, giggly, perfect moment. 10/10 would recommend!",
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
      className="py-24 px-6 bg-cream overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-script text-3xl text-terra mb-2">Kind Words</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-warm-brown">
            Happy Families
          </h2>
          <div className="w-16 h-0.5 bg-blush mx-auto mt-6" />
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main testimonial card */}
          <div
            className="bg-white rounded-3xl px-8 py-10 md:px-16 md:py-12 shadow-[0_8px_40px_rgba(232,165,152,0.2)] transition-all duration-300"
            style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)' }}
          >
            {/* Stars */}
            <p className="text-terra text-xl mb-4 text-center">⭐⭐⭐⭐⭐</p>

            {/* Quote mark */}
            <p className="font-serif text-8xl text-blush/30 leading-none mb-2 select-none text-center">&ldquo;</p>

            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-warm-brown italic leading-relaxed mb-10 text-center">
              {t.quote}
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blush-light">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                  onLoad={(e) => e.target.classList.add('loaded')}
                  loading="lazy"
                />
              </div>
              <div className="text-left">
                <p className="text-warm-brown text-sm font-semibold">{t.name}</p>
                <p className="text-terra text-xs tracking-wide">{t.type}</p>
              </div>
            </div>
          </div>

          {/* Prev/Next */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-warm-mid hover:text-terra transition-all duration-200 border border-cream-3"
            aria-label="Previous"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-warm-mid hover:text-terra transition-all duration-200 border border-cream-3"
            aria-label="Next"
          >
            <FiChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === active ? 'w-6 h-2 bg-terra' : 'w-2 h-2 bg-blush-light hover:bg-blush'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
