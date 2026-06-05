'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const features = [
  {
    icon: '🏛',
    title: 'Luxury Studio',
    desc: 'Fully equipped, beautifully styled spaces designed for comfort and creativity. Every corner is photo-ready.',
  },
  {
    icon: '🎀',
    title: 'Props Collection',
    desc: 'Hundreds of premium props, wraps, and accessories for every session — curated with love.',
  },
  {
    icon: '🛡',
    title: 'Safety First',
    desc: 'All newborn techniques are certified safe. Your baby is always our absolute top priority.',
  },
  {
    icon: '👗',
    title: 'Wardrobe Options',
    desc: 'Curated maternity gowns and kids outfits available at no extra cost. Look stunning effortlessly.',
  },
  {
    icon: '📦',
    title: 'Premium Albums',
    desc: 'Museum-quality heirloom albums and fine art prints to treasure forever and pass down generations.',
  },
]

interface CardProps {
  icon: string
  title: string
  desc: string
  delay: number
}

function Card3D({ icon, title, desc, delay }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(dx * 10)
    rotateX.set(-dy * 10)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      ref={ref}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0) }}
      className="glass rounded-3xl p-8 cursor-default"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-serif text-xl text-warm-text mb-3">{title}</h3>
      <p className="font-sans text-sm text-muted leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function Studio() {
  return (
    <section className="relative z-10 py-24 px-6 bg-cream-light/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-2xl text-blush mb-3"
          >
            Our Space
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-warm-text"
          >
            Premium <span className="text-gradient">Studio Experience</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(0, 3).map((f, i) => (
            <Card3D key={f.title} {...f} delay={i * 0.1} />
          ))}
          <div className="lg:col-start-1 sm:col-span-1 lg:col-span-1">
            <Card3D {...features[3]} delay={0.3} />
          </div>
          <div className="sm:col-span-2 lg:col-span-2 lg:col-start-2">
            <Card3D {...features[4]} delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  )
}
