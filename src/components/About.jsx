import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 300, suffix: '+', label: 'Families' },
  { value: 5, suffix: '★', label: 'Reviews' },
  { value: 0, suffix: '', label: 'India & Abroad', isText: true, text: '🌏' },
]

function StatCounter({ value, suffix, label, isText, text }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useLayoutEffect(() => {
    if (isText) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.round(obj.val)),
        })
        observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, isText])

  return (
    <div ref={ref} className="text-center bg-cream-2 rounded-2xl p-4">
      <p className="font-serif text-3xl md:text-4xl font-semibold text-terra">
        {isText ? text : `${count}${suffix}`}
      </p>
      <p className="text-warm-mid text-xs tracking-widest mt-1">{label}</p>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const para1Ref = useRef(null)
  const para2Ref = useRef(null)
  const ctaRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      tl.from(imgRef.current, { x: -60, opacity: 0, duration: 1.2, ease: 'power3.out' })
        .from(labelRef.current, { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
        .from(headingRef.current, { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
        .from([para1Ref.current, para2Ref.current], { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }, '-=0.6')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left: Image */}
        <div ref={imgRef} className="relative">
          <div className="overflow-hidden rounded-3xl aspect-[4/5] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=800&q=80"
              alt="Sandy — Photographer with baby"
              loading="lazy"
              className="w-full h-full object-cover"
              onLoad={(e) => e.target.classList.add('loaded')}
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 bg-terra px-6 py-4 z-20 rounded-2xl shadow-lg">
            <p className="text-white font-serif text-lg font-semibold">8+</p>
            <p className="text-white/80 text-[9px] tracking-widest">YEARS OF LOVE</p>
          </div>
        </div>

        {/* Right: Text content */}
        <div>
          <p ref={labelRef} className="font-script text-3xl text-blush mb-4">About Sandy</p>

          <h2 ref={headingRef} className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-warm-brown leading-tight mb-8">
            Hi, I'm Sandy!<br />
            Your Little Ones'<br />
            <em className="italic">Favourite Photographer</em>
          </h2>

          <p ref={para1Ref} className="text-warm-mid font-light leading-relaxed mb-6">
            I'm a passionate lifestyle photographer based in India, and there is nothing I love more than
            photographing the tiniest fingers, the toothless grins, and the bump that holds the most exciting
            secret in the world.
          </p>

          <p ref={para2Ref} className="text-warm-mid font-light leading-relaxed mb-10">
            Every session is relaxed, fun, and totally tailored to your family. No stiff poses — just real
            moments, real love, and real magic.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef}>
            <a
              href="https://wa.me/918099865977"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-terra text-white text-sm rounded-full font-medium hover:bg-terra-light transition-colors duration-300"
            >
              Connect on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
