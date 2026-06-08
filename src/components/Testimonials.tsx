'use client'
import { useState, useEffect } from 'react'

const testimonials = [
  { name: 'Priya & Karthik', role: 'Newborn Session', quote: "Sandy photographed our son when he was just 7 days old. The images are so tender and so perfectly him. We will treasure them forever.", avatar: 'PK' },
  { name: 'Divya Menon', role: 'Maternity Photography', quote: "I was nervous in front of the camera but Sandy made me feel like a goddess. Every photo is a work of art — I genuinely cry looking at them.", avatar: 'DM' },
  { name: 'Kavitha Reddy', role: 'Kids Session', quote: "My daughter was completely shy at first, but Sandy had her giggling within minutes. The photos are so full of life and pure joy!", avatar: 'KR' },
  { name: 'Arun & Sneha', role: 'Wedding Photography', quote: "Our wedding album is beyond anything we imagined. Sandy captured every emotion perfectly — the laughter, the tears, the love. Priceless.", avatar: 'AS' },
  { name: 'Meera Iyer', role: 'First Birthday Event', quote: "Every single moment of my son's cake smash was captured beautifully. The turnaround was incredibly quick too. Highly recommend!", avatar: 'MI' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[current]

  return (
    <section className="py-24 px-6 bg-cream overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-script text-3xl text-terra mb-2">Kind Words</p>
        <h2 className="font-serif text-5xl font-light text-warm-brown mb-16">
          What Families <em className="italic">Say</em>
        </h2>

        <div className="relative min-h-[260px] flex flex-col items-center justify-center">
          <div key={current} className="fade-in-up">
            <div className="w-16 h-16 rounded-full bg-blush-light flex items-center justify-center font-serif text-xl text-terra mx-auto mb-6">
              {t.avatar}
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl font-light text-warm-brown leading-relaxed mb-6 max-w-3xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="text-terra font-medium text-sm">{t.name}</p>
            <p className="text-warm-muted text-xs tracking-widest mt-1">{t.role}</p>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-terra' : 'w-2 h-2 bg-cream-3'}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
