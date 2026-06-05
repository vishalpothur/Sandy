'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAMES = [
  { id: 'lid',    src: '/photos/kids-books.jpg',      alt: 'Future Scholar', label: 'Kids',     w: 3, h: 4 },
  { id: 'left1',  src: '/photos/kids-cake-smash.jpg', alt: 'I Am One!',      label: 'Events',   w: 4, h: 5 },
  { id: 'right1', src: '/photos/kids-outdoor.jpg',    alt: 'Little Explorer',label: 'Kids',     w: 3, h: 4 },
  { id: 'btm',    src: '/photos/kids-cake-smash.jpg', alt: 'Birthday Magic', label: 'Events',   w: 16, h: 10 },
  { id: 'top',    src: '/photos/kids-outdoor.jpg',    alt: 'Sandy Kids',     label: 'Kids',     w: 3, h: 4 },
]

export default function ScrollShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        // Initial hidden states
        gsap.set('#ss-label',    { y: 24, opacity: 0 })
        gsap.set('#ss-heading',  { y: 40, opacity: 0 })
        gsap.set('#ss-sub',      { y: 20, opacity: 0 })
        gsap.set('#ss-cta',      { y: 16, opacity: 0 })
        gsap.set('#frame-lid',   { rotationX: 68, transformOrigin: '50% 100%', opacity: 0, scale: 0.88 })
        gsap.set('#frame-left1', { x: -280, y: 60,  rotationY: 38,  rotationZ: -6, opacity: 0, scale: 0.72 })
        gsap.set('#frame-right1',{ x:  280, y: -40, rotationY: -35, rotationZ:  8, opacity: 0, scale: 0.68 })
        gsap.set('#frame-top',   { x: -180, y: -80, rotationX: 22, rotationZ: 10, opacity: 0, scale: 0.58 })
        gsap.set('#frame-btm',   { x:  160, y:  80, rotationX:-22, rotationZ: -8, opacity: 0, scale: 0.58 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: '+=360%',
            scrub: 1.4,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        })

        // Phase 1 — text fades in, lid opens
        tl
          .to('#ss-label',   { y: 0, opacity: 1, duration: 0.2 }, 0)
          .to('#ss-heading', { y: 0, opacity: 1, duration: 0.25 }, 0.04)
          .to('#ss-sub',     { y: 0, opacity: 1, duration: 0.2 }, 0.1)
          .to('#frame-lid',  { rotationX: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.inOut' }, 0.06)

        // Phase 2 — flanking frames fly in
          .to('#frame-left1',  { x: -220, y: 0,   rotationY:  6, rotationZ: -2, opacity: 1, scale: 1, duration: 0.35 }, 0.25)
          .to('#frame-right1', { x:  220, y: -20, rotationY: -5, rotationZ:  2, opacity: 1, scale: 1, duration: 0.35 }, 0.30)
          .to('#frame-top',    { x: -300, y: -100, rotationX: 0, rotationZ: 5, opacity: 0.85, scale: 0.82, duration: 0.3 }, 0.34)
          .to('#frame-btm',    { x:  290, y:  80,  rotationX: 0, rotationZ:-4, opacity: 0.85, scale: 0.80, duration: 0.3 }, 0.36)
          .to('#ss-cta',     { y: 0, opacity: 1, duration: 0.2 }, 0.42)

        // Phase 3 — converge inward (depth pull)
          .to('#frame-lid',    { scale: 1.05, z:  80, duration: 0.25 }, 0.58)
          .to('#frame-left1',  { x: -160, y:  0,  z: 40, rotationY: 1, duration: 0.25 }, 0.58)
          .to('#frame-right1', { x:  155, y: -10, z: 40, rotationY:-1, duration: 0.25 }, 0.58)
          .to('#frame-top',    { x: -220, y: -80, z: 20, duration: 0.25 }, 0.58)
          .to('#frame-btm',    { x:  210, y:  65, z: 20, duration: 0.25 }, 0.58)

        // Phase 4 — scatter exit
          .to('#ss-label',     { y: -30, opacity: 0, duration: 0.18 }, 0.76)
          .to('#ss-heading',   { y: -40, opacity: 0, duration: 0.2  }, 0.78)
          .to('#ss-sub',       { y: -20, opacity: 0, duration: 0.18 }, 0.80)
          .to('#ss-cta',       { y: -16, opacity: 0, duration: 0.16 }, 0.82)
          .to('#frame-lid',    { scale: 1.2, z: 220, opacity: 0, duration: 0.26, ease: 'power3.in' }, 0.76)
          .to('#frame-left1',  { x: -520, y: 100,  rotationY: -55, opacity: 0, duration: 0.24, ease: 'power3.in' }, 0.78)
          .to('#frame-right1', { x:  520, y: -80,  rotationY:  55, opacity: 0, duration: 0.24, ease: 'power3.in' }, 0.78)
          .to('#frame-top',    { x: -80,  y: -380, opacity: 0, scale: 0.35, duration: 0.22, ease: 'power3.in' }, 0.80)
          .to('#frame-btm',    { x:  80,  y:  380, opacity: 0, scale: 0.35, duration: 0.22, ease: 'power3.in' }, 0.80)
      }, wrapRef)

      return () => ctx.revert()
    })

    // Mobile — simple stagger fade
    mm.add('(max-width: 767px)', () => {
      const els = ['#frame-lid','#frame-left1','#frame-right1','#frame-top','#frame-btm']
      gsap.set(els, { opacity: 0, y: 40 })
      els.forEach((t, i) => gsap.to(t, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', once: true },
      }))
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapRef} style={{ height: '460vh' }}>
      {/* ── Pinned screen ── */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden flex flex-col"
        style={{ background: 'linear-gradient(175deg, #3d1f0e 0%, #5c2e12 35%, #2a1208 100%)' }}
      >

        {/* ── TOP: Text header — never overlaps frames ── */}
        <div className="flex-none pt-10 pb-4 px-6 text-center z-30 relative">
          <p
            id="ss-label"
            className="font-script text-2xl md:text-3xl mb-2"
            style={{ color: '#e8a598' }}
          >
            Every Frame Tells a Story
          </p>
          <h2
            id="ss-heading"
            className="font-serif font-light text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}
          >
            Captured in{' '}
            <em className="italic" style={{ color: '#e8b49a' }}>Perfect Light</em>
          </h2>
          <p
            id="ss-sub"
            className="text-white/50 font-light text-sm mt-3 tracking-wide"
          >
            Scroll to experience moments that take your breath away
          </p>
        </div>

        {/* ── MIDDLE: 3D Stage — frames only ── */}
        <div
          className="relative flex-1 flex items-center justify-center overflow-hidden"
          style={{ perspective: '1100px', perspectiveOrigin: '50% 50%' }}
        >
          {/* Ambient glow */}
          <div className="absolute pointer-events-none" style={{
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,123,90,0.18) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />

          {/* Centre — lid frame */}
          <div id="frame-lid" className="absolute z-10" style={{ width: 'clamp(200px, 28vw, 380px)', transformStyle: 'preserve-3d' }}>
            <FrameCard frame={FRAMES[0]} accent="#e8a598" featured />
          </div>

          {/* Left */}
          <div id="frame-left1" className="absolute z-[8]" style={{ width: 'clamp(140px, 19vw, 280px)', transformStyle: 'preserve-3d' }}>
            <FrameCard frame={FRAMES[1]} accent="#8fa68d" />
          </div>

          {/* Right */}
          <div id="frame-right1" className="absolute z-[8]" style={{ width: 'clamp(130px, 18vw, 260px)', transformStyle: 'preserve-3d' }}>
            <FrameCard frame={FRAMES[2]} accent="#c97b5a" />
          </div>

          {/* Top-left small */}
          <div id="frame-top" className="absolute z-[6]" style={{ width: 'clamp(110px, 15vw, 220px)', transformStyle: 'preserve-3d' }}>
            <FrameCard frame={FRAMES[4]} accent="#d4956a" />
          </div>

          {/* Bottom-right small */}
          <div id="frame-btm" className="absolute z-[6]" style={{ width: 'clamp(150px, 20vw, 300px)', transformStyle: 'preserve-3d' }}>
            <FrameCard frame={FRAMES[3]} accent="#e8a598" />
          </div>
        </div>

        {/* ── BOTTOM: CTA — never overlaps frames ── */}
        <div className="flex-none pb-8 flex justify-center z-30 relative">
          <a
            id="ss-cta"
            href="#gallery"
            onClick={(e) => { e.preventDefault(); document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-light tracking-wide text-sm transition-all duration-300"
            style={{ border: '1px solid rgba(232,165,152,0.4)', color: '#e8a598' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(232,165,152,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            View Portfolio <span className="text-xs">↓</span>
          </a>
        </div>

        {/* Mobile fallback grid */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-start gap-4 px-4 pt-24 pb-8 overflow-y-auto">
          <p className="font-script text-2xl" style={{ color: '#e8a598' }}>Every Frame Tells a Story</p>
          <h2 className="font-serif text-3xl font-light text-white text-center leading-tight">
            Captured in <em className="italic" style={{ color: '#e8a598' }}>Perfect Light</em>
          </h2>
          <div className="grid grid-cols-2 gap-3 w-full mt-2">
            {FRAMES.slice(0, 4).map((f) => (
              <div key={f.id} className="rounded-2xl overflow-hidden" style={{ aspectRatio: `${f.w}/${f.h}` }}>
                <img src={f.src} alt={f.alt} className="w-full h-full object-cover"
                  onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FrameCard({ frame, accent, featured = false }: { frame: typeof FRAMES[0]; accent: string; featured?: boolean }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: `${frame.w}/${frame.h}`,
        boxShadow: featured
          ? `0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.1), 0 0 50px ${accent}28`
          : `0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)`,
      }}
    >
      <img
        src={frame.src}
        alt={frame.alt}
        className="w-full h-full object-cover"
        onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <p className="text-xs tracking-widest uppercase font-light" style={{ color: accent }}>{frame.label}</p>
        {featured && <p className="font-serif text-white text-base md:text-lg font-light mt-0.5">{frame.alt}</p>}
      </div>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }} />
    </div>
  )
}
