import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { openWhatsApp, serviceMessage } from '../utils/whatsapp'

const navLinks = [
  { label: 'Work', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

function smoothScroll(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    })

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    smoothScroll(href)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-sm'
            : 'bg-cream/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, '#hero')}
            className="flex flex-col leading-none cursor-pointer"
          >
            <span className="font-script text-3xl text-warm-brown">Sandy</span>
            <span className="text-[9px] tracking-widest text-warm-muted font-light">Photography</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="terra-underline text-sm text-warm-mid hover:text-terra transition-colors duration-300 font-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Book Now button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => openWhatsApp(serviceMessage('Photography'))}
              className="px-6 py-2 bg-terra text-white text-sm rounded-full hover:bg-terra-light transition-all duration-300 font-medium"
            >
              Book Now
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-[6px] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-warm-brown transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-[9px]' : 'w-6'}`} />
            <span className={`block h-px bg-warm-brown transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-px bg-warm-brown transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-6'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-cream/98 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="font-serif text-4xl font-light text-warm-brown hover:text-terra transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => { setMenuOpen(false); openWhatsApp(serviceMessage('Photography')) }}
              className="px-8 py-3 bg-terra text-white text-sm rounded-full hover:bg-terra-light transition-all duration-300 mt-4 inline-block"
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
