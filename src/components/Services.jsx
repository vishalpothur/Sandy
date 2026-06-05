import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    emoji: '👶',
    title: 'Newborn Sessions',
    description: 'For babies 0–14 days. Safe, gentle, and utterly precious sessions in our cosy studio.',
    price: '₹12,000',
    features: ['0–14 days old', 'Safe & gentle posing', 'Studio setting', 'Edited digital gallery'],
  },
  {
    emoji: '⭐',
    title: 'Baby Milestones',
    description: 'Sitter sessions, cake smash, first birthday — every milestone deserves its own story.',
    price: '₹8,000',
    features: ['3m, 6m, 1yr packages', 'Cake smash included', 'Fun props & setups', 'Print-ready files'],
  },
  {
    emoji: '🌈',
    title: 'Kids & Families',
    description: 'Candid, playful, real. Outdoor or studio sessions that capture your family\'s unique vibe.',
    price: '₹10,000',
    features: ['Studio or outdoor', 'Candid & posed', 'All ages welcome', 'Same-week delivery'],
  },
  {
    emoji: '🌸',
    title: 'Maternity',
    description: 'Celebrate the most magical chapter. Beautiful bump portraits, indoors or in nature.',
    price: '₹9,000',
    features: ['28–36 weeks ideal', 'Indoor or outdoor', 'Partner & kids welcome', 'Guided posing'],
  },
]

function ServiceCard({ service }) {
  return (
    <div className="relative group bg-white rounded-2xl p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(232,165,152,0.2)] border border-cream-3 hover:border-terra">
      {/* Blush top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-blush rounded-t-2xl" />

      {/* Emoji icon */}
      <div className="text-4xl mb-6">{service.emoji}</div>

      {/* Content */}
      <h3 className="font-serif text-2xl font-light text-warm-brown mb-3">{service.title}</h3>
      <p className="text-warm-mid text-sm font-light leading-relaxed mb-6 flex-1">{service.description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-8">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-xs text-warm-muted tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blush inline-block flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-cream-3">
        <div>
          <p className="text-[10px] tracking-widest text-warm-muted uppercase">Starting at</p>
          <p className="font-serif text-2xl font-semibold text-terra">{service.price}</p>
        </div>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="px-5 py-2 border-2 border-terra text-terra text-sm rounded-full hover:bg-terra hover:text-white transition-all duration-300"
        >
          Book Now
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-item', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 px-6 bg-cream-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-script text-3xl text-terra mb-2">What We Offer</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-warm-brown mb-4">
            Sessions Made<br />
            <em className="italic">With Love</em>
          </h2>
          <div className="w-16 h-0.5 bg-blush mx-auto" />
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
