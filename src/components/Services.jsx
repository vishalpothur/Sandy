import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaRing, FaUser, FaCamera, FaCalendarAlt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: FaRing,
    title: 'Wedding Photography',
    description: 'Your love story deserves to be told with elegance. From intimate ceremonies to grand celebrations, every moment is preserved with timeless artistry.',
    price: '₹45,000',
    features: ['Full day coverage', 'Candid & portraits', 'Edited digital gallery'],
  },
  {
    icon: FaUser,
    title: 'Portrait Sessions',
    description: 'Revealing the authentic you. Whether personal branding or artistic portraiture, we create images that speak volumes about who you are.',
    price: '₹8,000',
    features: ['2-hour session', '30 edited images', 'Studio or outdoor'],
  },
  {
    icon: FaCamera,
    title: 'Fashion & Editorial',
    description: 'High-impact imagery for fashion brands, designers, and editorial features. Precision-crafted for maximum visual storytelling.',
    price: '₹15,000',
    features: ['Creative direction', 'Multiple looks', 'Print-ready files'],
  },
  {
    icon: FaCalendarAlt,
    title: 'Events & Corporate',
    description: 'From product launches to galas, every milestone captured with professionalism and creative flair that elevates your brand.',
    price: '₹20,000',
    features: ['Half / full day', 'Quick turnaround', 'Commercial license'],
  },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const borderRef = useRef(null)

  return (
    <div
      ref={cardRef}
      className="relative group bg-[#111111] p-8 flex flex-col overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(201,169,110,0.12)]"
    >
      {/* Gold top border — animates width on hover */}
      <div
        ref={borderRef}
        className="absolute top-0 left-0 h-[2px] bg-gold transition-all duration-500"
        style={{ width: '0%' }}
        onMouseEnter={() => { if (borderRef.current) borderRef.current.style.width = '100%' }}
      />
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        onMouseEnter={() => { if (borderRef.current) borderRef.current.style.width = '100%' }}
        onMouseLeave={() => { if (borderRef.current) borderRef.current.style.width = '0%' }}
      />
      {/* Force full border on parent hover */}
      <style>{`
        .service-card:hover .service-border { width: 100% !important; }
      `}</style>
      <div className="service-card group absolute inset-0 pointer-events-none">
        <div className="service-border absolute top-0 left-0 h-[2px] bg-gold transition-all duration-500 w-0" />
      </div>

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center border border-gold/30 mb-6 group-hover:border-gold transition-colors duration-300">
        <service.icon className="text-gold text-lg" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-2xl font-light text-white mb-3">{service.title}</h3>
      <p className="text-white/50 text-sm font-light leading-relaxed mb-6 flex-1">{service.description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-8">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-xs text-white/40 tracking-wide">
            <span className="w-1 h-1 rounded-full bg-gold inline-block flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>

      {/* Price + CTA */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
        <div>
          <p className="text-[10px] tracking-widest text-white/30 uppercase">Starting at</p>
          <p className="font-serif text-2xl text-gold">{service.price}</p>
        </div>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="px-5 py-2 border border-gold text-gold text-xs tracking-widest hover:bg-gold hover:text-[#080808] transition-all duration-300"
        >
          BOOK NOW
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
    <section id="services" ref={sectionRef} className="py-24 px-6 bg-[#060606]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-ultra text-gold font-light uppercase mb-4">Services</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-white mb-4">
            Crafted Experiences<br />
            <em className="italic">For Every Moment</em>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={service.title} className="service-item">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
