import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FloatingElements from './FloatingElements'
import { openWhatsApp, serviceMessage } from '../utils/whatsapp'

function addLoadedClass(e) {
  e.target.classList.add('loaded')
}

export default function Hero() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const descRef = useRef(null)
  const btnsRef = useRef(null)
  const badgesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
      )
      gsap.fromTo(labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo(descRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.75 }
      )
      gsap.fromTo(btnsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.95 }
      )
      gsap.fromTo(badgesRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.15 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const smoothScroll = (selector) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center bg-cream pt-20 overflow-hidden"
    >
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-6 w-full py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: Text content — 55% */}
          <div className="w-full lg:w-[55%] flex flex-col items-start order-2 lg:order-1">
            <p
              ref={labelRef}
              className="font-script text-2xl text-blush mb-4"
            >
              Welcome to
            </p>

            <h1
              ref={headingRef}
              className="font-serif font-light text-warm-brown leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
            >
              Capturing Your<br />
              Little One's<br />
              <em className="italic">Magic</em>
            </h1>

            <p
              ref={descRef}
              className="text-warm-mid font-light text-lg leading-relaxed max-w-lg mb-8"
            >
              Specialising in newborn, baby, kids &amp; maternity photography across India.
              Every session is crafted with warmth, patience, and love.
            </p>

            <div ref={btnsRef} className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <button
                onClick={() => smoothScroll('#gallery')}
                className="px-8 py-3.5 bg-terra text-white text-sm rounded-full font-medium hover:bg-terra-light transition-colors duration-300"
              >
                See Our Work
              </button>
              <button
                onClick={() => openWhatsApp(serviceMessage('Photography'))}
                className="px-8 py-3.5 border-2 border-terra text-terra text-sm rounded-full font-medium hover:bg-terra hover:text-white transition-all duration-300"
              >
                Book a Session
              </button>
            </div>

            <div ref={badgesRef} className="flex flex-wrap gap-3">
              {['Kids', 'Maternity', 'Weddings', 'Events'].map((badge) => (
                <span key={badge} className="text-xs tracking-widest text-warm-muted">
                  ✦ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Image — 45% */}
          <div className="w-full lg:w-[45%] order-1 lg:order-2">
            <div
              ref={imgRef}
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=1920&q=90"
                alt="Newborn baby photography"
                className="w-full h-full object-cover"
                onLoad={addLoadedClass}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
