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

      tl.to(labelRef.current, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
      tl.to(frameLeftRef.current, { x: 0, opacity: 1, rotationY: 0, scale: 1, ease: 'power3.out' }, 0.1)
      tl.to(frameRightRef.current, { x: 0, opacity: 1, rotationY: 0, scale: 1, ease: 'power3.out' }, 0.1)
      tl.to([smallTopRef.current, smallBottomRef.current], { opacity: 1, scale: 1, ease: 'power2.out' }, 0.15)
      tl.to(frameCentralRef.current, {
        rotationX: 0, scaleY: 1, opacity: 1, y: -10,
        ease: 'power3.out',
      }, 0.4)
      tl.to(frameLeftRef.current, { filter: 'blur(8px)', scale: 0.82, opacity: 0.25, x: -40 }, 0.65)
      tl.to(frameRightRef.current, { filter: 'blur(8px)', scale: 0.82, opacity: 0.25, x: 40 }, 0.65)
      tl.to(frameCentralRef.current, { scale: 1.08, z: 60, ease: 'power2.out' }, 0.65)
      tl.to(headingRef.current, { y: 0, opacity: 1, ease: 'power3.out' }, 0.7)
      tl.to(paraRef.current, { y: 0, opacity: 1, ease: 'power3.out' }, 0.75)
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
      className="relative w-full h-screen"
      style={{ background: '#f5f0eb', perspective: '1200px', clipPath: 'inset(0)' }}
    >
      {/* Label */}
      <div
        ref={labelRef}
        className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center"
      >
        <p className="font-script text-2xl text-terra">The Magic We Capture</p>
      </div>

      {/* Left frame */}
      <div
        ref={frameLeftRef}
        className="absolute z-10"
        style={{ left: '8%', top: '15%', width: '26%', aspectRatio: '3/4' }}
      >
        <div className="w-full h-full overflow-hidden rounded-2xl" style={{ border: '2px solid rgba(200,160,140,0.3)' }}>
          <LazyImg
            src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80"
            alt="Baby photography"
          />
        </div>
      </div>

      {/* Right frame */}
      <div
        ref={frameRightRef}
        className="absolute z-10"
        style={{ right: '8%', top: '15%', width: '26%', aspectRatio: '3/4' }}
      >
        <div className="w-full h-full overflow-hidden rounded-2xl" style={{ border: '2px solid rgba(200,160,140,0.3)' }}>
          <LazyImg
            src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80"
            alt="Maternity photography"
          />
        </div>
      </div>

      {/* Central frame */}
      <div
        ref={frameCentralRef}
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ top: '10%', width: '34%', aspectRatio: '3/4' }}
      >
        <div className="w-full h-full overflow-hidden rounded-2xl relative" style={{ border: '2px solid rgba(200,160,140,0.3)' }}>
          <LazyImg
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80"
            alt="Kids and family photography"
          />
          {/* Light text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6"
            style={{ background: 'linear-gradient(to top, rgba(232,165,152,0.8) 0%, rgba(232,165,152,0.3) 50%, transparent 100%)' }}>
            <h2
              ref={headingRef}
              className="font-serif text-3xl lg:text-4xl xl:text-5xl font-light text-warm-brown leading-tight mb-2"
            >
              Every Giggle,<br />Every Milestone
            </h2>
            <p ref={paraRef} className="text-terra text-sm font-light tracking-wide">
              Authentic moments, captured forever
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
        <div className="w-full h-full overflow-hidden rounded-xl" style={{ border: '2px solid rgba(200,160,140,0.3)' }}>
          <LazyImg
            src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&q=80"
            alt="Smiling baby"
          />
        </div>
      </div>

      {/* Small bottom-right frame */}
      <div
        ref={smallBottomRef}
        className="absolute z-10"
        style={{ right: '2%', bottom: '8%', width: '14%', aspectRatio: '4/3' }}
      >
        <div className="w-full h-full overflow-hidden rounded-xl" style={{ border: '2px solid rgba(200,160,140,0.3)' }}>
          <LazyImg
            src="https://images.unsplash.com/photo-1519456264917-42d2b47d2b72?w=400&q=80"
            alt="Toddler photography"
          />
        </div>
      </div>
    </section>
  )
}
