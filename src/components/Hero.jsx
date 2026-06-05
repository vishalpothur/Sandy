import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronDown } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

function addLoadedClass(e) {
  e.target.classList.add('loaded')
}

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const descRef = useRef(null)
  const btnsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.fromTo(bgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 2.2, ease: 'power2.out' }
      )
      gsap.fromTo(labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      )
      gsap.fromTo(btnsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
      )

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
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
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1920&q=90"
          alt="Wedding portrait"
          className="w-full h-full object-cover"
          onLoad={addLoadedClass}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/40 to-[#080808]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          ref={labelRef}
          className="text-xs tracking-ultra text-gold font-light mb-8 uppercase"
        >
          Capturing Timeless Moments
        </p>

        <h1
          ref={headingRef}
          className="font-serif text-7xl sm:text-8xl lg:text-[110px] font-light leading-[0.9] text-white mb-8"
        >
          Life's Most<br />
          <em className="italic">Beautiful</em><br />
          Stories
        </h1>

        <p
          ref={descRef}
          className="text-white/70 text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Award-winning photography that transforms fleeting moments into timeless art.
          Based in India, working worldwide.
        </p>

        <div ref={btnsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => smoothScroll('#gallery')}
            className="px-10 py-4 bg-gold text-[#080808] text-xs tracking-widest font-semibold hover:bg-gold-light transition-colors duration-300 min-w-[180px]"
          >
            EXPLORE WORK
          </button>
          <button
            onClick={() => smoothScroll('#contact')}
            className="px-10 py-4 border border-white/50 text-white text-xs tracking-widest font-light hover:border-gold hover:text-gold transition-all duration-300 min-w-[180px]"
          >
            BOOK A SESSION
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] tracking-widest text-white/40 uppercase">Scroll</span>
        <FiChevronDown className="text-gold text-xl animate-bounce-y" />
      </div>
    </section>
  )
}
