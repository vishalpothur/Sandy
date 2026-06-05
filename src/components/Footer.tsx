'use client'
import { FiInstagram, FiFacebook, FiMail, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { openWhatsApp, serviceMessage } from '../utils/whatsapp'

export default function Footer() {
  return (
    <footer className="bg-warm-dark text-white/70 py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="font-script text-4xl text-white block mb-1">Sandy</span>
            <span className="text-[10px] tracking-widest text-white/40 block mb-4">Photography</span>
            <p className="text-sm font-light leading-relaxed text-white/50">
              Capturing the magic of little ones — kids, maternity, weddings & events across India.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm font-light">
              {[['Work', '#gallery'], ['Services', '#services'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }}
                    className="hover:text-terra transition-colors duration-200">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-6">Get In Touch</h4>
            <div className="space-y-3 text-sm font-light">
              <a href="tel:+918099865977" className="flex items-center gap-3 hover:text-terra transition-colors duration-200">
                <FiPhone size={14} className="text-terra" /> +91 8099865977
              </a>
              <a href="mailto:sandy@sandyphotography.in" className="flex items-center gap-3 hover:text-terra transition-colors duration-200">
                <FiMail size={14} className="text-terra" /> sandy@sandyphotography.in
              </a>
            </div>
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full hover:border-terra hover:text-terra transition-all duration-300" aria-label="Instagram">
                <FiInstagram size={15} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full hover:border-terra hover:text-terra transition-all duration-300" aria-label="Facebook">
                <FiFacebook size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Sandy Photography. All rights reserved.</p>
          <p>Made with ❤️ for beautiful families</p>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <button
        onClick={() => openWhatsApp(serviceMessage('Photography'))}
        className="wa-pulse fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#1ebe5c] transition-colors duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={26} />
      </button>
    </footer>
  )
}
