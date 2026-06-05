import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { openWhatsApp, bookingMessage } from '../utils/whatsapp'

const SHOOT_TYPES = [
  'Kids Photography',
  'Maternity Photography',
  'Wedding Photography',
  'Event Photography',
  'Other',
]

const initialForm = { name: '', email: '', phone: '', shootType: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setFieldErrors(fe => ({ ...fe, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name || form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email'
    if (!form.phone || !/^[0-9]{10}$/.test(form.phone.trim())) errs.phone = 'Enter a 10-digit phone number'
    if (!form.shootType) errs.shootType = 'Please select a shoot type'
    if (!form.message || form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setLoading(true)
    setError('')

    // Open WhatsApp immediately with all the form details
    openWhatsApp(bookingMessage({
      name: form.name,
      phone: form.phone.trim(),
      shootType: form.shootType,
      message: form.message,
    }))

    // Also save to server in background (non-blocking)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, phone: form.phone.trim() }),
    }).catch(() => { /* silent — WhatsApp already opened */ })

    setSuccess(true)
    setForm(initialForm)
    setLoading(false)
  }

  const inputCls = (field) => `w-full bg-white border rounded-lg ${
    fieldErrors[field] ? 'border-red-400' : 'border-cream-3 focus:border-terra'
  } text-warm-brown text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-warm-muted`

  return (
    <section id="contact" className="py-24 px-6 bg-cream-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left: Info */}
        <div>
          <p className="font-script text-3xl text-terra mb-4">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-warm-brown leading-tight mb-6">
            Let's Create<br />
            Something<br />
            <em className="italic">Beautiful Together</em>
          </h2>
          <p className="text-warm-mid font-light leading-relaxed mb-10">
            Ready to book? Fill in the form and Sandy will get back to you within 24 hours
            with availability and pricing.
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/918099865977"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white text-sm rounded-full font-medium hover:bg-[#1ebe5c] transition-colors duration-300 mb-12"
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </a>

          {/* Contact details */}
          <div className="space-y-5 mb-10">
            <div className="flex items-center gap-4 text-warm-mid">
              <FiMail className="text-terra flex-shrink-0" size={16} />
              <a href="mailto:sandy@sandyphotography.in" className="text-sm hover:text-terra transition-colors duration-200">
                sandy@sandyphotography.in
              </a>
            </div>
            <div className="flex items-center gap-4 text-warm-mid">
              <FiPhone className="text-terra flex-shrink-0" size={16} />
              <a href="tel:+918099865977" className="text-sm hover:text-terra transition-colors duration-200">
                +91 8099865977
              </a>
            </div>
            <div className="flex items-center gap-4 text-warm-mid">
              <FiMapPin className="text-terra flex-shrink-0" size={16} />
              <span className="text-sm">India (Available Worldwide)</span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-cream-3 rounded-full text-warm-mid hover:border-terra hover:text-terra transition-all duration-300"
              aria-label="Instagram"
            >
              <FiInstagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-cream-3 rounded-full text-warm-mid hover:border-terra hover:text-terra transition-all duration-300"
              aria-label="Facebook"
            >
              <FiFacebook size={16} />
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 flex items-center justify-center border-2 border-terra rounded-full mb-6">
                <svg className="w-6 h-6 text-terra" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-warm-brown mb-3">Message Sent!</h3>
              <p className="text-warm-mid font-light mb-8">Sandy will reach out within 24 hours.</p>
              <a
                href="https://wa.me/918099865977"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#25D366] text-sm border border-[#25D366]/30 rounded-full px-6 py-3 hover:bg-[#25D366]/10 transition-colors duration-200"
              >
                <FaWhatsapp size={16} />
                Or message on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label className="block text-xs text-warm-mid tracking-wide mb-1">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sharma"
                  className={inputCls('name')}
                />
                {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-warm-mid tracking-wide mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputCls('email')}
                />
                {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs text-warm-mid tracking-wide mb-1">Phone Number *</label>
                <div className="flex">
                  <span className="bg-cream-3 border border-r-0 border-cream-3 rounded-l-lg px-3 py-3 text-warm-muted text-sm flex items-center flex-shrink-0">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                    className={`flex-1 bg-white border rounded-r-lg ${fieldErrors.phone ? 'border-red-400' : 'border-cream-3 focus:border-terra'} text-warm-brown text-sm px-4 py-3 outline-none transition-colors duration-200 placeholder:text-warm-muted`}
                  />
                </div>
                {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
              </div>

              {/* Shoot Type */}
              <div>
                <label className="block text-xs text-warm-mid tracking-wide mb-1">Session Type *</label>
                <select
                  name="shootType"
                  value={form.shootType}
                  onChange={handleChange}
                  className={`${inputCls('shootType')} ${!form.shootType ? 'text-warm-muted' : 'text-warm-brown'} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>Select a session type</option>
                  {SHOOT_TYPES.map(t => <option key={t} value={t} className="text-warm-brown bg-white">{t}</option>)}
                </select>
                {fieldErrors.shootType && <p className="text-red-400 text-xs mt-1">{fieldErrors.shootType}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-warm-mid tracking-wide mb-1">Tell Us More *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your vision, your baby's age, preferred dates..."
                  rows={5}
                  className={`${inputCls('message')} resize-none`}
                />
                {fieldErrors.message && <p className="text-red-400 text-xs mt-1">{fieldErrors.message}</p>}
              </div>

              {error && (
                <div className="border border-red-400/30 bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-terra text-white text-sm rounded-full font-medium hover:bg-terra-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin-slow w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
