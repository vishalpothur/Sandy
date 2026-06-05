'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openWhatsApp, serviceMessage } from '../utils/whatsapp'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '2014', text: 'Started Sandy Photography with a single camera and a big dream' },
  { year: '2017', text: 'Specialised in newborn & maternity photography' },
  { year: '2020', text: 'Expanded to weddings & events across India' },
  { year: '2024', text: '10,000+ precious memories captured for 500+ families' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-left', { x: -60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.from('.about-right', { x: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.from('.milestone-item', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.milestone-item', start: 'top 85%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-cream-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="about-left">
          <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/5' }}>
            <img
              src="/photos/kids-outdoor.jpg"
              alt="Sandy Photography — kids session"
              className="w-full h-full object-cover"
              onLoad={(e) => (e.target as HTMLImageElement).classList.add('loaded')}
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-5">
              <p className="font-script text-2xl text-terra mb-1">Sandy</p>
              <p className="text-xs tracking-widest text-warm-muted uppercase">Lead Photographer</p>
            </div>
          </div>
        </div>

        <div className="about-right">
          <p className="font-script text-3xl text-terra mb-4">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-warm-brown leading-tight mb-6">
            Every Child Deserves<br />
            to Be <em className="italic">Celebrated</em>
          </h2>
          <p className="text-warm-mid font-light leading-relaxed mb-4">
            Hi, I&apos;m Sandy — a photographer based in India who believes that the tiniest moments hold the biggest magic.
            From the first flutter of a newborn&apos;s eyelashes to a toddler&apos;s contagious laugh, I&apos;m here to capture it all.
          </p>
          <p className="text-warm-mid font-light leading-relaxed mb-10">
            Every family has a story worth telling beautifully. My sessions are relaxed, fun, and guided — so you can just enjoy the moment while I take care of the rest.
          </p>

          <div className="space-y-4 mb-10">
            {milestones.map((m) => (
              <div key={m.year} className="milestone-item flex gap-4 items-start">
                <span className="font-script text-terra text-xl w-14 flex-shrink-0">{m.year}</span>
                <p className="text-warm-mid text-sm font-light leading-relaxed pt-0.5">{m.text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => openWhatsApp(serviceMessage('Photography'))}
            className="px-8 py-3.5 bg-terra text-white text-sm rounded-full font-medium hover:bg-terra-light transition-colors duration-300"
          >
            Let&apos;s Work Together
          </button>
        </div>
      </div>
    </section>
  )
}
