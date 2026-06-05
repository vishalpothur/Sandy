'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAMES = [
  {
    id: 'lid',
    src: '/photos/kids-outdoor.jpg',
    alt: 'Little Biker',
    label: 'Kids',
    w: 480,
    h: 600,
  },
  {
    id: 'left1',
    src: '/photos/kids-cake-smash.jpg',
    alt: 'I Am One!',
    label: 'Events',
    w: 320,
    h: 400,
  },
  {
    id: 'right1',
    src: '/photos/kids-books.jpg',
    alt: 'Future Scholar',
    label: 'Kids',
    w: 300,
    h: 380,
  },
  {
    id: 'btm',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=85',
    alt: 'Event celebration',
    label: 'Events',
    w: 360,
    h: 260,
  },
  {
    id: 'top',
    src: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=900&q=85',
    alt: 'Maternity',
    label: 'Maternity',
    w: 280,
    h: 340,
  },
]

export default function ScrollShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Skip heavy 3D on small screens
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: '+=380%',
            scrub: 1.2,
            pin: pinRef.current,
            anticipatePin: 1,
          },
        })

        // ── Phase 0: Initial state — set everything before timeline starts ──
        gsap.set('#frame-lid', {
          rotationX: 72,
          transformOrigin: '50% 100%',
          y: 60,
          opacity: 0,
          scale: 0.92,
        })
        gsap.set('#frame-left1', {
          x: -320, y: 80, rotationY: 40, rotationZ: -8, opacity: 0, scale: 0.7,
        })
        gsap.set('#frame-right1', {
          x: 300, y: -60, rotationY: -35, rotationZ: 10, opacity: 0, scale: 0.65,
        })
        gsap.set('#frame-btm', {
          x: 120, y: 260, rotationX: -30, rotationZ: -5, opacity: 0, scale: 0.6,
        })
        gsap.set('#frame-top', {
          x: -200, y: -240, rotationX: 25, rotationZ: 12, opacity: 0, scale: 0.55,
        })
        gsap.set('#showcase-headline', { y: 60, opacity: 0 })
        gsap.set('#showcase-sub', { y: 40, opacity: 0 })
        gsap.set('#showcase-cta', { y: 30, opacity: 0 })

        // ── Phase 1 (0→0.25): Lid opens like a laptop, headline fades in ──
        tl
          .to('#showcase-headline', { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
          .to('#showcase-sub',      { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.06)
          .to('#frame-lid', {
            rotationX: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.inOut',
          }, 0.05)

          // ── Phase 2 (0.25→0.55): Side frames fly in with 3D parallax ──
          .to('#frame-left1', {
            x: -280, y: 20, rotationY: 8, rotationZ: -3, opacity: 1, scale: 1,
            duration: 0.4, ease: 'power2.out',
          }, 0.22)
          .to('#frame-right1', {
            x: 260, y: -30, rotationY: -6, rotationZ: 4, opacity: 1, scale: 1,
            duration: 0.4, ease: 'power2.out',
          }, 0.28)
          .to('#frame-top', {
            x: -320, y: -210, rotationX: 0, rotationZ: 6, opacity: 0.9, scale: 0.88,
            duration: 0.35, ease: 'power2.out',
          }, 0.32)
          .to('#frame-btm', {
            x: 260, y: 200, rotationX: 0, rotationZ: -4, opacity: 0.9, scale: 0.85,
            duration: 0.35, ease: 'power2.out',
          }, 0.34)
          .to('#showcase-cta', { y: 0, opacity: 1, duration: 0.2 }, 0.4)

          // ── Phase 3 (0.55→0.75): Everything converges — depth pull inward ──
          .to('#frame-lid', {
            scale: 1.06, z: 80, duration: 0.3, ease: 'power1.inOut',
          }, 0.55)
          .to('#frame-left1', {
            x: -200, y: 10, rotationY: 2, z: 40, duration: 0.3,
          }, 0.55)
          .to('#frame-right1', {
            x: 190, y: -15, rotationY: -2, z: 40, duration: 0.3,
          }, 0.55)
          .to('#frame-top', {
            x: -230, y: -170, z: 20, duration: 0.3,
          }, 0.55)
          .to('#frame-btm', {
            x: 190, y: 160, z: 20, duration: 0.3,
          }, 0.55)

          // ── Phase 4 (0.75→1.0): Dramatic exit — frames scatter outward ──
          .to('#frame-lid', {
            scale: 1.18, z: 200, opacity: 0, duration: 0.28, ease: 'power3.in',
          }, 0.75)
          .to('#frame-left1', {
            x: -500, y: 120, rotationY: -50, opacity: 0, duration: 0.25, ease: 'power3.in',
          }, 0.77)
          .to('#frame-right1', {
            x: 500, y: -100, rotationY: 50, opacity: 0, duration: 0.25, ease: 'power3.in',
          }, 0.77)
          .to('#frame-top', {
            x: -100, y: -400, opacity: 0, scale: 0.4, duration: 0.25, ease: 'power3.in',
          }, 0.79)
          .to('#frame-btm', {
            x: 100, y: 400, opacity: 0, scale: 0.4, duration: 0.25, ease: 'power3.in',
          }, 0.79)
          .to('#showcase-headline', { y: -40, opacity: 0, duration: 0.2 }, 0.77)
          .to('#showcase-sub',      { y: -30, opacity: 0, duration: 0.2 }, 0.79)
          .to('#showcase-cta',      { y: -20, opacity: 0, duration: 0.2 }, 0.81)
      }, wrapRef)

      return () => ctx.revert()
    })

    // Mobile fallback — simple fade-in, no 3D
    mm.add('(max-width: 767px)', () => {
      gsap.set('#frame-lid',    { opacity: 0, y: 40 })
      gsap.set('#frame-left1',  { opacity: 0, y: 30 })
      gsap.set('#frame-right1', { opacity: 0, y: 30 })
      gsap.set('#frame-top',    { opacity: 0, y: 20 })
      gsap.set('#frame-btm',    { opacity: 0, y: 20 })

      const targets = ['#frame-lid', '#frame-left1', '#frame-right1', '#frame-top', '#frame-btm']
      targets.forEach((t, i) => {
        gsap.to(t, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: t, start: 'top 85%', once: true },
          delay: i * 0.1,
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapRef} className="relative" style={{ height: '480vh' }}>
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(160deg, #1a0f0a 0%, #2d1a0e 40%, #0f0a08 100%)' }}
      >
        {/* 3D Stage */}
        <div
          ref={stageRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: '1100px', perspectiveOrigin: '50% 50%' }}
        >
          {/* ── Headline ── */}
          <div
            id="showcase-headline"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none"
            style={{ transform: 'translate(-50%, -280px)' }}
          >
            <p className="font-script text-blush text-2xl md:text-3xl mb-3">Every Frame Tells a Story</p>
            <h2
              className="font-serif font-light text-white leading-none"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
            >
              Captured in<br />
              <em className="italic" style={{ color: '#e8a598' }}>Perfect Light</em>
            </h2>
          </div>

          <div
            id="showcase-sub"
            className="absolute text-center z-20 pointer-events-none"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, 200px)' }}
          >
            <p className="text-white/50 font-light text-sm md:text-base tracking-wide max-w-xs md:max-w-sm">
              Scroll to experience the moments that take your breath away
            </p>
          </div>

          <div
            id="showcase-cta"
            className="absolute z-20"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, 270px)' }}
          >
            <a
              href="#gallery"
              onClick={(e) => { e.preventDefault(); document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 px-7 py-3 border border-blush/40 text-blush text-sm rounded-full hover:bg-blush/10 transition-all duration-300 font-light tracking-wide"
            >
              View Portfolio
              <span className="text-xs">↓</span>
            </a>
          </div>

          {/* ── Main lid frame (centre) ── */}
          <div
            id="frame-lid"
            className="absolute z-10"
            style={{
              width: 'clamp(260px, 34vw, 480px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <FrameCard frame={FRAMES[0]} accent="#e8a598" featured />
          </div>

          {/* ── Left frame ── */}
          <div
            id="frame-left1"
            className="absolute z-[8]"
            style={{
              width: 'clamp(160px, 22vw, 320px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <FrameCard frame={FRAMES[1]} accent="#8fa68d" />
          </div>

          {/* ── Right frame ── */}
          <div
            id="frame-right1"
            className="absolute z-[8]"
            style={{
              width: 'clamp(150px, 21vw, 300px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <FrameCard frame={FRAMES[2]} accent="#c97b5a" />
          </div>

          {/* ── Top-left small frame ── */}
          <div
            id="frame-top"
            className="absolute z-[6]"
            style={{
              width: 'clamp(130px, 18vw, 280px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <FrameCard frame={FRAMES[4]} accent="#d4956a" />
          </div>

          {/* ── Bottom-right small frame ── */}
          <div
            id="frame-btm"
            className="absolute z-[6]"
            style={{
              width: 'clamp(180px, 24vw, 360px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <FrameCard frame={FRAMES[3]} accent="#e8a598" />
          </div>

          {/* Ambient glow behind centre */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600,
              height: 600,
              background: 'radial-gradient(circle, rgba(201,123,90,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        {/* Mobile grid fallback (only visible on mobile where 3D is off) */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 py-20">
          <p className="font-script text-blush text-2xl">Every Frame Tells a Story</p>
          <h2 className="font-serif text-4xl font-light text-white text-center leading-tight">
            Captured in<br /><em className="italic text-blush">Perfect Light</em>
          </h2>
          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            {FRAMES.slice(0, 4).map((f) => (
              <div key={f.id} id={`frame-${f.id}`} className="rounded-2xl overflow-hidden" style={{ aspectRatio: `${f.w}/${f.h}` }}>
                <img src={f.src} alt={f.alt} className="w-full h-full object-cover" onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')} />
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
          ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08), 0 0 60px ${accent}30`
          : '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <img
        src={frame.src}
        alt={frame.alt}
        className="w-full h-full object-cover"
        onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white/90 text-xs tracking-widest uppercase font-light" style={{ color: accent }}>{frame.label}</p>
        {featured && (
          <p className="font-serif text-white text-lg font-light mt-0.5">{frame.alt}</p>
        )}
      </div>
      {/* Top gloss line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
    </div>
  )
}
