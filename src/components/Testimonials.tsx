'use client'
import { useState, useEffect } from 'react'

const testimonials = [
  { name: 'Priya Sharma', role: 'Maternity Session', quote: "Sandy made me feel so beautiful and comfortable during my maternity shoot. The photos are absolutely stunning — I cry every time I look at them!", avatar: 'PS' },
  { name: 'Rohit & Ananya', role: 'Wedding Photography', quote: "Our wedding photos are beyond anything we imagined. Sandy captured every emotion perfectly. We couldn't be happier!", avatar: 'RA' },
  { name: 'Kavitha Reddy', role: 'Kids Session', quote: "My daughter was so shy at first, but Sandy had her giggling within minutes. The photos are so full of life and joy!", avatar: 'KR' },
  { name: 'Meera Iyer', role: 'Birthday Event', quote: "Every single moment of my son's first birthday was captured beautifully. The turnaround was so quick too. Highly recommend!", avatar: 'MI' },
  { name: 'Suresh & Lakshmi', role: 'Family Session', quote: "We've done three sessions with Sandy now and each one is more beautiful than the last. She truly has a gift!", avatar: 'SL' },
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
