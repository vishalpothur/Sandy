import { useState, useEffect } from 'react'
import { FiInstagram, FiFacebook, FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const quickLinks = ['Work', 'About', 'Services', 'Contact']
const serviceLinks = ['Wedding Photography', 'Portrait Sessions', 'Fashion & Editorial', 'Events & Corporate']

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
      <footer className="relative bg-[#050505] pt-20 pb-8 px-6 overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-serif text-[18vw] font-light text-white leading-none"
            style={{ opacity: 0.04, whiteSpace: 'nowrap' }}>
            SANDY
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-white/5">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <p className="font-serif text-3xl font-light tracking-widest text-white">SANDY</p>
                <p className="text-[9px] tracking-ultra text-gold font-light mt-1">PHOTOGRAPHY</p>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                Capturing life's most beautiful stories through the art of photography. Based in India, working worldwide.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all duration-300">
                  <FiInstagram size={14} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all duration-300">
                  <FiFacebook size={14} />
                </a>
                <a href="https://wa.me/918099865977" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300">
                  <FaWhatsapp size={14} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-[9px] tracking-ultra text-gold uppercase mb-6">Quick Links</p>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      onClick={(e) => { e.preventDefault(); smoothScroll(`#${link.toLowerCase()}`) }}
                      className="text-white/40 text-sm font-light hover:text-gold transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-[9px] tracking-ultra text-gold uppercase mb-6">Services</p>
              <ul className="space-y-3">
                {serviceLinks.map(s => (
                  <li key={s}>
                    <a
                      href="#services"
                      onClick={(e) => { e.preventDefault(); smoothScroll('#services') }}
                      className="text-white/40 text-sm font-light hover:text-gold transition-colors duration-200"
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
            <p className="text-white/20 text-xs tracking-wide">
              &copy; {new Date().getFullYear()} Sandy Photography. All rights reserved.
            </p>
            <p className="text-white/20 text-xs tracking-wide">
              Made with <span className="text-gold">♥</span> in India
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={() => smoothScroll('#hero')}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-gold text-[#080808] hover:bg-gold-light transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <FiArrowUp size={18} />
      </button>
    </>
  )
}
