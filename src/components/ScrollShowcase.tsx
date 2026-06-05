'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pinRef  = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        // Initial states
        gsap.set('#ss-thumb-tl',  { x: -80, opacity: 0 })
        gsap.set('#ss-side-r1',   { x:  80, opacity: 0 })
        gsap.set('#ss-side-r2',   { x:  80, opacity: 0 })
        gsap.set('#ss-center',    { scale: 0.92, opacity: 0 })
        gsap.set('#ss-overlay',   { y: 24, opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: '+=280%',
            scrub: 1,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        })

        tl
          .to('#ss-center',   { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
          .to('#ss-thumb-tl', { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.1)
          .to('#ss-side-r1',  { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.18)
          .to('#ss-side-r2',  { x: 0, opacity: 0.7, duration: 0.35, ease: 'power2.out' }, 0.24)
          .to('#ss-overlay',  { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.32)
          // Phase 2: subtle breathe
          .to('#ss-center',   { scale: 1.03, duration: 0.3 }, 0.55)
          // Phase 3: fade out
          .to(['#ss-thumb-tl','#ss-side-r1','#ss-side-r2'], { opacity: 0, x: 0, duration: 0.2 }, 0.78)
          .to('#ss-overlay',  { y: -20, opacity: 0, duration: 0.18 }, 0.80)
          .to('#ss-center',   { scale: 1.12, opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.80)

      }, wrapRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.from('#ss-center', { scale: 0.9, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', once: true } })
        gsap.from('#ss-overlay', { y: 20, opacity: 0, duration: 0.6, delay: 0.3, ease: 'power2.out',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', once: true } })
      }, wrapRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapRef} style={{ height: '380vh' }}>
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(150deg, #fdfaf7 0%, #f5f0eb 60%, #ede4da 100%)' }}
      >
        <div className="relative w-full max-w-6xl mx-auto px-6 flex items-center justify-center h-full">

          {/* Left thumbnail — small portrait top-left */}
          <div
            id="ss-thumb-tl"
            className="absolute hidden md:block"
            style={{ left: '2%', top: '12%', width: 'clamp(120px, 13vw, 190px)', zIndex: 8 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '3/4' }}>
              <img
                src="/photos/kids-books.jpg"
                alt="Kids"
                className="w-full h-full object-cover"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
              />
            </div>
          </div>

          {/* Center hero photo */}
          <div
            id="ss-center"
            className="relative flex-shrink-0"
            style={{
              width: 'clamp(280px, 38vw, 520px)',
              zIndex: 10,
            }}
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '3/4',
                boxShadow: '0 40px 100px rgba(60,30,10,0.18), 0 0 0 1px rgba(201,123,90,0.12)',
              }}
            >
              <img
                src="/photos/kids-outdoor.jpg"
                alt="Sandy Photography"
                className="w-full h-full object-cover"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
              />
              {/* Subtle gradient for text legibility */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(30,15,5,0.60) 0%, rgba(30,15,5,0.05) 50%, transparent 100%)' }}
              />
              {/* Text overlay */}
              <div id="ss-overlay" className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="font-script text-blush text-xl md:text-2xl mb-1">Sandy Photography</p>
                <h2
                  className="font-serif font-light text-white leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)' }}
                >
                  Every Giggle,<br />Every Milestone
                </h2>
                <p className="text-white/70 text-xs md:text-sm font-light mt-2 tracking-wide">
                  Authentic moments, captured forever
                </p>
              </div>
              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,123,90,0.5), transparent)' }} />
            </div>
          </div>

          {/* Right side cards */}
          <div
            className="absolute hidden md:flex flex-col gap-4"
            style={{ right: '3%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(140px, 16vw, 220px)', zIndex: 8 }}
          >
            <div
              id="ss-side-r1"
              className="rounded-2xl overflow-hidden shadow-md"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src="/photos/kids-cake-smash.jpg"
                alt="Events"
                className="w-full h-full object-cover"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
              />
            </div>
            <div
              id="ss-side-r2"
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ aspectRatio: '3/4', filter: 'blur(1.5px)' }}
            >
              <img
                src="/photos/kids-books.jpg"
                alt="Kids"
                className="w-full h-full object-cover"
                onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
              />
            </div>
          </div>

          {/* Mobile: text below image */}
          <div className="md:hidden absolute bottom-10 left-0 right-0 text-center px-6">
            <p className="font-script text-terra text-xl mb-1">Sandy Photography</p>
            <p className="font-serif text-warm-brown text-2xl font-light">Every Giggle, Every Milestone</p>
            <p className="text-warm-mid text-sm mt-1">Authentic moments, captured forever</p>
          </div>

        </div>
      </div>
    </div>
  )
}
