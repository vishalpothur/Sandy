'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ApertureRing({ pct, ticks = 36 }: { pct: number; ticks?: number }) {
  const s = 100
  const r = s / 2 - 3
  return (
    <svg
      viewBox={`0 0 ${s} ${s}`}
      className="absolute pointer-events-none"
      style={{ top: `${-pct}%`, left: `${-pct}%`, width: `${100 + pct * 2}%`, height: `${100 + pct * 2}%`, zIndex: 20 }}
    >
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i / ticks) * 360
        const rad = (angle * Math.PI) / 180
        const tickLen = i % 9 === 0 ? 8 : i % 3 === 0 ? 5 : 2.5
        const x1 = s / 2 + (r - tickLen) * Math.cos(rad)
        const y1 = s / 2 + (r - tickLen) * Math.sin(rad)
        const x2 = s / 2 + r * Math.cos(rad)
        const y2 = s / 2 + r * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(201,123,90,0.6)" strokeWidth={i % 9 === 0 ? 0.8 : 0.4} />
      })}
      <circle cx={s / 2} cy={s / 2} r={r - 10}
        fill="none" stroke="rgba(201,123,90,0.2)" strokeWidth="0.5" />
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
        gsap.set('#photo-c', { clipPath: 'circle(0% at 50% 50%)' })
        gsap.set('#photo-l', { clipPath: 'circle(0% at 50% 50%)' })
        gsap.set('#photo-r', { clipPath: 'circle(0% at 50% 50%)' })
        gsap.set('#ring-c',  { rotation: -120, opacity: 0, transformOrigin: '50% 50%' })
        gsap.set('#ring-l',  { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' })
        gsap.set('#ring-r',  { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' })
        gsap.set('#iris-label',   { opacity: 0, y: 14 })
        gsap.set('#iris-heading', { opacity: 0, y: 18 })
        gsap.set('#iris-sub',     { opacity: 0 })
        gsap.set(['#wrap-l','#wrap-r'], { opacity: 0 })
        gsap.set('#iris-fstop',   { opacity: 0 })

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

        tl
          .to('#ring-c',   { rotation: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
          .to('#photo-c',  { clipPath: 'circle(72% at 50% 50%)', duration: 0.45, ease: 'power3.inOut' }, 0.06)
          .to(['#wrap-l','#wrap-r'], { opacity: 1, duration: 0.2 }, 0.32)
          .to(['#ring-l','#ring-r'], { opacity: 1, scale: 1, duration: 0.25 }, 0.35)
          .to('#photo-l',  { clipPath: 'circle(72% at 50% 50%)', duration: 0.3, ease: 'power2.inOut' }, 0.37)
          .to('#photo-r',  { clipPath: 'circle(72% at 50% 50%)', duration: 0.3, ease: 'power2.inOut' }, 0.43)
          .to('#iris-label',   { opacity: 1, y: 0, duration: 0.2 }, 0.48)
          .to('#iris-heading', { opacity: 1, y: 0, duration: 0.25 }, 0.52)
          .to('#iris-sub',     { opacity: 1, duration: 0.2 }, 0.58)
          .to('#iris-fstop',   { opacity: 1, duration: 0.2 }, 0.58)
          .to('#ring-c',   { rotation: 60, duration: 0.3 }, 0.52)
          // close
          .to(['#iris-label','#iris-heading','#iris-sub','#iris-fstop'], { opacity: 0, duration: 0.15 }, 0.76)
          .to('#photo-l',  { clipPath: 'circle(0% at 50% 50%)', duration: 0.22, ease: 'power3.in' }, 0.78)
          .to('#photo-r',  { clipPath: 'circle(0% at 50% 50%)', duration: 0.22, ease: 'power3.in' }, 0.80)
          .to(['#ring-l','#ring-r'], { opacity: 0, scale: 0.7, duration: 0.2 }, 0.80)
          .to('#photo-c',  { clipPath: 'circle(0% at 50% 50%)', duration: 0.28, ease: 'power3.in' }, 0.82)
          .to('#ring-c',   { opacity: 0, scale: 1.15, rotation: 120, duration: 0.25 }, 0.84)

      }, wrapRef)
      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.set('#photo-c', { clipPath: 'circle(0% at 50% 50%)' })
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
        className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 45%, #5c3420 0%, #3a1e0e 40%, #241208 100%)',
          paddingTop: '80px',
          paddingBottom: '16px',
        }}
      >
        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{
          width: '50vw', height: '50vw', borderRadius: '50%',
          top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201,123,90,0.12) 0%, transparent 65%)',
        }} />

        {/* F-stop decorative */}
        <div id="iris-fstop" className="absolute top-8 left-8 hidden md:flex flex-col gap-1 font-mono text-xs"
          style={{ color: 'rgba(201,123,90,0.5)', opacity: 0 }}>
          <span>ƒ / 1.8</span>
          <span>1/500s</span>
          <span>ISO 200</span>
        </div>
        <div className="absolute top-8 right-8 hidden md:block font-mono text-xs"
          style={{ color: 'rgba(201,123,90,0.35)', letterSpacing: '0.2em' }}>
          SANDY · PHOTOGRAPHY
        </div>

        {/* Circles row */}
        <div className="relative flex items-center justify-center gap-5 md:gap-8"
          style={{ marginBottom: 'clamp(16px, 2vh, 28px)' }}>

          {/* Left */}
          <div id="wrap-l" className="hidden md:block relative flex-shrink-0"
            style={{ width: 'clamp(100px,11vw,155px)', height: 'clamp(100px,11vw,155px)', opacity: 0 }}>
            <ApertureRing pct={14} ticks={24} />
            <div id="ring-l" className="absolute rounded-full pointer-events-none" style={{
              inset: '-7px', border: '1px solid rgba(201,123,90,0.4)', borderRadius: '50%',
              boxShadow: '0 0 14px rgba(201,123,90,0.12)',
            }} />
            <div id="photo-l" className="w-full h-full rounded-full overflow-hidden">
              <img src="/photos/kids-books.jpg" alt="Kids" className="w-full h-full object-cover loaded" />
            </div>
          </div>

          {/* Center */}
          <div className="relative flex-shrink-0" style={{
            width: 'min(clamp(200px,26vw,360px), 44vh)',
            height: 'min(clamp(200px,26vw,360px), 44vh)',
          }}>
            <ApertureRing pct={16} ticks={60} />
            <div id="ring-c" className="absolute rounded-full pointer-events-none" style={{
              inset: '-13px', border: '1.5px solid rgba(201,123,90,0.55)', borderRadius: '50%',
              boxShadow: '0 0 40px rgba(201,123,90,0.15), inset 0 0 30px rgba(201,123,90,0.05)',
            }} />
            <div id="photo-c" className="w-full h-full rounded-full overflow-hidden"
              style={{ boxShadow: '0 0 50px rgba(201,123,90,0.18)' }}>
              <img src="/photos/kids-outdoor.jpg" alt="Sandy Photography" className="w-full h-full object-cover loaded" />
            </div>
          </div>

          {/* Right */}
          <div id="wrap-r" className="hidden md:block relative flex-shrink-0"
            style={{ width: 'clamp(100px,11vw,155px)', height: 'clamp(100px,11vw,155px)', opacity: 0 }}>
            <ApertureRing pct={14} ticks={24} />
            <div id="ring-r" className="absolute rounded-full pointer-events-none" style={{
              inset: '-7px', border: '1px solid rgba(201,123,90,0.4)', borderRadius: '50%',
              boxShadow: '0 0 14px rgba(201,123,90,0.12)',
            }} />
            <div id="photo-r" className="w-full h-full rounded-full overflow-hidden">
              <img src="/photos/kids-cake-smash.jpg" alt="Events" className="w-full h-full object-cover loaded" />
            </div>
          </div>

        </div>

        {/* Text */}
        <div className="text-center z-20 px-4">
          <p id="iris-label" className="font-script mb-1" style={{ fontSize: 'clamp(1.1rem,2vw,1.6rem)', color: '#c97b5a', opacity: 0 }}>
            Sandy Photography
          </p>
          <h2 id="iris-heading" className="font-serif font-light text-white leading-tight"
            style={{ fontSize: 'clamp(1.4rem,3vw,2.6rem)', opacity: 0 }}>
            Every Giggle,{' '}
            <em className="italic" style={{ color: 'rgba(232,165,152,0.95)' }}>Every Milestone</em>
          </h2>
          <p id="iris-sub" className="mt-2 font-mono tracking-widest uppercase text-xs"
            style={{ color: 'rgba(255,255,255,0.3)', opacity: 0 }}>
            Authentic moments · Captured forever
          </p>
        </div>

      </div>
    </div>
  )
}
