'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
  prefix?: string
}

const STATS: Stat[] = [
  { value: 10000, suffix: '+', label: 'Memories Captured' },
  { value: 500, suffix: '+', label: 'Happy Families' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 4.9, suffix: '★', label: 'Client Rating', prefix: '' },
]

function Counter({ value, suffix, prefix = '' }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const startTime = performance.now()
          const isDecimal = value % 1 !== 0

          function tick(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = isDecimal
              ? parseFloat((eased * value).toFixed(1))
              : Math.floor(eased * value)
            setCount(current)
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative z-10 py-20 px-6 animated-gradient">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass rounded-3xl p-8 text-center"
            >
              <p className="font-serif text-4xl md:text-5xl text-warm-text font-semibold mb-2">
                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className="font-sans text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
