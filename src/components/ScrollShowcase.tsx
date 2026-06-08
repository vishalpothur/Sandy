'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Tick marks around the aperture ring
function ApertureRing({ size, ticks = 36 }: { size: number; ticks?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute pointer-events-none"
      style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 20 }}
    >
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i / ticks) * 360
        const rad = (angle * Math.PI) / 180
        const r = size / 2 - 4
        const tickLen = i % 9 === 0 ? 10 : i % 3 === 0 ? 6 : 3
        const x1 = size / 2 + (r - tickLen) * Math.cos(rad)
        const y1 = size / 2 + (r - tickLen) * Math.sin(rad)
        const x2 = size / 2 + r * Math.cos(rad)
        const y2 = size / 2 + r * Math.sin(rad)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(201,123,90,0.55)" strokeWidth={i % 9 === 0 ? 1.5 : 0.8} />
        )
      })}
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 18}
        fill="none" stroke="rgba(201,123,90,0.25)" strokeWidth="1" />
    </svg>
  )
}

export default function ScrollShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pinRef  = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {

        // All photos start as closed iris
        gsap.set('#photo-c', { clipPath: 'circle(0% at 50% 50%)', scale: 1.08 })
        gsap.set('#photo-l', { clipPath: 'circle(0% at 50% 50%)', scale: 1.08 })
        gsap.set('#photo-r', { clipPath: 'circle(0% at 50% 50%)', scale: 1.08 })
        gsap.set('#ring-c',  { rotation: -120, opacity: 0, transformOrigin: '50% 50%' })
        gsap.set('#ring-l',  { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' })
        gsap.set('#ring-r',  { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' })
        gsap.set('#iris-label',    { opacity: 0, y: 16 })
        gsap.set('#iris-heading',  { opacity: 0, y: 20 })
        gsap.set('#iris-sub',      { opacity: 0 })
        gsap.set(['#wrap-l', '#wrap-r'], { opacity: 0 })
        gsap.set('#iris-fstop',    { opacity: 0 })
        gsap.set('#iris-scanline', { scaleX: 0, transformOrigin: '0% 50%', opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: '+=320%',
            scrub: 1.2,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        })

        // Phase 1 — center iris opens + ring spins in
        tl
          .to('#ring-c',    { rotation: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
          .to('#iris-scanline', { scaleX: 1, opacity: 1, duration: 0.25 }, 0.04)
          .to('#photo-c',   { clipPath: 'circle(72% at 50% 50%)', scale: 1, duration: 0.45, ease: 'power3.inOut' }, 0.08)

        // Phase 2 — side iris open + text reveal
          .to(['#wrap-l','#wrap-r'], { opacity: 1, duration: 0.2 }, 0.35)
          .to(['#ring-l','#ring-r'], { opacity: 1, scale: 1, duration: 0.25 }, 0.38)
          .to('#photo-l',   { clipPath: 'circle(72% at 50% 50%)', scale: 1, duration: 0.3, ease: 'power2.inOut' }, 0.40)
          .to('#photo-r',   { clipPath: 'circle(72% at 50% 50%)', scale: 1, duration: 0.3, ease: 'power2.inOut' }, 0.46)
          .to('#iris-label',   { opacity: 1, y: 0, duration: 0.2 }, 0.50)
          .to('#iris-heading', { opacity: 1, y: 0, duration: 0.25 }, 0.54)
          .to('#iris-sub',     { opacity: 1, duration: 0.2 }, 0.60)
          .to('#iris-fstop',   { opacity: 1, duration: 0.2 }, 0.60)

        // Phase 3 — ring slowly rotates (hold)
          .to('#ring-c',    { rotation: 60, duration: 0.3 }, 0.55)

        // Phase 4 — close all irises
          .to('#iris-label',   { opacity: 0, duration: 0.15 }, 0.76)
          .to('#iris-heading', { opacity: 0, y: -10, duration: 0.15 }, 0.78)
          .to('#iris-sub',     { opacity: 0, duration: 0.12 }, 0.78)
          .to('#iris-fstop',   { opacity: 0, duration: 0.12 }, 0.78)
          .to('#iris-scanline',{ opacity: 0, duration: 0.1 }, 0.78)
          .to('#photo-l',   { clipPath: 'circle(0% at 50% 50%)', scale: 1.08, duration: 0.22, ease: 'power3.in' }, 0.78)
          .to('#photo-r',   { clipPath: 'circle(0% at 50% 50%)', scale: 1.08, duration: 0.22, ease: 'power3.in' }, 0.80)
          .to(['#ring-l','#ring-r'], { opacity: 0, scale: 0.7, duration: 0.2 }, 0.80)
          .to('#photo-c',   { clipPath: 'circle(0% at 50% 50%)', scale: 1.12, duration: 0.28, ease: 'power3.in' }, 0.82)
          .to('#ring-c',    { opacity: 0, scale: 1.2, rotation: 120, duration: 0.25 }, 0.84)

      }, wrapRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.set('#photo-c', { clipPath: 'circle(0% at 50% 50%)' })
        gsap.from('#iris-label',   { opacity: 0, duration: 0.5, delay: 0.4 })
        gsap.from('#iris-heading', { opacity: 0, y: 20, duration: 0.6, delay: 0.55 })
        gsap.to('#photo-c', {
          clipPath: 'circle(72% at 50% 50%)', duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', once: true },
        })
      }, wrapRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapRef} style={{ height: '420vh' }}>
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #14100d 0%, #09080e 70%, #060509 100%)' }}
      >
        {/* Ambient glow behind center */}
        <div className="absolute pointer-events-none" style={{
          width: '40vw', height: '40vw', borderRadius: '50%', top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          background: 'radial-gradient(circle, rgba(201,123,90,0.08) 0%, transparent 70%)',
        }} />

        {/* F-stop / shutter decorative text */}
        <div id="iris-fstop" className="absolute top-8 left-8 hidden md:flex flex-col gap-1 font-mono text-xs"
          style={{ color: 'rgba(201,123,90,0.45)' }}>
          <span>ƒ / 1.8</span>
          <span>1/500s</span>
          <span>ISO 200</span>
        </div>
        <div className="absolute top-8 right-8 hidden md:block font-mono text-xs" style={{ color: 'rgba(201,123,90,0.3)' }}>
          <span id="iris-fstop">SANDY · PHOTOGRAPHY</span>
        </div>

        {/* Scan line */}
        <div id="iris-scanline" className="absolute hidden md:block" style={{
          left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(201,123,90,0.6) 30%, rgba(255,200,150,0.9) 50%, rgba(201,123,90,0.6) 70%, transparent 100%)',
          top: '50%',
          boxShadow: '0 0 8px rgba(201,123,90,0.5)',
        }} />

        {/* Main composition */}
        <div className="relative flex items-center justify-center gap-6 md:gap-10">

          {/* Left circle */}
          <div id="wrap-l" className="hidden md:block relative flex-shrink-0"
            style={{ width: 'clamp(130px, 14vw, 190px)', height: 'clamp(130px, 14vw, 190px)' }}>
            <div className="relative w-full h-full">
              <ApertureRing size={220} ticks={24} />
              <div id="ring-l" className="absolute rounded-full pointer-events-none" style={{
                inset: '-8px', border: '1px solid rgba(201,123,90,0.35)', borderRadius: '50%',
                boxShadow: '0 0 16px rgba(201,123,90,0.12)',
              }} />
              <div id="photo-l" className="w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 30px rgba(201,123,90,0.15)' }}>
                <img src="/photos/kids-books.jpg" alt="Kids" className="w-full h-full object-cover loaded" />
              </div>
            </div>
          </div>

          {/* Center circle */}
          <div className="relative flex-shrink-0"
            style={{ width: 'clamp(240px, 32vw, 430px)', height: 'clamp(240px, 32vw, 430px)' }}>
            <div className="relative w-full h-full">
              <ApertureRing size={580} ticks={60} />
              <div id="ring-c" className="absolute rounded-full pointer-events-none" style={{
                inset: '-14px', border: '1.5px solid rgba(201,123,90,0.5)', borderRadius: '50%',
                boxShadow: '0 0 40px rgba(201,123,90,0.15), inset 0 0 40px rgba(201,123,90,0.04)',
              }} />
              <div id="photo-c" className="w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 60px rgba(201,123,90,0.2)' }}>
                <img src="/photos/kids-outdoor.jpg" alt="Sandy Photography" className="w-full h-full object-cover loaded" />
              </div>
            </div>
          </div>

          {/* Right circle */}
          <div id="wrap-r" className="hidden md:block relative flex-shrink-0"
            style={{ width: 'clamp(130px, 14vw, 190px)', height: 'clamp(130px, 14vw, 190px)' }}>
            <div className="relative w-full h-full">
              <ApertureRing size={220} ticks={24} />
              <div id="ring-r" className="absolute rounded-full pointer-events-none" style={{
                inset: '-8px', border: '1px solid rgba(201,123,90,0.35)', borderRadius: '50%',
                boxShadow: '0 0 16px rgba(201,123,90,0.12)',
              }} />
              <div id="photo-r" className="w-full h-full rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 30px rgba(201,123,90,0.15)' }}>
                <img src="/photos/kids-cake-smash.jpg" alt="Events" className="w-full h-full object-cover loaded" />
              </div>
            </div>
          </div>

        </div>

        {/* Text below */}
        <div className="mt-10 md:mt-14 text-center z-20">
          <p id="iris-label" className="font-script mb-2" style={{ fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', color: '#c97b5a' }}>
            Sandy Photography
          </p>
          <h2 id="iris-heading" className="font-serif font-light text-white leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}>
            Every Giggle,{' '}
            <em className="italic" style={{ color: 'rgba(201,123,90,0.9)' }}>Every Milestone</em>
          </h2>
          <p id="iris-sub" className="mt-3 font-mono tracking-widest uppercase text-xs"
            style={{ color: 'rgba(255,255,255,0.35)' }}>
            Authentic moments · Captured forever
          </p>
        </div>

      </div>
    </div>
  )
}
