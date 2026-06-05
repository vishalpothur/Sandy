import { useState, useEffect } from 'react'
import { FiInstagram, FiFacebook, FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const quickLinks = ['Work', 'About', 'Services', 'Contact']
const serviceLinks = ['Newborn Sessions', 'Baby Milestones', 'Kids & Families', 'Maternity']

function smoothScroll(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="relative pt-20 pb-8 px-6 overflow-hidden" style={{ background: '#2d2520' }}>
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-script leading-none"
            style={{ opacity: 0.06, whiteSpace: 'nowrap', fontSize: '18vw', color: '#e8a598' }}>
            Sandy
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-white/10">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <p className="font-script text-4xl text-blush-light">Sandy</p>
                <p className="text-warm-muted text-sm font-light mt-1">Capturing the magic of little ones</p>
              </div>
              <p className="text-warm-muted text-sm font-light leading-relaxed mb-6">
                Newborn, baby, kids &amp; maternity photography across India — crafted with warmth and love.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/15 rounded-full text-warm-muted hover:border-blush hover:text-blush transition-all duration-300">
                  <FiInstagram size={14} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/15 rounded-full text-warm-muted hover:border-blush hover:text-blush transition-all duration-300">
                  <FiFacebook size={14} />
                </a>
                <a href="https://wa.me/918099865977" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/15 rounded-full text-warm-muted hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300">
                  <FaWhatsapp size={14} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs tracking-widest text-blush uppercase mb-6">Quick Links</p>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => { e.preventDefault(); smoothScroll(`#${link.toLowerCase()}`) }}
                      className="text-warm-muted text-sm font-light hover:text-blush-light transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-xs tracking-widest text-blush uppercase mb-6">Sessions</p>
              <ul className="space-y-3">
                {serviceLinks.map(s => (
                  <li key={s}>
                    <a
                      href="#services"
                      onClick={(e) => { e.preventDefault(); smoothScroll('#services') }}
                      className="text-warm-muted text-sm font-light hover:text-blush-light transition-colors duration-200"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-warm-muted text-xs tracking-wide">
              &copy; 2025 Sandy Photography &middot; Made with <span className="text-blush">♥</span> in India
            </p>
            <p className="text-warm-muted text-xs tracking-wide opacity-60">
              Capturing tiny moments, forever.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={() => smoothScroll('#hero')}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-terra text-white rounded-full shadow-lg hover:bg-terra-light transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <FiArrowUp size={18} />
      </button>
    </>
  )
}
