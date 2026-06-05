import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function LazyImg({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full h-full object-cover ${className || ''}`}
      onLoad={(e) => e.target.classList.add('loaded')}
    />
  )
}

export default function ScrollShowcase() {
  const sectionRef = useRef(null)
  const frameLeftRef = useRef(null)
  const frameRightRef = useRef(null)
  const frameCentralRef = useRef(null)
  const smallTopRef = useRef(null)
  const smallBottomRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const paraRef = useRef(null)

  useLayoutEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Simplified mobile animation - just fade in
        const els = [frameLeftRef.current, frameRightRef.current, frameCentralRef.current, smallTopRef.current, smallBottomRef.current]
        gsap.set(els, { opacity: 0, y: 40 })
        gsap.set([labelRef.current, headingRef.current, paraRef.current], { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
            gsap.to([labelRef.current, headingRef.current, paraRef.current], {
              opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3
            })
          },
        })
        return
      }

      // Desktop: full 3D Apple-style animation
      // Phase 0: initial state
      gsap.set(frameLeftRef.current, { x: -300, opacity: 0, rotationY: 20, scale: 0.85, transformPerspective: 1200 })
      gsap.set(frameRightRef.current, { x: 300, opacity: 0, rotationY: -20, scale: 0.85, transformPerspective: 1200 })
      gsap.set(frameCentralRef.current, {
        rotationX: 72, scaleY: 0.25, opacity: 0,
        transformOrigin: 'center 100%', transformPerspective: 1200,
      })
      gsap.set([smallTopRef.current, smallBottomRef.current], { opacity: 0, scale: 0.5 })
      gsap.set([headingRef.current, paraRef.current], { y: 60, opacity: 0 })
      gsap.set(labelRef.current, { y: -30, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      // Phase 1 (0-25%): label appears
      tl.to(labelRef.current, { y: 0, opacity: 1, ease: 'power2.out' }, 0)

      // Phase 2 (10-45%): side frames fly in
      tl.to(frameLeftRef.current, { x: 0, opacity: 1, rotationY: 0, scale: 1, ease: 'power3.out' }, 0.1)
      tl.to(frameRightRef.current, { x: 0, opacity: 1, rotationY: 0, scale: 1, ease: 'power3.out' }, 0.1)
      tl.to([smallTopRef.current, smallBottomRef.current], { opacity: 1, scale: 1, ease: 'power2.out' }, 0.15)

      // Phase 3 (40-70%): central frame "opens" like laptop lid
      tl.to(frameCentralRef.current, {
        rotationX: 0, scaleY: 1, opacity: 1, y: -10,
        ease: 'power3.out',
      }, 0.4)

      // Phase 4 (65-85%): central frame comes forward, sides blur
      tl.to(frameLeftRef.current, { filter: 'blur(8px)', scale: 0.82, opacity: 0.25, x: -40 }, 0.65)
      tl.to(frameRightRef.current, { filter: 'blur(8px)', scale: 0.82, opacity: 0.25, x: 40 }, 0.65)
      tl.to(frameCentralRef.current, { scale: 1.08, z: 60, ease: 'power2.out' }, 0.65)
      tl.to(headingRef.current, { y: 0, opacity: 1, ease: 'power3.out' }, 0.7)
      tl.to(paraRef.current, { y: 0, opacity: 1, ease: 'power3.out' }, 0.75)

      // Phase 5 (88-100%): all fades out
      tl.to(
        [frameLeftRef.current, frameRightRef.current, frameCentralRef.current,
          smallTopRef.current, smallBottomRef.current, labelRef.current,
          headingRef.current, paraRef.current],
        { opacity: 0, y: -30, ease: 'power2.in' },
        0.88
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#060606]"
      style={{ perspective: '1200px', clipPath: 'inset(0)' }}
    >
      {/* Label */}
      <div
        ref={labelRef}
        className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center"
      >
        <p className="text-[10px] tracking-ultra text-gold font-light uppercase">The Art of Seeing</p>
      </div>

      {/* Left frame */}
      <div
        ref={frameLeftRef}
        className="absolute z-10"
        style={{ left: '8%', top: '15%', width: '26%', aspectRatio: '3/4' }}
      >
        <div className="w-full h-full overflow-hidden">
          <LazyImg
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
            alt="Wedding photography"
          />
        </div>
      </div>

      {/* Right frame */}
      <div
        ref={frameRightRef}
        className="absolute z-10"
        style={{ right: '8%', top: '15%', width: '26%', aspectRatio: '3/4' }}
      >
        <div className="w-full h-full overflow-hidden">
          <LazyImg
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80"
            alt="Portrait photography"
          />
        </div>
      </div>

      {/* Central frame */}
      <div
        ref={frameCentralRef}
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ top: '10%', width: '34%', aspectRatio: '3/4' }}
      >
        <div className="w-full h-full overflow-hidden relative">
          <LazyImg
            src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80"
            alt="Dramatic portrait"
          />
          {/* Text overlay on central frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <h2
              ref={headingRef}
              className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-tight mb-2"
            >
              Every Frame<br />Tells a Story
            </h2>
            <p ref={paraRef} className="text-gold text-sm font-light tracking-wide">
              Award-winning photography across India
            </p>
          </div>
        </div>
      </div>

      {/* Small top-left frame */}
      <div
        ref={smallTopRef}
        className="absolute z-10"
        style={{ left: '2%', top: '8%', width: '14%', aspectRatio: '4/3' }}
      >
        <div className="w-full h-full overflow-hidden">
          <LazyImg
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80"
            alt="Family photography"
          />
        </div>
      </div>

      {/* Small bottom-right frame */}
      <div
        ref={smallBottomRef}
        className="absolute z-10"
        style={{ right: '2%', bottom: '8%', width: '14%', aspectRatio: '4/3' }}
      >
        <div className="w-full h-full overflow-hidden">
          <LazyImg
            src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80"
            alt="Events photography"
          />
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, #060606 100%)'
      }} />
    </section>
  )
}
