'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Octagon points at radius r% centered at 50%,50%
function octagon(r: number) {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 - 90) * (Math.PI / 180)
    return `${+(50 + r * Math.cos(a)).toFixed(2)}% ${+(50 + r * Math.sin(a)).toFixed(2)}%`
  })
  return `polygon(${pts.join(', ')})`
}
const CLOSED = octagon(0)
const OPEN   = octagon(72)

function ApertureRing({ pct, ticks = 48 }: { pct: number; ticks?: number }) {
  const s = 100
  const r = s / 2 - 2
  return (
    <svg viewBox={`0 0 ${s} ${s}`} className="absolute pointer-events-none"
      style={{ top: `${-pct}%`, left: `${-pct}%`, width: `${100 + pct * 2}%`, height: `${100 + pct * 2}%`, zIndex: 20 }}>
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i / ticks) * 360
        const rad = (angle * Math.PI) / 180
        const tl = i % 12 === 0 ? 9 : i % 4 === 0 ? 5 : 2.5
        const x1 = s/2 + (r - tl) * Math.cos(rad), y1 = s/2 + (r - tl) * Math.sin(rad)
        const x2 = s/2 + r * Math.cos(rad),         y2 = s/2 + r * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(60,30,10,0.45)" strokeWidth={i % 12 === 0 ? 0.9 : 0.45} />
      })}
      <circle cx={s/2} cy={s/2} r={r - 12} fill="none" stroke="rgba(60,30,10,0.15)" strokeWidth="0.5" />
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
        // All irises closed + rotated
        gsap.set(['#photo-c','#photo-l','#photo-r'], { clipPath: CLOSED, rotation: -45, transformOrigin: '50% 50%' })
        gsap.set('#ring-c', { rotation: -60, opacity: 0, transformOrigin: '50% 50%' })
        gsap.set(['#ring-l','#ring-r'], { opacity: 0, transformOrigin: '50% 50%' })
        gsap.set(['#wrap-l','#wrap-r'], { opacity: 0 })
        gsap.set(['#ss-label','#ss-heading','#ss-sub'], { opacity: 0, y: 12 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: '+=300%',
            scrub: 1.2,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        })

        // Center iris opens like a shutter — polygon expands + rotates
        tl
          .to('#ring-c',  { rotation: 0, opacity: 1, duration: 0.3 }, 0)
          .to('#photo-c', { clipPath: OPEN, rotation: 0, duration: 0.45, ease: 'power3.inOut' }, 0.04)

        // Side irises open staggered
          .to(['#wrap-l','#wrap-r'], { opacity: 1, duration: 0.2 }, 0.32)
          .to(['#ring-l','#ring-r'], { opacity: 1, duration: 0.22 }, 0.34)
          .to('#photo-l', { clipPath: OPEN, rotation: 0, duration: 0.32, ease: 'power2.inOut' }, 0.37)
          .to('#photo-r', { clipPath: OPEN, rotation: 0, duration: 0.32, ease: 'power2.inOut' }, 0.43)

        // Text fades in
          .to('#ss-label',   { opacity: 1, y: 0, duration: 0.2 }, 0.50)
          .to('#ss-heading',  { opacity: 1, y: 0, duration: 0.22 }, 0.54)
          .to('#ss-sub',     { opacity: 1, y: 0, duration: 0.18 }, 0.60)

        // Ring slowly ticks
          .to('#ring-c', { rotation: 45, duration: 0.35 }, 0.50)

        // Irises close
          .to(['#ss-label','#ss-heading','#ss-sub'], { opacity: 0, duration: 0.15 }, 0.76)
          .to('#photo-l', { clipPath: CLOSED, rotation: 45, duration: 0.22, ease: 'power3.in' }, 0.78)
          .to('#photo-r', { clipPath: CLOSED, rotation: 45, duration: 0.22, ease: 'power3.in' }, 0.80)
          .to(['#ring-l','#ring-r'], { opacity: 0, duration: 0.2 }, 0.80)
          .to('#photo-c', { clipPath: CLOSED, rotation: 60, duration: 0.28, ease: 'power3.in' }, 0.82)
          .to('#ring-c',  { opacity: 0, scale: 1.1, duration: 0.22 }, 0.84)

      }, wrapRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.set('#photo-c', { clipPath: CLOSED, rotation: -45, transformOrigin: '50% 50%' })
        gsap.to('#photo-c', {
          clipPath: OPEN, rotation: 0, duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', once: true },
        })
      }, wrapRef)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapRef} style={{ height: '400vh' }}>
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(170deg, #fdfaf7 0%, #f5f0eb 50%, #ede4da 100%)' }}
      >
        {/* Circles */}
        <div className="relative flex items-center justify-center gap-5 md:gap-10"
          style={{ marginBottom: 'clamp(14px, 2.5vh, 30px)' }}>

          {/* Left */}
          <div id="wrap-l" className="hidden md:block relative flex-shrink-0"
            style={{ width: 'clamp(110px,12vw,165px)', height: 'clamp(110px,12vw,165px)', opacity: 0 }}>
            <ApertureRing pct={16} ticks={36} />
            <div id="ring-l" className="absolute rounded-full" style={{
              inset: '-7px', border: '1px solid rgba(60,30,10,0.25)', borderRadius: '50%' }} />
            <div id="photo-l" className="w-full h-full rounded-full overflow-hidden"
              style={{ boxShadow: '0 8px 30px rgba(60,30,10,0.15)' }}>
              <img src="/photos/kids-books.jpg" alt="Kids" className="w-full h-full object-cover loaded" />
            </div>
          </div>

          {/* Center */}
          <div className="relative flex-shrink-0" style={{
            width: 'min(clamp(210px,27vw,370px), 44vh)',
            height: 'min(clamp(210px,27vw,370px), 44vh)',
          }}>
            <ApertureRing pct={18} ticks={60} />
            <div id="ring-c" className="absolute rounded-full" style={{
              inset: '-12px', border: '1.5px solid rgba(60,30,10,0.3)', borderRadius: '50%',
              boxShadow: '0 0 30px rgba(201,123,90,0.08)' }} />
            <div id="photo-c" className="w-full h-full rounded-full overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(60,30,10,0.18)' }}>
              <img src="/photos/kids-outdoor.jpg" alt="Sandy Photography" className="w-full h-full object-cover loaded" />
            </div>
          </div>

          {/* Right */}
          <div id="wrap-r" className="hidden md:block relative flex-shrink-0"
            style={{ width: 'clamp(110px,12vw,165px)', height: 'clamp(110px,12vw,165px)', opacity: 0 }}>
            <ApertureRing pct={16} ticks={36} />
            <div id="ring-r" className="absolute rounded-full" style={{
              inset: '-7px', border: '1px solid rgba(60,30,10,0.25)', borderRadius: '50%' }} />
            <div id="photo-r" className="w-full h-full rounded-full overflow-hidden"
              style={{ boxShadow: '0 8px 30px rgba(60,30,10,0.15)' }}>
              <img src="/photos/kids-cake-smash.jpg" alt="Events" className="w-full h-full object-cover loaded" />
            </div>
          </div>

        </div>

        {/* Text */}
        <div className="text-center z-20 px-4">
          <p id="ss-label" className="font-script mb-1"
            style={{ fontSize: 'clamp(1.1rem,2vw,1.6rem)', color: '#c97b5a', opacity: 0 }}>
            Sandy Photography
          </p>
          <h2 id="ss-heading" className="font-serif font-light text-warm-brown leading-tight"
            style={{ fontSize: 'clamp(1.5rem,3vw,2.8rem)', opacity: 0 }}>
            Every Giggle,{' '}
            <em className="italic text-terra">Every Milestone</em>
          </h2>
          <p id="ss-sub" className="mt-2 text-warm-muted text-xs tracking-widest uppercase"
            style={{ opacity: 0 }}>
            Authentic moments · Captured forever
          </p>
        </div>

      </div>
    </div>
  )
}
