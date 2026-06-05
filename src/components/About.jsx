import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Sessions Done' },
  { value: 15, suffix: '', label: 'Awards Won' },
  { value: 20, suffix: '+', label: 'Cities Covered' },
]

function StatCounter({ value, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useLayoutEffect(() => {
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
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl md:text-5xl font-light text-gold">
        {count}{suffix}
      </p>
      <p className="text-white/50 text-xs tracking-widest mt-1 uppercase">{label}</p>
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
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left: Image with double-border frame */}
        <div ref={imgRef} className="relative">
          <div className="relative">
            {/* Outer decorative border */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold/30 pointer-events-none z-10" />
            {/* Inner decorative border */}
            <div className="absolute -top-2 -left-2 w-full h-full border border-gold/15 pointer-events-none z-10" />
            <div className="overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                alt="Sandy — Photographer"
                loading="lazy"
                className="w-full h-full object-cover"
                onLoad={(e) => e.target.classList.add('loaded')}
              />
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 bg-gold px-6 py-4 z-20">
            <p className="text-[#080808] font-serif text-lg font-semibold">12+</p>
            <p className="text-[#080808] text-[9px] tracking-widest">YEARS OF CRAFT</p>
          </div>
        </div>

        {/* Right: Text content */}
        <div>
          <p ref={labelRef} className="text-[10px] tracking-ultra text-gold font-light uppercase mb-6">About Sandy</p>

          <h2 ref={headingRef} className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8">
            Passion. Vision.<br />
            <em className="italic">Timeless Art.</em>
          </h2>

          <p ref={para1Ref} className="text-white/60 font-light leading-relaxed mb-6">
            With over twelve years behind the lens, Sandy has built a reputation as one of India's most sought-after
            photographers. From the snow-capped Himalayas to the sun-drenched beaches of Kerala, every frame is crafted
            with an artist's eye and a storyteller's soul.
          </p>

          <p ref={para2Ref} className="text-white/60 font-light leading-relaxed mb-10">
            Specializing in weddings, portraits, fashion editorials, and travel photography, Sandy brings a cinematic
            quality to every shoot. The work has been featured in leading Indian lifestyle magazines and has earned
            recognition at national photography awards.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 py-8 border-t border-b border-white/10">
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
              className="inline-block px-8 py-4 bg-gold text-[#080808] text-xs tracking-widest font-semibold hover:bg-gold-light transition-colors duration-300"
            >
              CONNECT ON WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
