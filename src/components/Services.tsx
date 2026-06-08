'use client'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingElements from './FloatingElements'
import { openWhatsApp, serviceMessage } from '../utils/whatsapp'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    emoji: '🍼',
    title: 'Newborn Photography',
    description: 'Those first ten days are fleeting and irreplaceable. Gentle, safe sessions that capture every tiny curl, yawn, and pout.',
    price: '₹20,000',
    features: ['First 5–14 days ideal', 'Safe posing & heated studio', 'Parents & siblings welcome', 'Heirloom gallery delivered'],
    color: '#c97b5a',
  },
  {
    emoji: '🎠',
    title: 'Kids Photography',
    description: 'Playful, candid, and bursting with personality. Studio or outdoor sessions where kids are free to just be kids — giggles and all.',
    price: '₹18,000',
    features: ['All ages welcome', 'Studio or outdoor', 'Fun props & themed setups', 'Same-week digital delivery'],
    color: '#e8a598',
  },
  {
    emoji: '🌸',
    title: 'Maternity Photography',
    description: 'Celebrate the most magical chapter of your life. Glowing bump portraits that honour the beauty, love, and anticipation you feel.',
    price: '₹25,000',
    features: ['28–36 weeks ideal', 'Indoor or outdoor', 'Partner & kids welcome', 'Expert posing guidance'],
    color: '#8fa68d',
  },
  {
    emoji: '💍',
    title: 'Wedding Photography',
    description: 'Every smile, every tear, every first dance — woven into a timeless story told with warmth and artistry.',
    price: '₹85,000',
    features: ['Full day candid coverage', 'Portraits & ceremonies', 'Pre-wedding shoot included', 'Premium online gallery'],
    color: '#d4956a',
  },
  {
    emoji: '🎉',
    title: 'Event Photography',
    description: 'Birthday parties, naming ceremonies, first steps — if it\'s worth celebrating, it\'s worth preserving beautifully.',
    price: '₹45,000',
    features: ['Any milestone or celebration', '3–6 hour coverage', 'Quick 48-hr turnaround', 'Candid & group shots'],
    color: '#a08080',
  },
]

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div className="relative group bg-white rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(232,165,152,0.25)] border border-cream-3">
      <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ background: service.color }} />
      <div className="absolute top-5 right-5 w-2 h-2 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300" style={{ background: service.color }} />

      <div className="text-5xl mb-5 transition-transform duration-300 group-hover:scale-110 origin-left">{service.emoji}</div>
      <h3 className="font-serif text-2xl font-light text-warm-brown mb-3">{service.title}</h3>
      <p className="text-warm-mid text-sm font-light leading-relaxed mb-6 flex-1">{service.description}</p>

      <ul className="space-y-2 mb-8">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-xs text-warm-muted tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
            {feat}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-cream-3">
        <div>
          <p className="text-[10px] tracking-widest text-warm-muted uppercase">Starting at</p>
          <p className="font-serif text-2xl font-semibold" style={{ color: service.color }}>{service.price}</p>
        </div>
        <button
          onClick={() => openWhatsApp(serviceMessage(service.title))}
          className="px-5 py-2 border-2 text-sm rounded-full font-medium transition-all duration-300 hover:text-white"
          style={{ borderColor: service.color, color: service.color }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = service.color }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-item', {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-24 px-6 bg-cream-2 overflow-hidden">
      <FloatingElements />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-script text-3xl text-terra mb-2">What We Offer</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-warm-brown mb-4">
            Sessions Made<br /><em className="italic">With Love</em>
          </h2>
          <div className="w-16 h-0.5 bg-blush mx-auto" />
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service) => (
            <div key={service.title} className="service-item">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
